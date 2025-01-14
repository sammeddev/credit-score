import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        "bl-blue": "#00b5ef",
      },
      backgroundImage: {
        'custom-radial-gradient': 'radial-gradient(97.81% 97.81% at 49.04% 98.81%, #008ACF 9%, #58B8F3 100%)',
      },
      boxShadow: {
        custom: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        cardShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
        shadowCommon:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
      },
      scale: {
        103: '1.03', // Custom scale value
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
