/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Space Grotesk'", "sans-serif"],
      },
      colors: {
        bg:       "#070b13",
        surface:  "#0d1525",
        elevated: "#142030",
        raised:   "#1b2d43",
        teal:     "#00c9b1",
        amber:    "#f59e0b",
        green:    "#10b981",
        red:      "#ef4444",
        blue:     "#3b82f6",
        muted:    "#5a6e8a",
        hint:     "#1e2f45",
        subtle:   "rgba(255,255,255,0.04)",
      },
      backgroundImage: {
        "teal-gradient":  "linear-gradient(135deg, #00c9b1, #00a3ff)",
        "amber-gradient": "linear-gradient(135deg, #f59e0b, #ef4444)",
      },
      boxShadow: {
        "teal-glow":     "0 0 28px rgba(0,201,177,0.25), 0 4px 16px rgba(0,0,0,0.5)",
        "teal-glow-sm":  "0 0 16px rgba(0,201,177,0.15)",
        "amber-glow":    "0 0 20px rgba(245,158,11,0.2)",
        "card":          "0 4px 24px rgba(0,0,0,0.4)",
        "card-lg":       "0 8px 40px rgba(0,0,0,0.5)",
      },
      borderRadius: {
        xl2: "16px", xl3: "20px", xl4: "24px",
      },
      maxWidth: { app: "430px" },
      animation: {
        "tab-in":      "tabIn 0.22s ease-out forwards",
        "scale-in":    "scaleIn 0.3s ease-out forwards",
        "pulse-ring":  "pulseRing 2s ease-out infinite",
        "pulse-ring2": "pulseRing 2s ease-out infinite 0.7s",
        "slide-up":    "slideUp 0.35s cubic-bezier(0.2,0.8,0.2,1) forwards",
        "mic-pulse":   "micPulse 2.2s ease-in-out infinite",
        "spin-slow":   "spin 2s linear infinite",
      },
      keyframes: {
        tabIn:     { "0%": { opacity:"0", transform:"translateY(10px)" }, "100%": { opacity:"1", transform:"translateY(0)" } },
        scaleIn:   { "0%": { opacity:"0", transform:"scale(0.95)" },      "100%": { opacity:"1", transform:"scale(1)" } },
        slideUp:   { from: { transform:"translateY(100%)", opacity:"0" }, to: { transform:"translateY(0)", opacity:"1" } },
        pulseRing: { "0%": { transform:"scale(0.9)", opacity:"0.7" },     "100%": { transform:"scale(1.55)", opacity:"0" } },
        micPulse:  { "0%,100%": { boxShadow:"0 0 0 0 rgba(0,201,177,0.5)" }, "50%": { boxShadow:"0 0 0 22px rgba(0,201,177,0)" } },
      },
    },
  },
  plugins: [],
};
