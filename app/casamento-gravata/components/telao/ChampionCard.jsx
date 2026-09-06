"use client";

import { motion } from "framer-motion";
import { formatBRL } from "@/lib/format";

/**
 * ChampionCard
 * ------------
 * Card de destaque máximo do telão: o 1º lugar.
 * Sem foto — só coroa, o rótulo "1º Lugar", nome e valor bem grandes,
 * com brilho suave passando e leve flutuação.
 *
 * O `layout` do Framer Motion faz o card animar quando alguém mais
 * assume essa posição (o card antigo "desce" para os coadjuvantes e
 * este aparece aqui suavemente).
 */
export default function ChampionCard({ gift }) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative overflow-hidden rounded-3xl p-8 sm:p-10 text-center border border-goldSoft/40 animate-float"
      style={{
        background:
          "radial-gradient(120% 140% at 50% -10%, rgba(212,175,106,.30), transparent 60%), linear-gradient(180deg, #171a22, #0f1218)",
        boxShadow: "0 0 70px -12px rgba(212,175,106,.35)",
      }}
    >
      {/* Brilho que atravessa o card */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute top-0 -left-1/3 h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      </div>

      <div className="relative z-10">
        <div className="text-3xl sm:text-4xl text-goldBright drop-shadow">👑</div>

        <p className="font-number font-extrabold uppercase tracking-[0.25em] mt-2 text-base sm:text-lg text-goldBright">
          1º Lugar
        </p>

        <p className="font-serifName font-bold leading-tight mt-3 text-4xl sm:text-6xl text-[#EDEBE3]">
          {gift.name}
        </p>

        <p className="font-number font-extrabold tabular mt-3 text-5xl sm:text-7xl text-gold-gradient-dark">
          {formatBRL(gift.amount)}
        </p>
      </div>
    </motion.div>
  );
}
