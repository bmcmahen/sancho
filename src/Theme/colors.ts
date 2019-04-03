import open from "open-color";
import color from "color";
import { createShadows, createDarkShadows } from "./shadows";

export function alpha(c: string, amount: number) {
  return color(c)
    .alpha(amount)
    .hsl()
    .string();
}

const defaultScales = {
  gray: open.gray,
  blue: open.blue,
  green: open.green,
  red: open.red,
  orange: open.orange,
  yellow: open.yellow,
  teal: open.teal,
  cyan: open.cyan,
  lime: open.lime,
  pink: open.pink,
  violet: open.violet,
  indigo: open.indigo
};

export type ScalesType = typeof defaultScales;

type PaletteItem = {
  lightest: string;
  light: string;
  base: string;
  dark: string;
};

export type PaletteType = {
  gray: PaletteItem;
  blue: PaletteItem;
  red: PaletteItem;
  orange: PaletteItem;
  yellow: PaletteItem;
  green: PaletteItem;
  teal: PaletteItem;
  violet: PaletteItem;
};

function generatePalette(scales: ScalesType): PaletteType {
  return {
    gray: {
      lightest: scales.gray[1],
      light: scales.gray[4],
      base: scales.gray[8],
      dark: scales.gray[9]
    },
    blue: {
      lightest: scales.blue[1],
      light: scales.blue[5],
      base: scales.blue[8],
      dark: scales.blue[9]
    },
    red: {
      lightest: scales.red[1],
      light: scales.red[6],
      base: scales.red[8],
      dark: scales.red[9]
    },
    orange: {
      lightest: scales.orange[1],
      light: scales.orange[4],
      base: scales.orange[8],
      dark: scales.orange[9]
    },
    yellow: {
      lightest: scales.yellow[1],
      light: scales.yellow[4],
      base: scales.yellow[8],
      dark: scales.yellow[9]
    },
    green: {
      lightest: scales.green[1],
      light: scales.green[5],
      base: scales.green[8],
      dark: scales.green[9]
    },
    teal: {
      lightest: scales.teal[1],
      light: scales.teal[4],
      base: scales.teal[8],
      dark: scales.teal[9]
    },
    violet: {
      lightest: scales.violet[1],
      light: scales.violet[4],
      base: scales.violet[8],
      dark: scales.violet[9]
    }
  };
}

function generateLightMode(scales: ScalesType, palette: PaletteType) {
  return {
    background: {
      tint1: scales.gray[1],
      tint2: scales.gray[3],
      overlay: alpha(scales.gray[9], 0.6),
      default: "white"
    },
    border: {
      default: scales.gray[3],
      muted: scales.gray[2]
    },
    text: {
      muted: color(scales.gray[7])
        .lighten(0.3)
        .hex()
        .toString(),
      default: scales.gray[9],
      selected: palette.blue.base
    },
    shadows: createShadows(scales.gray[8])
  };
}

function generateDarkMode(scales: ScalesType, palette: PaletteType) {
  return {
    background: {
      tint1: scales.gray[7],
      tint2: scales.gray[6],
      overlay: alpha(scales.gray[9], 0.6),
      default: scales.gray[8]
    },
    border: {
      default: scales.gray[6],
      muted: scales.gray[7]
    },
    text: {
      muted: "rgba(255,255,255,0.7)",
      default: "white",
      selected: palette.blue.base
    },
    shadows: createDarkShadows("black")
  };
}

function generateIntents(palette: PaletteType) {
  return {
    none: palette.gray,
    primary: palette.blue,
    success: palette.green,
    danger: palette.red,
    warning: palette.yellow
  };
}

export function createColorsFromScales(
  scales: ScalesType,
  createIntents = generateIntents,
  createPalette = generatePalette
) {
  const palette = createPalette(scales);
  const intent = createIntents(palette);

  const modes = {
    light: {
      mode: "light",
      ...generateLightMode(scales, palette),
      palette,
      scales,
      intent
    },
    dark: {
      mode: "dark",
      ...generateDarkMode(scales, palette),
      palette,
      scales,
      intent
    }
  };

  return {
    colors: modes.light, // default to light mode
    modes
  };
}

export const defaultColors = createColorsFromScales(defaultScales);
