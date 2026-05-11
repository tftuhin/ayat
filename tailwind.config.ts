import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#fbf6ef",
        "bg-warm": "#f5ede6",
        "bg-cool": "#f2ede8",
        ink: "#3a2a1f",
        "ink-soft": "#6b5644",
        "ink-mute": "#95877a",
        peach: "#d4a373",
        "peach-deep": "#a67352",
        lavender: "#c9c5e0",
        "lavender-deep": "#8b7ca6",
        sage: "#c1d4a8",
        gold: "#d4b376",
        rose: "#d45f7f",
        sky: "#a8d5f7",
        line: "#e5dfd5",
      },
      fontFamily: {
        display: ["Caprasimo", "Georgia", "serif"],
        body: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        hand: ["Caveat", "cursive"],
      },
      animation: {
        "float-y": "float-y 2.6s ease-in-out infinite",
        twinkle: "twinkle 2s ease-in-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        "blob-morph": "blob-morph 12s ease-in-out infinite",
      },
      keyframes: {
        "float-y": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(8deg)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.25)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "blob-morph": {
          "0%, 100%": { borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%" },
          "50%": { borderRadius: "40% 60% 45% 55% / 60% 45% 55% 40%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
