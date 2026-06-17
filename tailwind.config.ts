import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm paper base
        cream: "#f1ece1",
        paper: "#f6f1e7",
        ink: "#211f17",
        "ink-soft": "#56523f",
        // Deep muted olive — the dark "green block" surfaces (replaces near-black)
        night: "#212a22",
        "night-700": "#28322a",
        "night-600": "#313d33",
        // Muted olive-forest scale
        forest: {
          50: "#eef1ea",
          100: "#dce2d6",
          200: "#bcc7b6",
          300: "#94a591",
          400: "#6d7f6c",
          500: "#52634f",
          600: "#42513f",
          700: "#344233",
          800: "#2a352a",
          900: "#212a22",
        },
        // Soft warm gold (used where a lighter accent is needed)
        mint: {
          DEFAULT: "#d29a57",
          soft: "#e3b87f",
          deep: "#a9712f",
        },
        // Muted ochre / terracotta — primary accent
        amber: {
          DEFAULT: "#c5863f",
          soft: "#d8a463",
          deep: "#9c6224",
        },
        ochre: {
          DEFAULT: "#c5863f",
          soft: "#d8a463",
          deep: "#9c6224",
        },
        sage: "#dbe1d4",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        ultra: "0.35em",
      },
      maxWidth: {
        container: "80rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.6" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(8%, -6%) scale(1.15)" },
          "66%": { transform: "translate(-6%, 5%) scale(0.92)" },
        },
        "aurora-slow": {
          "0%, 100%": { transform: "translate(0, 0) scale(1.1)" },
          "50%": { transform: "translate(-10%, 8%) scale(0.95)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        twinkle: {
          "0%, 100%": { transform: "scale(1) rotate(0deg)", opacity: "0.9" },
          "50%": { transform: "scale(1.18) rotate(15deg)", opacity: "1" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        marquee: "marquee 36s linear infinite",
        "marquee-reverse": "marquee-reverse 36s linear infinite",
        aurora: "aurora 20s ease-in-out infinite",
        "aurora-slow": "aurora-slow 26s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        "spin-slow": "spin-slow 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
