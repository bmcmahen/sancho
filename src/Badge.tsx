/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import theme from "./Theme";
import PropTypes from "prop-types";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * Use a badge to indicate a count in a menu, such as unread messages.
 */
export const Badge: React.FunctionComponent<BadgeProps> = ({
  children,
  ...other
}) => {
  return (
    <Text
      variant="body"
      component="span"
      css={{
        color: "white",
        fontSize: `calc(${theme.sizes[0]} - 0.15rem)`,
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
