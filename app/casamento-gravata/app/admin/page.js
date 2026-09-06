"use client";

import { useGifts } from "@/hooks/useGifts";
import { useSettings } from "@/hooks/useSettings";
import { formatBRL } from "@/lib/format";
import GiftForm from "@/components/admin/GiftForm";
import GiftItem from "@/components/admin/GiftItem";
import PrizeEditor from "@/components/admin/PrizeEditor";

export default function AdminPage() {
  const { gifts, loading, error, addGift, updateGift, deleteGift } = useGifts();
  const {
    prizeTitle,
    prizeImageUrl,
    uploading,
    error: prizeError,
    updatePrizeTitle,
    uploadPrizeImage,
  } = useSettings();

  const total = gifts.reduce((soma, g) => soma + Number(g.amount), 0);
  const participantes = gifts.length;

  return (
    <main className="bg-wedding min-h-screen">
      <header className="sticky top-0 z-20 bg-cream/85 backdrop-blur border-b border-champagne px-4 py-3">
        <div className="max-w-md mx-auto">
          <div className="flex items-baseline justify-between">
            <h1 className="font-display text-2xl text-gold-gradient">Leo ❤ Lari</h1>
            <span className="font-number text-xs text-ink/50 uppercase tracking-widest">Painel</span>
          </div>

          <div className="flex gap-3 mt-2">
            <div className="flex-1 rounded-xl bg-white/70 border border-champagne px-3 py-1.5">
              <p className="text-[10px] text-ink/50 font-number uppercase">Total</p>
              <p className="font-number font-bold text-goldDeep tabular">{formatBRL(total)}</p>
            </div>
            <div className="flex-1 rounded-xl bg-white/70 border border-champagne px-3 py-1.5">
              <p className="text-[10px] text-ink/50 font-number uppercase">Participantes</p>
              <p className="font-number font-bold text-goldDeep tabular">{participantes}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        <GiftForm onAdd={addGift} />

        {error && (
          <p className="rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 font-number">
            Erro: {error}
          </p>
        )}

        {loading ? (
          <p className="text-center text-ink/50 font-number py-8">Carregando…</p>
        ) : gifts.length === 0 ? (
          <p className="text-center text-ink/50 font-serifName text-lg py-8">
            Nenhum presente ainda. Adicione o primeiro! 🎁
          </p>
        ) : (
          <div className="space-y-3">
            {gifts.map((gift, index) => (
              <GiftItem
                key={gift.id}
                gift={gift}
                position={index + 1}
                onUpdate={updateGift}
                onDelete={deleteGift}
              />
            ))}
          </div>
        )}

        {/* Configuração do prêmio do 1º lugar (nome + imagem) */}
        <PrizeEditor
          prizeTitle={prizeTitle}
          prizeImageUrl={prizeImageUrl}
          uploading={uploading}
          onUpdateTitle={updatePrizeTitle}
          onUploadImage={uploadPrizeImage}
        />
        {prizeError && (
          <p className="rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 font-number">
            Erro no prêmio: {prizeError}
          </p>
        )}

        <p className="text-center text-[11px] text-ink/40 font-number pt-2 pb-8">
          Abra <span className="font-semibold">/telao</span> na TV para exibir o ranking.
        </p>
      </div>
    </main>
  );
}
