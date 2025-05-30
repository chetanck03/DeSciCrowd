import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        desci: {
          "primary": "#4F46E5", // Vibrant Blue
          "secondary": "#06B6D4", // Teal
          "accent": "#A78BFA", // Soft Purple
          "neutral": "#1F2937", // Dark Neutral
          "base-100": "#FFFFFF", // Light Base
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
export default config;
