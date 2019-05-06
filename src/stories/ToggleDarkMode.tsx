/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import * as React from "react";
import { Button } from "../Button";
import theme from "../Theme";
import { DarkMode, LightMode } from "../Theme/Providers";
import { Toolbar } from "../Toolbar";

export interface ToggleDarkModeProps {
  children: React.ReactNode;
}

export const ToggleDarkMode: React.FunctionComponent<ToggleDarkModeProps> = ({
  children
}) => {
  const [mode, setMode] = React.useState("light");
  const Component = mode === "dark" ? DarkMode : LightMode;

  return (
    <Component>
      {theme => (
        <div>
          <Global
            styles={{
              body: {
                margin: 0,
                padding: 0,
                background: theme.colors.background.default
              }
            }}
          />
          <Toolbar
            css={{
              borderBottom: "1px solid",
              borderColor: theme.colors.border.default
            }}
          >
            <Button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
            >
              Toggle Mode
            </Button>
          </Toolbar>
          <div
            css={{
              background:
                mode === "dark"
                  ? theme.modes.dark.palette.gray.dark
                  : theme.modes.light.background.default
            }}
          >
            {children}
          </div>
        </div>
      )}
    </Component>
  );
};
