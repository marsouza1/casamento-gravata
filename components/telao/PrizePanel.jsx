"use client";

/**
 * PrizePanel
 * ----------
 * Mostra o prêmio exclusivo do 1º lugar.
 * Se uma imagem PNG foi enviada pelo painel do celular, ela aparece aqui
 * (sincronizada em tempo real). Caso contrário, mostra uma garrafa
 * ilustrativa de exemplo.
 */
export default function PrizePanel({ prizeTitle, prizeImageUrl }) {
  return (
    <aside className="rounded-[20px] border border-goldSoft/20 bg-gradient-to-b from-panel to-panel2 p-5 flex flex-col items-center">
      <div className="text-center mb-4">
        <p className="font-serifName font-bold text-2xl sm:text-3xl leading-tight text-goldBright drop-shadow-[0_0_18px_rgba(243,212,138,0.45)]">
          Prêmio para
          <br />o 1º Lugar
        </p>
      </div>

      <div className="w-full flex items-center justify-center rounded-2xl border border-goldSoft/30 mb-4 py-4 px-2 min-h-[220px] bg-goldSoft/5">
        {prizeImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={prizeImageUrl} alt={prizeTitle} className="max-h-52 object-contain" />
        ) : (
          <DefaultBottle />
        )}
      </div>

      <p className="font-serifName font-bold text-center mb-4 text-[#EDEBE3]">{prizeTitle}</p>

      <div className="flex flex-col items-center">
        <div
          className="w-20 h-20 rounded-full flex flex-col items-center justify-center font-number font-extrabold text-[#3a2c0d]"
          style={{
            background: "radial-gradient(circle at 35% 30%, #f6e2ab, #d4af6a 55%, #a9822f)",
            boxShadow: "0 6px 18px -4px rgba(212,175,106,.6)",
          }}
        >
          <span className="text-2xl leading-none">1</span>
          <span className="text-[9px] uppercase">Lugar</span>
        </div>
      </div>
    </aside>
  );
}

// Ilustração padrão (própria, não é logo de nenhuma marca) usada até
// alguém enviar uma foto real do prêmio pelo painel do celular.
function DefaultBottle() {
  return (
    <svg width="110" height="200" viewBox="0 0 120 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0f3a2b" />
          <stop offset="0.5" stopColor="#1c5a41" />
          <stop offset="1" stopColor="#0b2e22" />
        </linearGradient>
        <linearGradient id="capg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a9822f" />
          <stop offset="0.5" stopColor="#f3d48a" />
          <stop offset="1" stopColor="#a9822f" />
        </linearGradient>
      </defs>
      <rect x="50" y="8" width="20" height="34" rx="3" fill="url(#capg)" />
      <rect x="47" y="38" width="26" height="14" rx="4" fill="url(#glass)" />
      <path
        d="M30 52 Q30 60 30 66 L24 96 Q22 108 22 130 L22 196 Q22 208 34 208 L86 208 Q98 208 98 196 L98 130 Q98 108 96 96 L90 66 Q90 60 90 52 Z"
        fill="url(#glass)"
        stroke="rgba(212,175,106,.5)"
        strokeWidth="1.5"
      />
      <rect x="34" y="118" width="52" height="50" rx="3" fill="#0c1a14" stroke="#d4af6a" strokeWidth="1.2" />
      <text x="60" y="136" textAnchor="middle" fill="#d4af6a" fontSize="7" fontFamily="Outfit" letterSpacing="1">
        WHISKY
      </text>
      <text x="60" y="150" textAnchor="middle" fill="#f3d48a" fontSize="8.5" fontFamily="Outfit" fontWeight="700" letterSpacing=".5">
        GREEN
      </text>
      <text x="60" y="160" textAnchor="middle" fill="#f3d48a" fontSize="8.5" fontFamily="Outfit" fontWeight="700" letterSpacing=".5">
        LABEL
      </text>
      <rect x="26" y="60" width="8" height="140" fill="rgba(255,255,255,.08)" />
    </svg>
  );
}
