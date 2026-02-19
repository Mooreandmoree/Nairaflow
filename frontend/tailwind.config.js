/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          DEFAULT: "#39ff14",
          50: "#f0fff4",
          100: "#dcffe4",
          200: "#a7ffb5",
          300: "#6fff7a",
          400: "#39ff14",
          500: "#2ed610",
          600: "#22b009",
          700: "#1a8a07",
          800: "#136605",
          900: "#0d4203",
        },
        dark: {
          DEFAULT: "#0a0a0a",
          50: "#2a2a2a",
          100: "#1f1f1f",
          200: "#1a1a1a",
          300: "#151515",
          400: "#111111",
          500: "#0d0d0d",
          600: "#0a0a0a",
          700: "#070707",
          800: "#050505",
          900: "#020202",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        draw: "draw 1.5s ease-out forwards",
      },
      keyframes: {
        "pulse-neon": {
          "0%, 100%": {
            boxShadow: "0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 15px #39ff14",
          },
          "50%": {
            boxShadow: "0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14",
          },
        },
        glow: {
          "0%": { textShadow: "0 0 10px #39ff14, 0 0 20px #39ff14" },
          "100%": { textShadow: "0 0 20px #39ff14, 0 0 40px #39ff14" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        draw: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      boxShadow: {
        neon: "0 0 10px #39ff14, 0 0 20px rgba(57, 255, 20, 0.5)",
        "neon-lg": "0 0 20px #39ff14, 0 0 40px rgba(57, 255, 20, 0.5)",
        "neon-xl": "0 0 30px #39ff14, 0 0 60px rgba(57, 255, 20, 0.5)",
        "inner-neon": "inset 0 0 20px rgba(57, 255, 20, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern":
          "linear-gradient(rgba(57, 255, 20, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.03) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
