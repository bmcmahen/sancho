import { theme as defaultTheme, Theme } from ".";
export { generateColorsFromScales } from "./colors";
import merge from "deepmerge";

export type CustomThemeOptions = Partial<Theme>;

/**
 * Usage:
 *
 * const colors = generateColorsFromScales(myScales, {
 *  ...customGenerationFunctions
 * })
 *
 * const theme = createTheme({
 *  ...colors,
 *  fonts: {
 *    sans: 'Roboto',
 *    base: 'Roboto',
 *    monospace: 'monospace'
 *  }
 * })
 *
 */

export function createTheme(customThemeValues: CustomThemeOptions) {
  return merge(defaultTheme, customThemeValues);
}
