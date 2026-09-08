/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        //  Primary eco green palette
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e", // main green
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },

        // 🌊 Calm secondary (nature blue)
        secondary: {
          100: "#e0f2fe",
          300: "#7dd3fc",
          500: "#0ea5e9",
          700: "#0369a1",
        },

        //  Neutral soft background colors
        surface: {
          light: "#f9fafb",
          DEFAULT: "#f3f4f6",
          dark: "#1f2937",
        },

        //  Accent (earth tone)
        accent: "#a3e635",
      },

      fontFamily: {
        sans: [
          "Inter",        // modern + clean
          "Roboto",
          "Open Sans",
          "system-ui",
          "sans-serif",
        ],
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },

      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
      },
    },
  },

  plugins: [],
};