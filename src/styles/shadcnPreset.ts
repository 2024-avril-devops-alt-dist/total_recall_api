import type { Config } from "tailwindcss";
import { shadcnPlugin } from "./shadcnPlugin";
import animatePlugin from "tailwindcss-animate";

export const shadcnPreset = {
  darkMode: ["class", "[data-theme='dark']"],
  content: [],
  plugins: [animatePlugin, shadcnPlugin],
} satisfies Config;
