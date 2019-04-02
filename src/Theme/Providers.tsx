import * as React from "react";
import defaultTheme, { Theme, ThemeColors } from ".";

/**
 * API:
 *
 * You can create custom themes using the createTheme function:
 *
 * const customTheme = createTheme({})
 *
 *
 * Pass that theme to the theme provider. A theme should always
 * provide a dark and light color mode.
 *
 * <ThemeProvider theme={customTheme}><App /></ThemeProvider>
 *
 *
 * When you want to use a dark mode:
 *
 * function App () {
 *  return <Dark><SomeContent /></Dark>
 * }
 *
 *
 * To consume a theme, use `useTheme` hook
 *
 * const theme = useTheme()
 * // theme.colors.text.default (will be dark or light depending on the mode)
 * // theme.colors.mode === 'dark' or 'light'
 */

const ThemeContext = React.createContext(defaultTheme);

/**
 * Provide a theme to your app using React Context
 */

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: Theme;
}

export const ThemeProvider = ({
  theme = defaultTheme,
  children
}: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

/**
 * A hook for consuming the theme
 */

export function useTheme() {
  return React.useContext(ThemeContext);
}

/**
 * Switch color modes (typically between light (default) and dark)
 */

type RenderCallbackType = (theme: Theme) => React.ReactNode;

export interface ColorMode {
  colors: ThemeColors;
  children: RenderCallbackType | React.ReactNode;
}

const ColorMode = ({ colors, children }: ColorMode) => {
  const theme = useTheme();
  const adjustedTheme = React.useMemo(() => mergeColors(theme, colors), [
    theme,
    colors
  ]);

  return (
    <ThemeContext.Provider value={adjustedTheme}>
      {typeof children === "function" ? children(adjustedTheme) : children}
    </ThemeContext.Provider>
  );
};

function mergeColors(theme: Theme, colors: ThemeColors) {
  return {
    ...theme,
    colors
  };
}

/**
 * Provide a light theme
 */

interface ModeProps {
  children: React.ReactNode;
}

export const Light = ({ children }: ModeProps) => {
  const theme = useTheme();
  return <ColorMode colors={theme.modes.light}>{children}</ColorMode>;
};

/**
 * Provide a dark theme
 */

export const Dark = ({ children }: ModeProps) => {
  const theme = useTheme();
  return <ColorMode colors={theme.modes.dark}>{children}</ColorMode>;
};
