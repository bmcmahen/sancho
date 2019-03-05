import open from "open-color";
import color from "color";

export function alpha(c: string, amount: number) {
  return color(c)
    .alpha(amount)
    .hsl()
    .string();
}

export const scales = open;

export const palette = {
  gray: {
    lightest: scales.gray[1],
    light: scales.gray[4],
    base: scales.gray[8],
    dark: scales.gray[9]
  },
  blue: {
    lightest: scales.blue[1],
    light: scales.blue[4],
    base: scales.blue[8],
    dark: scales.blue[9]
  },
  red: {
    lightest: scales.red[1],
    light: scales.red[4],
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
    light: scales.green[4],
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

export default {
  background: {
    tint1: scales.gray[1],
    tint2: scales.gray[2],
    overlay: alpha(scales.gray[9], 0.6)
  },
  border: {
    default: scales.gray[2],
    muted: scales.gray[1]
  },
  text: {
    muted: scales.gray[7],
    default: scales.gray[9],
    dark: scales.gray[10],
    selected: palette.blue.base
  },
  intent: {
    none: palette.gray,
    primary: palette.blue,
    success: palette.green,
    danger: palette.red,
    warning: palette.yellow
  }
};
