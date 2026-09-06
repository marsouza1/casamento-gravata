import "./globals.css";
import { Playfair_Display, Cormorant_Garamond, Outfit } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-name",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-number",
});

export const metadata = {
  title: "Leo & Lari — Ranking da Gravata",
  description: "Ranking da brincadeira da gravata em tempo real",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${playfair.variable} ${cormorant.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
