"use client";

import { useState } from "react";

export default function GiftForm({ onAdd }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(name, amount);
    setName("");
    setAmount("");
    document.getElementById("campo-nome")?.focus();
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="rounded-2xl bg-white border border-champagne p-4 shadow-card">
      <div className="flex flex-col gap-3">
        <input
          id="campo-nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKey}
          className="w-full rounded-xl border border-sand bg-cream px-4 py-3 font-serifName text-xl outline-none focus:border-gold"
          placeholder="Nome da pessoa ou casal"
        />

        <div className="flex gap-2">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={handleKey}
            type="number"
            inputMode="decimal"
            className="flex-1 rounded-xl border border-sand bg-cream px-4 py-3 font-number text-xl outline-none focus:border-gold tabular"
            placeholder="Valor (R$)"
          />
          <button
            onClick={handleAdd}
            className="shrink-0 rounded-xl bg-gold text-white font-number font-bold px-6 shadow-gold active:scale-95 transition"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
