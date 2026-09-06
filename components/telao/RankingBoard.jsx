"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import ChampionCard from "./ChampionCard";
import RunnerCard from "./RunnerCard";
import LiveFeed from "./LiveFeed";
import { formatBRL } from "@/lib/format";

/**
 * RankingBoard
 * ------------
 * Monta o 1º, 2º e 3º lugar e alimenta o Live Feed.
 *
 * A mensagem do feed é calculada comparando a lista atual de presentes
 * com a lista anterior (guardada em um ref): assim conseguimos saber se
 * alguém novo entrou, se um valor mudou, ou se o líder trocou — tudo
 * isso "de graça", reaproveitando o mesmo fluxo em tempo real que já
 * sincroniza o celular com o telão (não é preciso nenhuma tabela extra
 * nem F5 em lugar nenhum).
 */
export default function RankingBoard({ gifts }) {
  const [feedMessage, setFeedMessage] = useState("");
  const prevMapRef = useRef(null);
  const leaderRef = useRef(null);

  const top10 = gifts.slice(0, 10);
  const champion = top10[0];
  const second = top10[1];
  const third = top10[2];

  useEffect(() => {
    const prevMap = prevMapRef.current;
    let message = null;

    if (prevMap) {
      // 1) alguém novo entrou no ranking
      for (const g of gifts) {
        if (!prevMap.has(g.id)) {
          message = `🎁 ${g.name} entrou no ranking com ${formatBRL(g.amount)}`;
          break;
        }
      }
      // 2) valor de alguém mudou
      if (!message) {
        for (const g of gifts) {
          const prev = prevMap.get(g.id);
          if (prev && Number(prev.amount) !== Number(g.amount)) {
            message = `💰 ${g.name} atualizou o presente para ${formatBRL(g.amount)}`;
            break;
          }
        }
      }
    }

    // 3) troca de líder tem prioridade sobre as mensagens acima + dispara confete
    const novoLider = champion?.id ?? null;
    const antigoLider = leaderRef.current;
    if (antigoLider !== null && novoLider !== null && novoLider !== antigoLider) {
      dispararConfete();
      message = `👑 ${champion.name} acabou de assumir a liderança!`;
    }
    leaderRef.current = novoLider;

    if (message) setFeedMessage(message);

    prevMapRef.current = new Map(gifts.map((g) => [g.id, { name: g.name, amount: g.amount }]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gifts]);

  return (
    <div>
      {champion && (
        <div className="mb-5">
          <AnimatePresence>
            <ChampionCard key={champion.id} gift={champion} />
          </AnimatePresence>
        </div>
      )}

      {(second || third) && (
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          <AnimatePresence>
            {second && <RunnerCard key={second.id} gift={second} rank={2} />}
            {third && <RunnerCard key={third.id} gift={third} rank={3} />}
          </AnimatePresence>
        </div>
      )}

      <LiveFeed message={feedMessage} />
    </div>
  );
}

function dispararConfete() {
  const cores = ["#D4AF6A", "#F3D48A", "#A9822F", "#ffffff"];

  confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0, y: 0.55 }, colors: cores });
  confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1, y: 0.55 }, colors: cores });
  setTimeout(() => {
    confetti({ particleCount: 120, spread: 100, startVelocity: 45, origin: { x: 0.5, y: 0.35 }, colors: cores });
  }, 180);
}
