/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import PropTypes from "prop-types";

/**
 * A Toolbar is typically used in something like the Navbar component.
 * It provides some basic horizontal padding and maintains responsive height.
 */

interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  compressed?: boolean;
}

const MOBILE_HEIGHT = "56px";
const DESKTOP_HEIGHT = "64px";

export const Toolbar: React.FunctionComponent<ToolbarProps> = ({
  compressed,
  ...other
}) => {
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
};

Toolbar.propTypes = {
  /** Reduce the height of the toolbar */
  compressed: PropTypes.bool,

  children: PropTypes.node
};

export const responsiveBodyPadding = css({
  paddingTop: MOBILE_HEIGHT,
  [theme.breakpoints.md]: {
    paddingTop: DESKTOP_HEIGHT
  }
});
