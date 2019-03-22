/** @jsx jsx */
import { jsx, css, SerializedStyles } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import PropTypes from "prop-types";

export const variants = {
  uppercase: css({
    textTransform: "uppercase",
    fontSize: theme.sizes[0],
    fontWeight: 600,
    color: theme.colors.text.muted,
    letterSpacing: "-0.02em"
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
    fontWeight: 500,
    fontSize: theme.sizes[2],
    lineHeight: 1.2,
    marginBottom: theme.spaces.sm
  }),
  h4: css({
    fontWeight: 500,
    fontSize: theme.sizes[3],
    lineHeight: 1.2,
    marginBottom: theme.spaces.sm,
    letterSpacing: "-0.2px"
  }),
  h3: css({
    fontWeight: 500,
    fontSize: theme.sizes[4],
    lineHeight: 1.2,
    marginBottom: theme.spaces.sm
  }),
  h2: css({
    fontWeight: 500,
    fontSize: theme.sizes[5],
    lineHeight: 1.2,
    marginBottom: theme.spaces.sm,
    letterSpacing: "-0.2px"
  }),
  h1: css({
    fontWeight: 500,
    fontSize: theme.sizes[6],
    lineHeight: 1.2,
    marginBottom: theme.spaces.sm,
    letterSpacing: "-0.2px"
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
    WebkitFontSmoothing: "antialiased"
  }),
  noGutter: css({
    marginBottom: 0
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

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** The text style */
  variant?: TextVariants;
  /** Use text-overflow: ellipsis styling when set to false */
  wrap?: boolean;
  /** Use muted colors */
  muted?: boolean;
  /** Set to false to remove any bottom margins */
  gutter?: boolean;
  component?: React.ReactType<TextProps>;
}

export const Text: React.FunctionComponent<TextProps> = ({
  variant = "body",
  wrap = true,
  gutter = true,
  muted,
  component,
  css,
  ...other
}) => {
  const Component = component || element[variant];
  return (
    <Component
      css={[
        styles.base,
        !wrap && styles.noWrap,
        muted && styles.muted,
        variants[variant],
        !gutter && styles.noGutter
      ]}
      {...other}
    />
  );
};

Text.propTypes = {
  variant: PropTypes.oneOf(Object.keys(variants)),
  wrap: PropTypes.bool,
  muted: PropTypes.bool,
  gutter: PropTypes.bool
};
