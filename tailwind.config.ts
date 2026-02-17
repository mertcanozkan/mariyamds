import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#121417",
          deep: "#1C1F24",
          soft: "#F2F2F2",
          muted: "#A0A6B0",
          accent: "#B4FF00",
          coral: "#8DFF00"
        }
      },
      fontFamily: {
        sans: ["Avenir Next", "Segoe UI", "Helvetica Neue", "sans-serif"],
        heading: ["Baskerville", "Times New Roman", "serif"]
      },
      boxShadow: {
        glow: "0 20px 60px -30px rgba(180, 255, 0, 0.35)",
        card: "0 16px 40px -24px rgba(18, 20, 23, 0.45)"
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        "gradient-shift": "gradient-shift 18s ease infinite",
        float: "float 5s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
