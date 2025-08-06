/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
      },
      fontFamily: {
        satoshi: ["var(--font-satoshi)", "sans-serif"],
        helvetica_compressed: [
          "var(--font-helvetica-compressed)",
          "sans-serif",
        ],
        helvetica: ["Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        gold: { 50: "#FAF5F2", 400: "#D9B194", 500: "#CF9E79", 900: "#574233" },
        green: "#24786D",
        white: { 50: "#FEFEFE", 500: "#F9F9F9", 600: "#E3E3E3", 900: "#fff" },
        dark: "#0B0B0B",
        black: {
          50: "#E7E7E7",
          100: "#B3B3B3",
          200: "#8F8F8F",
          300: "#5C5C5C",
          500: "#0B0B0B",
          900: "#000",
        },
      },
    },
  },
  plugins: [],
};
