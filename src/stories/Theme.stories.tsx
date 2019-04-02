/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { useTheme, Dark, Light } from "../Theme/Providers";
import { Theme } from "../Theme";

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
      <Dark>
        <Example>
          <div>
            <Light>
              {(theme: Theme) => (
                <div
                  css={{
                    background: theme.colors.background.default,
                    color: theme.colors.text.default
                  }}
                >
                  Using render callback, light mode
                </div>
              )}
            </Light>
            This will be in dark mode
            <Light>
              <Example>
                <div>But this will be in light mode!</div>
              </Example>
            </Light>
          </div>
        </Example>
      </Dark>
    </div>
  );
}

export const ThemeExamples = storiesOf("Theme", module).add(
  "Basic usage",
  () => <Basic />
);
