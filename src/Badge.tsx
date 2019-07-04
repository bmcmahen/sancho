/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import PropTypes from "prop-types";
import { useTheme } from "./Theme/Providers";

/**
 * Use a badge to indicate a count in a menu, such as unread messages.
 */
export const Badge: React.FunctionComponent<
  React.HTMLAttributes<HTMLSpanElement>
> = ({ children, ...other }) => {
  const theme = useTheme();
  return (
    <Text
      variant="body"
      component="span"
      css={{
        color: "white",
        fontSize: `calc(${theme.fontSizes[0]} - 0.15rem)`,
        fontWeight: "bold",
        display: "inline-block",
        borderRadius: "32px",
        minWidth: "19px",
        textAlign: "center",
        textTransform: "uppercase",
        padding: `1px 6px`,
        background: theme.colors.palette.blue.base
      }}
      {...other}
    >
      {children}
    </Text>
  );
};

Badge.propTypes = {
  children: PropTypes.node
};
