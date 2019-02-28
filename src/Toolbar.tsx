/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";

interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  compressed?: boolean;
}

const MOBILE_HEIGHT = "56px";
const DESKTOP_HEIGHT = "64px";

export function Toolbar({ compressed, ...other }: ToolbarProps) {
  return (
    <div
      css={[
        {
          minHeight: MOBILE_HEIGHT,
          display: "flex",
          position: "relative",
          alignItems: "center",
          paddingLeft: theme.spaces.md,
          paddingRight: theme.spaces.md,
          [theme.breakpoints.md]: {
            minHeight: DESKTOP_HEIGHT,
            paddingLeft: theme.spaces.lg,
            paddingRight: theme.spaces.lg
          }
        },
        compressed ? { minHeight: "48px !important" } : undefined
      ]}
      {...other}
    />
  );
}

export const responsiveBodyPadding = css({
  paddingTop: MOBILE_HEIGHT,
  [theme.breakpoints.md]: {
    paddingTop: DESKTOP_HEIGHT
  }
});
