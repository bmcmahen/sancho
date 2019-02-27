/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {}

export function Container(props: ContainerProps) {
  return (
    <div
      css={{
        width: "100%",
        maxWidth: "1200px",
        boxSizing: "border-box",
        margin: "0 auto",
        padding: `0 ${theme.spaces.sm}`,
        [theme.breakpoints.lg]: {
          padding: `0 ${theme.spaces.lg}`
        }
      }}
      {...props}
    />
  );
}
