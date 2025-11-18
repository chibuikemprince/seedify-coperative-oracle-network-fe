import type {Config} from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2f6df5",
          dark: "#1c44a5",
          light: "#8ab1ff"
        },
        surface: {
          DEFAULT: "#0f172a",
          muted: "#1e293b"
        }
      },
      boxShadow: {
        card: "0 8px 30px rgba(15, 23, 42, 0.4)"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};

export default config;
