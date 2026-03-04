/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      // ── Colors mapped to CSS variables (theme switching works) ──────────
      colors: {
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        surface:     "hsl(var(--surface))",
        "surface-2": "hsl(var(--surface-2))",
        border:      "hsl(var(--border))",
        primary:     "hsl(var(--primary))",
        muted:       "hsl(var(--muted))",
      },

      // ── Typography ──────────────────────────────────────────────────────
      fontFamily: {
        mono:    ["var(--font-mono)", "monospace"],
        display: ["var(--font-display)", "sans-serif"],
      },

      // ── Animations ──────────────────────────────────────────────────────
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        blink:     "blink 1.1s step-end infinite",
        "fade-up": "fadeInUp 0.55s ease both",
      },

    },
  },
  plugins: [],
}