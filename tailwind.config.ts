import type { Config } from "tailwindcss";
import { shadcnPreset } from "./src/styles/shadcnPreset";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class", "class"],
  presets: [shadcnPreset],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  plugins: [typography, require("tailwind-scrollbar-hide")],
} satisfies Config;

export default config;
