/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import {
  useTheme,
  DarkMode,
  LightMode,
  ThemeProvider
} from "../Theme/Providers";
import defaultTheme, { Theme } from "../Theme";
import { Layer } from "../Layer";
import { Popover } from "../Popover";
import { MenuList, MenuDivider, MenuItem } from "../Menu";
import { Button, ButtonSize, ButtonVariant, ButtonIntent } from "../Button";
import { Text } from "../Text";
import palx from "palx";
import { Link } from "../Link";
import { generateColorsFromScales } from "../Theme/colors";

const customPalette = palx("#007bff");

const colors = generateColorsFromScales(customPalette, {
  // generateIntents
});

// function generateIntents(palette: PaletteType) {
//   return {
//     none: palette.gray,
//     primary: palette.teal,
//     success: palette.violet,
//     danger: palette.red,
//     warning: palette.yellow
//   };
// }

const custom = {
  ...defaultTheme,
  ...colors,
  fonts: {
    base: "helvetica",
    monospace: "monospace",
    sans: "helvetica"
  }
};

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
  ))
  .add("Custom theme", () => {
    const sizes: Array<ButtonSize> = ["xs", "sm", "md", "lg", "xl"];

    const appearance: Array<ButtonVariant> = ["default", "ghost", "outline"];
    const intents: Array<ButtonIntent> = [
      "none",
      "primary",
      "success",
      "danger",
      "warning"
    ];

    return (
      <div>
        {appearance.map(appearance => (
          <div key={appearance}>
            {sizes.map(size => (
              <div key={size} style={{ padding: "0.5rem" }}>
                {intents.map(intent => (
                  <Button
                    key={size + appearance}
                    size={size}
                    css={{
                      marginRight: "1rem",
                      textTransform: "capitalize"
                    }}
                    variant={appearance}
                    intent={intent}
                    onClick={() => alert("hello there")}
                  >
                    {intent}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        ))}
        <div
          css={{
            margin: "2rem",
            maxWidth: "38rem"
          }}
        >
          <Text variant="paragraph">
            Non proident est elit <Link href="#">aliqua reprehenderit</Link>. Eu
            amet nostrud qui ex velit mollit velit eiusmod consequat aliquip
            enim et mollit. Sint eiusmod mollit Lorem et eiusmod exercitation
            anim esse.
          </Text>
        </div>
      </div>
    );
  })
  .add("contrast", () => {
    return <ContrastExample />;
  });

function SampleTheme() {
  const theme = useTheme();
  return (
    <div
      css={{ background: theme.colors.palette.blue.base, padding: "3rem" }}
    />
  );
}

function ContrastExample() {
  const theme = useTheme();
  const dark = theme.colors.mode === "dark";

  return (
    <div css={{ display: "flex" }}>
      <div
        css={{
          height: "400px",
          flex: "1 1 30%",
          background: dark
            ? theme.colors.background.layer
            : theme.colors.background.tint1
        }}
      >
        <Text>Hello</Text>
      </div>
      <div css={{ flex: "1 1 70%" }}>Basic</div>
    </div>
  );
}
