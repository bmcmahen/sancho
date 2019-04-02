/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { useTheme } from "../Theme/Providers";

function Basic() {
  const theme = useTheme();
  return (
    <div>
      <span
        css={{
          color: theme.colors.text.selected
        }}
      >
        Hello world
      </span>
    </div>
  );
}

export const ThemeExamples = storiesOf("Theme", module).add(
  "Basic usage",
  () => <Basic />
);
