"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!now) return null;

  const hora = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  return <div className="font-number tabular text-xl sm:text-2xl tracking-wide text-muted">{hora}</div>;
}
