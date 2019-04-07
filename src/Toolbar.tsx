/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "./Theme/Providers";

/**
 * A Toolbar is typically used in something like the Navbar component.
 * It provides some basic horizontal padding and maintains responsive height.
 */

interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Reduce the height of the toolbar */
  compressed?: boolean;
}

const MOBILE_HEIGHT = "56px";
const DESKTOP_HEIGHT = "64px";

export const Toolbar: React.FunctionComponent<ToolbarProps> = ({
  compressed,
  ...other
}) => {
  const theme = useTheme();
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
          [theme.mediaQueries.md]: {
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
  compressed: PropTypes.bool,
  children: PropTypes.node
};

export const useResponsiveBodyPadding = () => {
  const theme = useTheme();
  return css({
    paddingTop: MOBILE_HEIGHT,
    [theme.mediaQueries.md]: {
      paddingTop: DESKTOP_HEIGHT
    }
  });
};
