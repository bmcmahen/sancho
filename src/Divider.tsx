/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "./Theme/Providers";

export interface DividerProps {
  /** Use a muted border */
  muted?: boolean;
  children?: never;
}

export const Divider: React.FunctionComponent<DividerProps> = ({
  muted,
  ...other
}) => {
  const theme = useTheme();
  return (
    <div
      className="Divider"
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
};

Divider.propTypes = {
  muted: PropTypes.bool
};
