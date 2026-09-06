"use client";

import { motion, AnimatePresence } from "framer-motion";
import { formatBRL } from "@/lib/format";

/**
 * Sidebar — "Placar"
 * ------------------
 * Lista discreta das posições 4 a 10. Usa `layout` do Framer Motion
 * para que cada linha deslize suavemente até a nova posição quando o
 * ranking muda.
 */
export default function Sidebar({ gifts }) {
  return (
    <aside className="rounded-[20px] border border-goldSoft/20 bg-gradient-to-b from-panel to-panel2 p-5">
      <h3 className="font-number font-extrabold uppercase tracking-[0.2em] text-xs text-goldSoft mb-4">
        Placar
      </h3>

      {gifts.length === 0 ? (
        <p className="text-sm text-muted">Ninguém no placar ainda.</p>
      ) : (
        <AnimatePresence>
          {gifts.map((gift, i) => (
            <motion.div
              key={gift.id}
              layout
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-none"
            >
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-xs text-muted shrink-0">{i + 4}º</span>
                <span className="font-serifName font-semibold text-sm text-[#DAD8CF] truncate">
                  {gift.name}
                </span>
              </div>
              <span className="font-number font-semibold text-xs tabular text-goldSoft shrink-0 ml-2">
                {formatBRL(gift.amount)}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </aside>
  );
}
