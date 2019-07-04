import * as React from "react";
import defaultTheme, { Theme, ThemeColors } from ".";

/**
 * API:
 *
 * You can create custom themes using Object.assign:
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

export interface ColorModeProps {
  colors: ThemeColors;
  children: RenderCallbackType | React.ReactNode;
  ref: React.Ref<any>;
}

const ColorMode: React.RefForwardingComponent<
  React.Ref<any>,
  ColorModeProps
> = React.forwardRef(({ colors, children, ...other }: ColorModeProps, ref) => {
  const theme = useTheme();
  // memo is necessary to prevent unnecessary rerenders
  // https://reactjs.org/docs/context.html#caveats
  const adjustedTheme = React.useMemo(() => mergeColors(theme, colors), [
    theme,
    colors
  ]);

  return (
    <ThemeContext.Provider value={adjustedTheme}>
      {typeof children === "function"
        ? children(adjustedTheme)
        : React.cloneElement(
            React.Children.only(children) as React.ReactElement<any>,
            {
              ref,
              ...other
            }
          )}
    </ThemeContext.Provider>
  );
});

ColorMode.displayName = "ColorMode";

function mergeColors(theme: Theme, colors: ThemeColors) {
  return {
    ...theme,
    shadows: colors.shadows,
    colors
  };
}

/**
 * Provide a light theme
 */

interface ModeProps {
  children: RenderCallbackType | React.ReactNode;
  ref?: any;
}

export const LightMode: React.RefForwardingComponent<
  React.Ref<any>,
  ModeProps
> = React.forwardRef(({ children, ...other }: ModeProps, ref) => {
  const theme = useTheme();
  return (
    <ColorMode colors={theme.modes.light} ref={ref} {...other}>
      {children}
    </ColorMode>
  );
});

LightMode.displayName = "LightMode";

/**
 * Provide a dark theme
 */

export const DarkMode: React.RefForwardingComponent<
  React.Ref<any>,
  ModeProps
> = React.forwardRef(({ children, ...other }: ModeProps, ref) => {
  const theme = useTheme();
  return (
    <ColorMode colors={theme.modes.dark} ref={ref} {...other}>
      {children}
    </ColorMode>
  );
});

DarkMode.displayName = "DarkMode";
