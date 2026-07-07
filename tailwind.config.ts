import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vazir: ["var(--font-abar)", "Vazirmatn", "Tahoma", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          blue: "#0B63E5",
          navy: "#2E3192",
          navydark: "#061C3D",
          yellow: "#FED213",
          dark: "#1C1C1C",
          card: "#26262C",
        },
      },
    },
  },
  plugins: [],
};
export default config;
