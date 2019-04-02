import { theme as defaultTheme, Theme } from ".";
export { createColorsFromScales } from "./colors";
import merge from "deepmerge";

export type CustomThemeOptions = Partial<Theme>;

/**
 * Usage:
 * const colors = createColorsFromScales(myScales, customGenerateIntents)
 * const theme = createTheme({
 *  ...colors,
 *  fonts: {
 *    sans: 'Roboto',
 *    base: '
 *  }
 *
 * })
 */

export function createTheme(customThemeValues: CustomThemeOptions) {
  return merge(defaultTheme, customThemeValues);
}
