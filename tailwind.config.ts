import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: "#FBF2F3",
          100: "#F3DDE0",
          500: "#8C2233",
          600: "#7A1B2B",
          700: "#6E1423",
          800: "#57101C",
          900: "#420C15",
        },
        charcoal: {
          700: "#2C2F33",
          800: "#23262A",
          900: "#1A1C1F",
        },
        mist: {
          50: "#F7F7F8",
          100: "#EDEEF0",
          200: "#DFE1E4",
          300: "#C6C9CE",
          500: "#8A8F96",
          600: "#6E7276",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      maxWidth: { shell: "76rem" },
    },
  },
  plugins: [],
};
export default config;
