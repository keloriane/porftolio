import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import theme from "./src/config/theme.json";

let font_base = Number(theme.fonts.font_size.base.replace("px", ""));
let font_scale = Number(theme.fonts.font_size.scale);
let h6 = font_scale;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;

const extraColumns = {
  13: "13",
  14: "14",
  15: "15",
  16: "16",
  17: "17",
  18: "18",
  19: "19",
  20: "20",
  21: "21",
  22: "22",
  23: "23",
  24: "24",
  25: "25",
  26: "26",
  27: "27",
};

const config: Config = {
  darkMode: "class", // Enable dark mode based on class
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern:
        /col-(start|end)-(1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27)/,
      variants: ["sm", "md", "lg", "xl", "2xl"],
    },
    {
      pattern: /grid-cols-(\d+)/,
      variants: ["sm", "md", "lg", "xl", "2xl"],
    },
  ],
  theme: {
    extend: {
      colors: {
        text: theme.colors.default.text_color.default,
        accent: theme.colors.default.text_color.accent,
        light: theme.colors.default.text_color.light,
        lightXl: theme.colors.default.theme_color.lightXl,
        dark: theme.colors.default.text_color.dark,
        primary: theme.colors.default.theme_color.primary,
        body: theme.colors.default.theme_color.body,
        border: theme.colors.default.theme_color.border,
        "theme-light": theme.colors.default.theme_color.theme_light,
        "theme-dark": theme.colors.default.theme_color.theme_dark,
        darkmode: {
          text: theme.colors.darkmode.text_color.default,
          light: theme.colors.darkmode.text_color.light,
          accent: theme.colors.default.text_color.accent,
          dark: theme.colors.darkmode.text_color.dark,
          primary: theme.colors.darkmode.theme_color.primary,
          body: theme.colors.darkmode.theme_color.body,
          border: theme.colors.darkmode.theme_color.border,
          "theme-light": theme.colors.darkmode.theme_color.theme_light,
          "theme-dark": theme.colors.darkmode.theme_color.theme_dark,
        },
      },
      fontSize: {
        base: font_base + "px",
        "base-sm": font_base * 0.8 + "px",
        h1: h1 + "rem",
        "h1-sm": h1 * 0.9 + "rem",
        h2: h2 + "rem",
        "h2-sm": h2 * 0.9 + "rem",
        h3: h3 + "rem",
        "h3-sm": h3 * 0.9 + "rem",
        h4: h4 + "rem",
        h5: h5 + "rem",
        h6: h6 + "rem",
      },
      fontFamily: {
        primary: "degular, sans-serif",
      },
      gridTemplateColumns: {
        ...Array.from({ length: 27 }, (_, i) => i + 1).reduce(
          (acc, curr) => ({
            ...acc,
            [curr]: `repeat(${curr}, 1fr)`,
          }),
          {}
        ),
      },
      gridColumnStart: extraColumns,
      gridColumnEnd: extraColumns,
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};

export default config;
