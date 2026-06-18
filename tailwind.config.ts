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
        // Clean white/cream base
        cream: "#ffffff",
        paper: "#f8fafc",
        ink: "#0f172a",
        "ink-soft": "#334155",
        // The background from the screenshots is light gray/white
        night: "#f4f6f9", // the main background color
        "night-700": "#e2e8f0",
        "night-600": "#cbd5e1",
        // Navy blue scale for headings
        forest: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0a1d37", // Dark navy used in headings
        },
        // Coral Red Accents
        mint: {
          DEFAULT: "#f9554a", // Coral Red
          soft: "#fca5a5",
          deep: "#dc2626",
        },
        // Muted gold/amber — primary accent
        amber: {
          DEFAULT: "#f9554a",
          soft: "#fca5a5",
          deep: "#dc2626",
        },
        ochre: {
          DEFAULT: "#f9554a",
          soft: "#fca5a5",
          deep: "#dc2626",
        },
        sage: "#e2e8f0",
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
