/** @jsx jsx */
import { jsx, css, SerializedStyles } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import PropTypes from "prop-types";

type Positions = "fixed" | "static" | "absolute" | "sticky";

export interface NavbarProps {
  children: React.ReactNode;
  /** The position of the navbar. */
  position?: Positions;
}

const styles: { [key in Positions]: SerializedStyles } = {
  fixed: css({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: theme.zIndex.fixed
  }),
  static: css({
    position: "static",
    boxShadow: "none"
  }),
  absolute: css({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%"
  }),
  sticky: css({
    position: "sticky",
    top: 0,
    zIndex: theme.zIndex.sticky
  })
};

/**
 * A Navbar is used to provide app based navigation. Typically
 * used in combination with a Toolbar.
 */

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
          zIndex: position === "fixed" ? theme.zIndex.fixed : undefined,
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
  position: PropTypes.oneOf(["fixed", "static"] as Positions[])
};
