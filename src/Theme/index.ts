import colors, { palette, scales } from "./colors";
import color from "color";

const spacer = 1;

const spaces = {
  none: 0,
  xs: `${spacer * 0.25}rem`,
  sm: `${spacer * 0.5}rem`,
  md: `${spacer}rem`,
  lg: `${spacer * 1.5}rem`,
  xl: `${spacer * 3}rem`
};

const breakpoints = {
  sm: "@media (min-width: 567px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 992px)",
  xl: "@media (min-width: 1200px)"
};

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

const radii = {
  sm: "0.25rem",
  md: "0.4rem",
  lg: "1rem"
};

const sansFont = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

const fonts = {
  sans: sansFont,
  base: sansFont,
  monospace: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
};

const shadows = {
  xs: `0 0 1px ${color(scales.neutral.N8)
    .alpha(0.3)
    .hsl()
    .string()},
    0 0 1px 1px ${color(scales.neutral.N8)
      .alpha(0.12)
      .hsl()
      .string()}
  `,
  sm: `0 1px 2px 0 ${color(scales.neutral.N8)
    .alpha(0.3)
    .hsl()
    .string()}, 0 1px 3px 1px ${color(scales.neutral.N8)
    .alpha(0.15)
    .hsl()
    .string()}`,

  md: `0 .5rem 1rem ${color(scales.neutral.N10)
    .alpha(0.25)
    .hsl()
    .string()}`,
  lg: `0 1rem 3rem ${color(scales.neutral.N10)
    .alpha(0.25)
    .hsl()
    .string()}`
};

const theme = {
  colors: {
    ...colors,
    palette,
    scales
  },
  spaces,
  breakpoints,
  sizes,
  radii,
  fonts,
  shadows,
  lineHeight: "1.5"
};

export default theme;
