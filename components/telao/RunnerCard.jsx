"use client";

import { motion } from "framer-motion";
import { formatBRL } from "@/lib/format";

const THEME = {
  2: { label: "2º Lugar", color: "#C7CBD4" },
  3: { label: "3º Lugar", color: "#D9A46B" },
};

export default function RunnerCard({ gift, rank }) {
  const theme = THEME[rank];

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 230, damping: 27 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="rounded-2xl p-5 sm:p-6 border border-goldSoft/20"
      style={{ background: "linear-gradient(180deg,#141822,#0f131b)" }}
    >
      <p
        className="font-number font-extrabold uppercase tracking-[0.18em] text-xs sm:text-sm mb-2"
        style={{ color: theme.color }}
      >
        {theme.label}
      </p>
      <p className="font-serifName font-extrabold text-xl sm:text-3xl text-[#EDEBE3]">{gift.name}</p>
      <p
        className="font-number font-extrabold tabular text-lg sm:text-2xl mt-1"
        style={{ color: theme.color }}
      >
        {formatBRL(gift.amount)}
      </p>
    </motion.div>
  );
}
