import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ink: "#02040a", night: "#070d1c", ivory: "#f5f1e8", gold: "#d2b47b", mist: "#99a6c8" }, boxShadow: { halo: "0 0 120px rgba(118,139,187,0.22)" } } },
  plugins: []
} satisfies Config;
