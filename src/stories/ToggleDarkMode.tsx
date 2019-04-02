/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Button } from "../Button";
import theme from "../Theme";
import { DarkMode, LightMode } from "../Theme/Providers";

export interface ToggleDarkModeProps {
  children: React.ReactNode;
}

export const ToggleDarkMode: React.FunctionComponent<ToggleDarkModeProps> = ({
  children
}) => {
  const [mode, setMode] = React.useState("light");
  const Component = mode === "dark" ? DarkMode : LightMode;

  return (
    <div
      css={{
        padding: "1rem"
      }}
    >
      <div
        css={{
          borderBottom: "1px solid",
          paddingBottom: "1rem"
        }}
      >
        <Button onClick={() => setMode(mode === "light" ? "dark" : "light")}>
          Toggle Mode
        </Button>
      </div>
      <div
        css={{
          paddingTop: "1rem",
          background:
            mode === "dark"
              ? theme.modes.dark.background.default
              : theme.modes.light.background.default
        }}
      >
        <Component>{children}</Component>
      </div>
    </div>
  );
};
