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
          ink: "#121a2f",
          deep: "#192646",
          soft: "#F8F9FB",
          accent: "#d7a15f",
          coral: "#f07e6e"
        }
      },
      fontFamily: {
        sans: ["Avenir Next", "Segoe UI", "Helvetica Neue", "sans-serif"],
        heading: ["Baskerville", "Times New Roman", "serif"]
      },
      boxShadow: {
        glow: "0 20px 60px -30px rgba(18, 26, 47, 0.5)",
        card: "0 16px 40px -24px rgba(18, 26, 47, 0.35)"
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
