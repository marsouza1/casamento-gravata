import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-wedding min-h-screen flex items-center justify-center p-6">
      <div className="texture-dots absolute inset-0 pointer-events-none" />

      <div className="relative z-10 text-center max-w-md w-full">
        <p className="font-display text-ink/60 tracking-[0.35em] uppercase text-sm">
          Casamento
        </p>
        <h1 className="font-display text-5xl sm:text-6xl mt-2 text-gold-gradient">
          Leo <span className="text-goldDeep">❤</span> Lari
        </h1>
        <div className="rule-gold my-6 mx-auto w-40" />
        <p className="font-serifName text-2xl text-ink/70 mb-10">Ranking da Gravata</p>

        <div className="flex flex-col gap-4">
          <Link
            href="/admin"
            className="rounded-2xl bg-gold text-white font-number font-semibold py-4 px-6 shadow-gold hover:brightness-105 active:scale-[0.99] transition"
          >
            📱 Painel do Celular
          </Link>

          <Link
            href="/telao"
            className="rounded-2xl border-2 border-gold text-goldDeep font-number font-semibold py-4 px-6 hover:bg-gold/10 active:scale-[0.99] transition"
          >
            📺 Abrir o Telão
          </Link>
        </div>

        <p className="mt-10 text-xs text-ink/40 font-number">
          Abra o telão na TV e o painel no celular. Tudo sincroniza sozinho.
        </p>
      </div>
    </main>
  );
}
