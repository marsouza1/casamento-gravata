"use client";

import { useRef, useState, useEffect } from "react";

/**
 * PrizeEditor
 * -----------
 * Seção do painel do celular para configurar o prêmio do 1º lugar:
 *   - trocar o nome (ex: "Green Label")
 *   - enviar uma imagem PNG (sobe pro Supabase Storage)
 *
 * Assim que salva, o telão atualiza sozinho (Realtime na tabela "settings").
 */
export default function PrizeEditor({
  prizeTitle,
  prizeImageUrl,
  uploading,
  onUpdateTitle,
  onUploadImage,
}) {
  const [title, setTitle] = useState(prizeTitle);
  const fileRef = useRef(null);

  // Mantém o campo sincronizado se o valor mudar vindo de outro dispositivo
  useEffect(() => setTitle(prizeTitle), [prizeTitle]);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) onUploadImage(file);
  };

  return (
    <div className="rounded-2xl bg-white border border-champagne p-4 shadow-card">
      <p className="font-number text-xs uppercase tracking-widest text-ink/50 mb-3">
        🏆 Prêmio do 1º lugar
      </p>

      <div className="flex gap-2 mb-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 rounded-xl border border-sand bg-cream px-3 py-2 font-serifName text-lg outline-none focus:border-gold"
          placeholder="Nome do prêmio"
        />
        <button
          onClick={() => onUpdateTitle(title)}
          className="rounded-xl bg-gold text-white font-number font-semibold px-4 active:scale-95 transition"
        >
          Salvar
        </button>
      </div>

      <div className="flex items-center gap-3">
        {prizeImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={prizeImageUrl}
            alt="Prêmio"
            className="w-14 h-14 object-contain rounded-lg border border-sand bg-cream shrink-0"
          />
        )}
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex-1 rounded-xl border border-sand text-ink/70 font-number text-sm py-2.5 active:scale-95 transition disabled:opacity-50"
        >
          {uploading ? "Enviando…" : "🖼️ Enviar imagem (PNG)"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/png"
          className="hidden"
          onChange={handleFile}
        />
      </div>
    </div>
  );
}
