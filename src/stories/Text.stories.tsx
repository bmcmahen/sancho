/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { useTheme, DarkMode, LightMode } from "../Theme/Providers";
import { Theme } from "../Theme";
import { Text } from "../Text";
import { useState, useEffect } from "react";

function Basic() {
  const theme = useTheme();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);
    return () => clearTimeout(interval);
  }, [timer]);
  return (
    <DarkMode>
      <div css={{ background: "black", border: "1px solid", padding: "1rem" }}>
        <Text variant="h1">H1 {timer}</Text>
        <LightMode>
          <Text css={{ background: "white" }} variant="h1">
            H1 2
          </Text>
        </LightMode>
      </div>
    </DarkMode>
  );
}

export const ThemeExamples = storiesOf("Text", module).add(
  "Basic usage",
  () => <Basic />
);
