/** @jsx jsx */
import { jsx, css, SerializedStyles } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";

type Positions = "fixed" | "static";

interface NavbarProps {
  children: React.ReactNode;
  position?: Positions;
}

const styles: { [key in Positions]: SerializedStyles } = {
  fixed: css({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%"
  }),
  static: css({
    position: "static",
    boxShadow: "none"
  })
};

export function Navbar({
  position = "fixed",
  children,
  ...other
}: NavbarProps) {
  return (
    <nav
      css={[
        {
          background: "white",
          zIndex: 20,
          boxShadow: theme.shadows.sm
        },
        styles[position]
      ]}
      {...other}
    >
      {children}
    </nav>
  );
}
