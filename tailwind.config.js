/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
      },
      colors: {
        bg:      "#0d0f14",
        card:    "#1e2130",
        "card-raised": "#252840",
        accent:  "#4f8ef7",
        purple:  "#7b5cf0",
        gold:    "#f5c518",
        green:   "#22c55e",
        teal:    "#2dd4bf",
        orange:  "#fb923c",
        red:     "#ef4444",
        muted:   "#6b7280",
        subtle:  "rgba(255,255,255,0.07)",
      },
      backgroundImage: {
        "primary-gradient":     "linear-gradient(135deg, #4f8ef7, #7b5cf0)",
        "gold-gradient":        "linear-gradient(135deg, #f5c518, #f97316)",
        "purple-gradient":      "linear-gradient(135deg, #7b5cf0, #ec4899)",
        "blue-gradient":        "linear-gradient(135deg, #4f8ef7, #06b6d4)",
        "teal-gradient":        "linear-gradient(135deg, #2dd4bf, #06b6d4)",
        "orange-gradient":      "linear-gradient(135deg, #fb923c, #f5c518)",
        "avatar-gradient":      "linear-gradient(135deg, #4f8ef7, #7b5cf0)",
        "avatar-partner":       "linear-gradient(135deg, #f97316, #ef4444)",
      },
      boxShadow: {
        "primary-glow": "0 4px 24px rgba(79,142,247,0.35)",
        "card":         "0 2px 16px rgba(0,0,0,0.4)",
        "gold-glow":    "0 2px 12px rgba(245,197,24,0.4)",
      },
      borderRadius: {
        xl2: "16px",
        xl3: "20px",
        xl4: "24px",
      },
      maxWidth: {
        app: "430px",
      },
      height: {
        dvh: "100dvh",
      },
      animation: {
        "spin-slow":   "spin 2s linear infinite",
        "pulse-ring":  "pulseRing 2s ease-out infinite",
        "pulse-ring2": "pulseRing 2s ease-out infinite 0.7s",
        "fade-up":     "fadeUp 0.25s ease-out forwards",
        "tab-in":      "tabIn 0.22s ease-out forwards",
      },
      keyframes: {
        pulseRing: {
          "0%":   { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.55)", opacity: "0" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        tabIn: {
          "0%":   { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
