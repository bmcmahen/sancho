import { defaultColors } from "./colors";
import { createShadows } from "./shadows";
import { breakpoints } from "./breakpoints";

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
const sizes: [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
] = [
  // "0.7rem",
  "0.875rem",
  "1rem",
  "1.25rem",
  "1.5rem",
  "1.75rem",
  "2rem",
  "2.5rem",
  "3.5rem",
  "4.5rem",
  "5.5rem"
];

// radius (for layers, buttons, etc)
const radii = {
  sm: "0.25rem",
  md: "0.4rem",
  lg: "1rem"
};

// bootstrap z-index
const zIndex = {
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

export type ThemeColors = typeof defaultColors.colors;

export const theme = {
  ...defaultColors,
  spaces,
  zIndex,
  breakpoints,
  sizes,
  radii,
  fonts,
  shadows: createShadows(defaultColors.colors.scales),
  lineHeight: "1.5"
};

export type Theme = typeof theme;

export default theme;
