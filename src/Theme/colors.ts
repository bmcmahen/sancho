import open from "open-color";
import color from "color";
import { createShadows, createDarkShadows } from "./shadows";

export function lighten(c: string, amount: number) {
  return color(c)
    .lighten(amount)
    .hsl()
    .string();
}

export function alpha(c: string, amount: number) {
  return color(c)
    .alpha(amount)
    .hsl()
    .string();
}

/**
 * normalize open-color to remove some colours,
 * such as 'grape'. This should be compatible with a tool
 * like palx.
 */

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

/**
 * Generate a palette from scales.
 *
 * `light` is typically used in dark mode for things like
 *  outline buttons, ghost buttons, etc.
 *
 * `base` is typically used for buttons, avatar colors, etc.
 *
 * @param scales
 */

function defaultGeneratePalette(scales: ScalesType): PaletteType {
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

/**
 * Generate lightmode colors
 * @param scales
 * @param palette
 */

function defaultGenerateLightMode(scales: ScalesType, palette: PaletteType) {
  return {
    background: {
      tint1: scales.gray[1],
      tint2: scales.gray[3],
      overlay: alpha(scales.gray[9], 0.6),
      layer: "white",
      default: "white"
    },
    border: {
      default: alpha(scales.gray[9], 0.12),
      muted: alpha(scales.gray[9], 0.08)
    },
    text: {
      heading: scales.gray[9],
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

/**
 * Generate dark mode colors
 * @param scales
 * @param palette
 */

function defaultGenerateDarkMode(scales: ScalesType, palette: PaletteType) {
  const base = scales.gray[9];

  return {
    background: {
      tint1: lighten(base, 0.5),
      tint2: lighten(base, 0.7),
      overlay: alpha(scales.gray[7], 0.8),
      layer: lighten(base, 0.2),
      default: base
    },
    border: {
      default: alpha(scales.gray[0], 0.13),
      muted: alpha(scales.gray[0], 0.08)
    },
    text: {
      heading: "white",
      muted: "rgba(255,255,255,0.7)",
      default: "rgba(255,255,255,0.88)",
      selected: palette.blue.base
    },
    shadows: createDarkShadows("black")
  };
}
/**
 * Intents map a color palette to a particular intent (ie, primary, success)
 * @param palette
 */

function defaultGenerateIntents(palette: PaletteType) {
  return {
    none: palette.gray,
    primary: palette.blue,
    success: palette.green,
    danger: palette.red,
    warning: palette.yellow
  };
}

/**
 * You can override the default generators by
 * providing them as a second argument. This is useful for
 * providing custom intents (primary === teal, maybe)
 */

interface Builders {
  generateIntents?: typeof defaultGenerateIntents;
  generatePalette?: typeof defaultGeneratePalette;
  generateLightMode?: typeof defaultGenerateLightMode;
  generateDarkMode?: typeof defaultGenerateDarkMode;
}

export function generateColorsFromScales(
  scales: ScalesType,
  generators: Builders = {}
) {
  const {
    generateIntents,
    generatePalette,
    generateLightMode,
    generateDarkMode
  } = {
    generateIntents: defaultGenerateIntents,
    generatePalette: defaultGeneratePalette,
    generateLightMode: defaultGenerateLightMode,
    generateDarkMode: defaultGenerateDarkMode,
    ...generators
  };

  const palette = generatePalette(scales);
  const intent = generateIntents(palette);

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

export const defaultColors = generateColorsFromScales(defaultScales);
