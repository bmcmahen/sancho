/** @jsx jsx */
import { jsx, css, SerializedStyles } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";

export const variants = {
  uppercase: css({
    textTransform: "uppercase",
    fontSize: `calc(${theme.sizes[0]} - 0.1rem)`,
    fontWeight: 600,
    letterSpacing: "0.07em"
  }),
  hidden: css({
    position: "absolute",
    height: 1,
    width: 1,
    overflow: "hidden"
  }),
  body: css({
    fontSize: theme.sizes[1]
  }),
  paragraph: css({
    fontSize: theme.sizes[1],
    marginBottom: theme.spaces.md
  }),
  subtitle: css({
    fontSize: theme.sizes[0],
    fontWeight: 500,
    lineHeight: 1.5
  }),
  lead: css({
    fontWeight: 400,
    fontSize: theme.sizes[2]
  }),
  h6: css({
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: theme.sizes[1],
    marginBottom: theme.spaces.sm
  }),
  h5: css({
    fontWeight: 400,
    fontSize: theme.sizes[2],
    marginBottom: theme.spaces.sm
  }),
  h4: css({
    fontWeight: 400,
    fontSize: theme.sizes[3],
    marginBottom: theme.spaces.sm
  }),
  h3: css({
    fontWeight: 500,
    fontSize: theme.sizes[4],
    marginBottom: theme.spaces.sm
  }),
  h2: css({
    fontWeight: 400,
    fontSize: theme.sizes[5],
    marginBottom: theme.spaces.sm
  }),
  h1: css({
    fontWeight: 500,
    fontSize: theme.sizes[6],
    marginBottom: theme.spaces.sm
  }),

  display3: css({
    fontWeight: 300,
    fontSize: theme.sizes[5],
    lineHeight: 1.2,
    marginBottom: theme.spaces.sm,
    [theme.breakpoints.md]: {
      fontSize: theme.sizes[6]
    }
  }),
  display2: css({
    fontWeight: 300,
    fontSize: theme.sizes[6],
    lineHeight: 1.2,
    marginBottom: theme.spaces.sm,
    [theme.breakpoints.md]: {
      fontSize: theme.sizes[7]
    }
  }),
  display1: css({
    fontWeight: 300,
    fontSize: theme.sizes[7],
    lineHeight: 1.2,
    marginBottom: theme.spaces.sm,
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
  uppercase: "div",
  subtitle: "div",
  body: "span",
  paragraph: "p",
  hidden: "span",
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
  }),
  muted: css({
    color: theme.colors.text.muted
  })
};

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariants;
  noWrap?: boolean;
  muted?: boolean;
  component?: React.ReactType<TextProps>;
}

export function Text({
  variant = "body",
  noWrap,
  muted,
  component,
  css,
  ...other
}: TextProps) {
  const Component = component || element[variant];
  return (
    <Component
      css={[
        styles.base,
        noWrap && styles.noWrap,
        muted && styles.muted,
        variants[variant]
      ]}
      {...other}
    />
  );
}
