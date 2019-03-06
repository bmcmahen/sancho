/** @jsx jsx */
import { jsx, css, SerializedStyles } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import PropTypes from "prop-types";

type Positions = "fixed" | "static";

export interface NavbarProps {
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

export const Navbar: React.FunctionComponent<NavbarProps> = ({
  position = "fixed",
  children,
  ...other
}) => {
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
};

Navbar.propTypes = {
  /** The position of the navbar. */
  position: PropTypes.oneOf(["fixed", "static"] as Positions[])
};
