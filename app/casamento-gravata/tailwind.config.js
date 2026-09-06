/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta clara (tela inicial e painel do celular)
        cream: "#FBF7F0",
        sand: "#F0E6D6",
        champagne: "#E7D3B3",
        gold: "#C8A24B",
        goldDeep: "#9C7A2E",
        ink: "#3A3226",

        // Paleta escura (telão — dashboard estilo placar)
        panel: "#12161f",
        panel2: "#161b26",
        goldSoft: "#D4AF6A",
        goldBright: "#F3D48A",
        goldDark: "#A9822F",
        muted: "#8C93A6",
        silverText: "#C7CBD4",
        bronzeText: "#D9A46B",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        serifName: ["var(--font-name)", "serif"],
        number: ["var(--font-number)", "sans-serif"],
      },
      boxShadow: {
        gold: "0 10px 40px -8px rgba(200, 162, 75, 0.45)",
        card: "0 8px 30px -10px rgba(58, 50, 38, 0.25)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        shimmer: "shimmer 3.5s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
