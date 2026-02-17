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
          ink: "#1d1e22",
          deep: "#393f4d",
          soft: "#d4d4dc",
          accent: "#feda6a",
          coral: "#e8c75c"
        }
      },
      fontFamily: {
        sans: ["Avenir Next", "Segoe UI", "Helvetica Neue", "sans-serif"],
        heading: ["Baskerville", "Times New Roman", "serif"]
      },
      boxShadow: {
        glow: "0 20px 60px -30px rgba(29, 30, 34, 0.65)",
        card: "0 16px 40px -24px rgba(29, 30, 34, 0.5)"
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
