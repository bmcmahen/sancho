/** @jsx jsx */
import { jsx, css, SerializedStyles } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";

export const variants = {
  srOnly: css({
    position: "absolute",
    height: 1,
    width: 1,
    overflow: "hidden"
  }),
  body1: css({
    fontSize: theme.sizes[1]
  }),
  body2: css({
    fontSize: theme.sizes[0]
  }),
  subtitle1: css({
    fontSize: theme.sizes[1],
    fontWeight: 400,
    lineHeight: 1.75
  }),
  subtitle2: css({
    fontWeight: 500,
    fontSize: theme.sizes[0],
    lineHeight: 1.5
  }),
  h6: css({
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: theme.sizes[1]
  }),
  h5: css({
    fontWeight: 400,
    fontSize: theme.sizes[2]
  }),
  h4: css({
    fontWeight: 400,
    fontSize: theme.sizes[3]
  }),
  h3: css({
    fontWeight: 500,
    fontSize: theme.sizes[4]
  }),
  h2: css({
    fontWeight: 400,
    fontSize: theme.sizes[5]
  }),
  h1: css({
    fontWeight: 500,
    fontSize: theme.sizes[6]
  }),
  lead: css({
    fontWeight: 300,
    fontSize: theme.sizes[2]
  }),
  display3: css({
    fontWeight: 300,
    fontSize: theme.sizes[5],
    lineHeight: 1.2,
    [theme.breakpoints.md]: {
      fontSize: theme.sizes[6]
    }
  }),
  display2: css({
    fontWeight: 300,
    fontSize: theme.sizes[6],
    lineHeight: 1.2,
    [theme.breakpoints.md]: {
      fontSize: theme.sizes[7]
    }
  }),
  display1: css({
    fontWeight: 300,
    fontSize: theme.sizes[7],
    lineHeight: 1.2,
    [theme.breakpoints.md]: {
      fontSize: theme.sizes[8]
    }
  })
};

export type TextVariants = keyof typeof variants;

const element: { [key in TextVariants]: string } = {
  display1: "h1",
  display2: "h1",
  display3: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "span",
  body2: "span",
  srOnly: "span",
  lead: "p"
};

const styles: { [key: string]: SerializedStyles } = {
  base: css({
    boxSizing: "border-box",
    margin: 0,
    lineHeight: theme.lineHeight,
    fontFamily: theme.fonts.base,
    fontSize: theme.sizes[1],
    color: theme.colors.text.default,
    fontWeight: 400,
    "-webkit-font-smoothing": "antialiased"
  }),
  noWrap: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  })
};

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariants;
  noWrap?: boolean;

  component?: React.ReactType<TextProps>;
}

export function Text({
  variant = "body1",
  noWrap,
  component,
  css,
  ...other
}: TextProps) {
  const Component = component || element[variant];
  return (
    <Component
      css={[styles.base, noWrap && styles.noWrap, variants[variant]]}
      {...other}
    />
  );
}
