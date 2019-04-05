/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Theme } from "./Theme";
import PropTypes from "prop-types";
import { useTheme } from "./Theme/Providers";

type Positions = "fixed" | "static" | "absolute" | "sticky";

export interface NavbarProps {
  children: React.ReactNode;
  /** The position of the navbar. */
  position?: Positions;
}

const getStyles = (theme: Theme) => ({
  fixed: css({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: theme.zIndices.fixed
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
    zIndex: theme.zIndices.sticky
  })
});

/**
 * A Navbar is used to provide app based navigation. Typically
 * used in combination with a Toolbar.
 */

export const Navbar: React.FunctionComponent<NavbarProps> = ({
  position = "fixed",
  children,
  ...other
}) => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  return (
    <nav
      css={[
        {
          background: theme.colors.background.default,
          zIndex: position === "fixed" ? theme.zIndices.fixed : undefined,
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
