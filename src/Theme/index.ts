import { defaultColors, alpha } from "./colors";
import { breakpoints, generateMediaQueries } from "./breakpoints";
export { generateColorsFromScales } from "./colors";

const spacer = 1;

// padding & margin
const spaces = {
  none: 0,
  xs: `${spacer * 0.25}rem`,
  sm: `${spacer * 0.5}rem`,
  md: `${spacer}rem`,
  lg: `${spacer * 1.5}rem`,
  xl: `${spacer * 3}rem`
};

// font sizes
const fontSizes = {
  0: "0.875rem",
  1: "1rem",
  2: "1.25rem",
  3: "1.5rem",
  4: "1.75rem",
  5: "2rem",
  6: "2.5rem",
  7: "3.5rem",
  8: "4.5rem",
  9: "5.5rem"
};

// radius (for layers, buttons, etc)
const radii = {
  sm: "0.25rem",
  md: "0.4rem",
  lg: "1rem"
};

// bootstrap z-index
const zIndices = {
  sticky: 1020,
  fixed: 1030,
  overlay: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070
};

const sansFont = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

const fonts = {
  sans: sansFont,
  base: sansFont,
  monospace: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
};

const lineHeights = {
  heading: 1.2,
  body: 1.5
};

const fontWeights = {
  body: 400,
  heading: 500,
  display: 300
};

const iconSizes = {
  xs: "12px",
  sm: "16px",
  md: "20px",
  lg: "24px",
  xl: "32px"
};

export type ThemeColors = typeof defaultColors.colors;

export const defaultTheme = {
  ...defaultColors,
  spaces,
  zIndices,
  breakpoints,
  mediaQueries: generateMediaQueries(breakpoints),
  fontSizes,
  radii,
  fonts,
  shadows: defaultColors.modes.light.shadows,
  lineHeights,
  fontWeights,
  iconSizes,
  outline: `3px auto ${alpha(defaultColors.colors.palette.blue.base, 0.8)}`
};

export type Theme = typeof defaultTheme;

export default defaultTheme;
