"use client";

import { useGifts } from "@/hooks/useGifts";
import { useSettings } from "@/hooks/useSettings";
import RankingBoard from "@/components/telao/RankingBoard";
import Sidebar from "@/components/telao/Sidebar";
import PrizePanel from "@/components/telao/PrizePanel";
import Clock from "@/components/telao/Clock";

/**
 * Painel Telão
 * ------------
 * Três colunas: Placar (4º–10º) | Ranking (1º–3º + Live Feed) | Prêmio.
 * Tudo chega via Supabase Realtime (useGifts + useSettings), então
 * qualquer alteração feita no celular aparece aqui na hora, sem F5.
 */
export default function TelaoPage() {
  const { gifts, loading } = useGifts();
  const { prizeTitle, prizeImageUrl } = useSettings();

  const rest = gifts.slice(3, 10);
  const participantes = gifts.length;

  return (
    <main className="bg-scoreboard min-h-screen text-[#EDEBE3]">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-6 sm:py-7 min-h-screen flex flex-col">
        {/* -------- TOPO -------- */}
        <header className="mb-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-number uppercase tracking-[0.35em] text-xs text-muted">Casamento</p>
              <h1 className="font-serifName font-bold text-2xl sm:text-3xl mt-1">
                Leo <span className="text-goldSoft">❤</span> Lari
              </h1>
            </div>

            <div className="text-right">
              <Clock />
              {gifts.length > 0 && (
                <p className="font-number text-xs text-muted mt-2 tabular">
                  Participantes <span className="text-goldSoft font-semibold">{participantes}</span>
                </p>
              )}
            </div>
          </div>

          {/* Título grande e centralizado, logo acima do ranking */}
          <h2 className="font-serifName font-bold text-center leading-[1.3] pb-1 text-4xl sm:text-6xl mt-4 sm:mt-6 mb-6 sm:mb-10 text-gold-gradient-dark">
            Ranking da Gravata
          </h2>
        </header>

        {/* -------- CONTEÚDO -------- */}
        {loading ? (
          <p className="text-center font-serifName text-2xl py-20 text-muted">Carregando ranking…</p>
        ) : gifts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🎁</p>
            <p className="font-serifName text-3xl text-muted">Aguardando os primeiros presentes…</p>
          </div>
        ) : (
          <div className="flex-1 grid gap-5 grid-cols-1 lg:grid-cols-[230px_1fr_260px]">
            <Sidebar gifts={rest} />

            <div className="min-w-0">
              <RankingBoard gifts={gifts} />
            </div>

            <PrizePanel prizeTitle={prizeTitle} prizeImageUrl={prizeImageUrl} />
          </div>
        )}
      </div>
    </main>
  );
}
