/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import theme from "./Theme";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function Badge({ children, ...other }: BadgeProps) {
  return (
    <Text
      variant="subtitle2"
      component="span"
      css={{
        color: "white",
        fontSize: "small",
        fontWeight: 500,
        display: "inline-block",
        borderRadius: "32px",
        minWidth: "22px",
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
}
