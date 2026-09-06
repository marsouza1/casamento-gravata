"use client";

import { motion, AnimatePresence } from "framer-motion";

/**
 * LiveFeed
 * --------
 * Barra que anuncia o último movimento do ranking (novo presente,
 * valor atualizado ou troca de liderança). A mensagem é calculada em
 * RankingBoard a partir do próprio fluxo em tempo real do Supabase —
 * por isso ela muda sozinha, sem precisar de F5.
 */
export default function LiveFeed({ message }) {
  return (
    <div className="mt-6">
      <p className="font-number font-extrabold uppercase tracking-[0.2em] text-xs text-goldSoft mb-2">
        Live Feed
      </p>
      <div
        className="rounded-full border border-goldSoft/20 px-6 py-3.5 text-center text-sm sm:text-base text-[#DAD8CF] min-h-[1.5rem]"
        style={{ background: "linear-gradient(180deg,#141822,#0f131b)" }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={message || "vazio"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {message || "Aguardando movimentações…"}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
