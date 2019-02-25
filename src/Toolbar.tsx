/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";

interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  compressed?: boolean;
}

export function Toolbar({ compressed, ...other }: ToolbarProps) {
  return (
    <div
      css={[
        {
          minHeight: "56px",
          display: "flex",
          position: "relative",
          alignItems: "center",
          paddingLeft: theme.spaces.md,
          paddingRight: theme.spaces.md,
          [theme.breakpoints.md]: {
            minHeight: "64px",
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
