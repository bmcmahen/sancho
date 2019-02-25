/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";

const styles = {
  button: css({
    position: "relative",
    WebkitTapHighlightColor: "transparent",
    backgroundColor: "transparent",
    outline: "none",
    border: 0,
    margin: 0,

    borderRadius: 0,
    padding: 0,
    cursor: "pointer",
    userSelect: "none",
    verticalAlign: "middle",
    "-moz-appearance": "none",
    "-webkit-appearance": "none",
    "&::-moz-focus-inner": {
      borderStyle: "none"
    }
  })
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  button?: boolean;
  component?: React.ReactType<LinkProps>;
}

export function Link({
  children,
  component: Component = "a",
  button,
  ...other
}: LinkProps) {
  return (
    <Component
      css={[
        {
          textDecoration: "none",
          color: theme.colors.palette.blue.dark
        },
        Component === "button" && styles.button
      ]}
      {...other}
    >
      {children}
    </Component>
  );
}
