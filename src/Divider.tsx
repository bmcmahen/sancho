/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";

export interface DividerProps {
  muted: boolean;
  children: never;
}

export function Divider({ muted, ...other }: DividerProps) {
  return (
    <div
      css={{
        borderTopColor: muted
          ? theme.colors.border.muted
          : theme.colors.border.default,
        display: "block",
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        margin: `${theme.spaces.md} 0`
      }}
      {...other}
    />
  );
}
