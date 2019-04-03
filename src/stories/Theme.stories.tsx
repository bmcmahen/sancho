/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import {
  useTheme,
  DarkMode,
  LightMode,
  ThemeProvider
} from "../Theme/Providers";
import { Theme } from "../Theme";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { Layer } from "../Layer";
import { Popover } from "../Popover";
import { MenuList, MenuDivider, MenuItem } from "../Menu";
import { Button } from "../Button";
import { Text } from "../Text";
import { createTheme, generateColorsFromScales } from "../Theme/createTheme";
import palx from "palx";
import { PaletteType } from "../Theme/colors";

const customPalette = palx("#a2005e");

const colors = generateColorsFromScales(customPalette, {
  generateIntents
});

function generateIntents(palette: PaletteType) {
  return {
    none: palette.gray,
    primary: palette.teal,
    success: palette.violet,
    danger: palette.red,
    warning: palette.yellow
  };
}

const custom = createTheme({
  ...colors,
  fonts: {
    base: "helvetica",
    monospace: "monospace",
    sans: "helvetica"
  }
});

function Example({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <div
      css={{
        background: theme.colors.background.default
      }}
    >
      <span
        css={{
          color: theme.colors.text.default
        }}
      >
        {children}
      </span>
    </div>
  );
}

function Basic() {
  const theme = useTheme();
  return (
    <div>
      <span
        css={{
          color: theme.colors.text.selected
        }}
      >
        Hello world, this is the default theme. You can compose modes:
      </span>
      <DarkMode>
        <div css={{ border: "1px solid", padding: "1rem" }}>
          <Example>
            <div>
              <LightMode>
                {(theme: Theme) => (
                  <div
                    css={{
                      background: theme.colors.background.default,
                      color: theme.colors.text.default
                    }}
                  >
                    Using render callback, LightMode mode
                  </div>
                )}
              </LightMode>
              This will be in DarkMode mode
              <LightMode>
                <Example>
                  <div>But this will be in LightMode mode!</div>
                </Example>
              </LightMode>
            </div>
          </Example>
        </div>
      </DarkMode>
    </div>
  );
}

export const ThemeExamples = storiesOf("Theme", module)
  .add("Basic usage", () => <Basic />)
  .add("playground", () => (
    <ToggleDarkMode>
      <div css={{ padding: "2rem" }}>
        <Layer css={{ padding: "2rem" }}>
          <Popover
            content={
              <MenuList>
                <MenuItem onSelect={() => alert("Hello 1")}>
                  I will trigger an alert
                </MenuItem>
                <MenuItem component="a" href="/bacon">
                  I'm a link
                </MenuItem>

                <MenuDivider />
                <MenuItem>Item three</MenuItem>
              </MenuList>
            }
          >
            <Button>I should trigger popover</Button>
          </Popover>
        </Layer>
      </div>
    </ToggleDarkMode>
  ))
  .add("Custom theme", () => {
    return (
      <ThemeProvider theme={custom}>
        <ToggleDarkMode>
          <Button intent="primary">Hello</Button>
          <Text>Yeah, I should use Helvetica</Text>
          <SampleTheme />
        </ToggleDarkMode>
      </ThemeProvider>
    );
  });

function SampleTheme() {
  const theme = useTheme();
  return (
    <div
      css={{ background: theme.colors.palette.blue.base, padding: "3rem" }}
    />
  );
}
