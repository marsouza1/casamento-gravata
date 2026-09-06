"use client";

import { useState } from "react";
import { formatBRL } from "@/lib/format";

export default function GiftItem({ gift, position, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(gift.name);
  const [amount, setAmount] = useState(gift.amount);

  const handleSave = () => {
    onUpdate(gift.id, { name, amount });
    setEditing(false);
  };

  const handleCancel = () => {
    setName(gift.name);
    setAmount(gift.amount);
    setEditing(false);
  };

  const bump = (delta) => {
    const novo = Math.max(0, Number(gift.amount) + delta);
    onUpdate(gift.id, { amount: novo });
  };

  if (editing) {
    return (
      <div className="rounded-2xl bg-white border border-champagne p-4 shadow-card">
        <label className="block text-xs text-ink/50 font-number mb-1">Nome</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-sand bg-cream px-3 py-2 font-serifName text-lg mb-3 outline-none focus:border-gold"
          placeholder="Nome da pessoa ou casal"
        />

        <label className="block text-xs text-ink/50 font-number mb-1">Valor (R$)</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          inputMode="decimal"
          className="w-full rounded-xl border border-sand bg-cream px-3 py-2 font-number text-lg mb-4 outline-none focus:border-gold tabular"
          placeholder="0"
        />

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 rounded-xl bg-gold text-white font-number font-semibold py-2.5 active:scale-95 transition"
          >
            Salvar
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 rounded-xl border border-sand text-ink/70 font-number py-2.5 active:scale-95 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-champagne p-3 shadow-card">
      <div className="flex items-center gap-3">
        <div className="shrink-0 w-8 h-8 rounded-full bg-cream border border-champagne flex items-center justify-center font-number font-bold text-goldDeep text-sm">
          {position}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-serifName text-xl leading-tight text-ink truncate">{gift.name}</p>
          <p className="font-number font-bold text-goldDeep tabular">{formatBRL(gift.amount)}</p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => bump(-50)}
            className="w-9 h-9 rounded-lg bg-cream border border-sand text-ink/70 font-number text-lg active:scale-90 transition"
            aria-label="Diminuir 50 reais"
          >
            −
          </button>
          <button
            onClick={() => bump(50)}
            className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/40 text-goldDeep font-number text-lg active:scale-90 transition"
            aria-label="Aumentar 50 reais"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => setEditing(true)}
          className="flex-1 rounded-lg border border-sand text-ink/70 font-number text-sm py-2 active:scale-95 transition"
        >
          ✏️ Editar
        </button>
        <button
          onClick={() => {
            if (confirm(`Excluir "${gift.name}"?`)) onDelete(gift.id);
          }}
          className="flex-1 rounded-lg border border-red-200 text-red-500 font-number text-sm py-2 active:scale-95 transition"
        >
          🗑️ Excluir
        </button>
      </div>
    </div>
  );
}
