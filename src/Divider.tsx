/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import PropTypes from "prop-types";

export interface DividerProps {
  muted?: boolean;
  children?: never;
}

export const Divider: React.FunctionComponent<DividerProps> = ({
  muted,
  ...other
}) => {
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
};

Divider.propTypes = {
  /** Use a muted border */
  muted: PropTypes.bool
};
