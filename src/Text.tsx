/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Theme } from "./Theme";
import PropTypes from "prop-types";
import { useTheme } from "./Theme/Providers";

export const getVariantStyles = (theme: Theme, variant: TextVariants) => {
  switch (variant) {
    case "uppercase":
      return css({
        textTransform: "uppercase",
        fontSize: theme.fontSizes[0],
        fontWeight: 600,
        color: theme.colors.text.muted,
        letterSpacing: "-0.02em"
      });
    case "body":
      return css({
        fontSize: theme.fontSizes[1]
      });
    case "paragraph":
      return css({
        fontSize: theme.fontSizes[1],
        marginBottom: theme.spaces.md
      });
    case "subtitle":
      return css({
        fontSize: theme.fontSizes[0],
        fontWeight: 400,
        color: theme.colors.text.muted,
        lineHeight: theme.lineHeights.body
      });
    case "lead":
      return css({
        fontWeight: 400,
        fontSize: theme.fontSizes[2]
      });
    case "h6":
      return css({
        color: theme.colors.text.heading,
        fontWeight: theme.fontWeights.heading,
        lineHeight: 1.5,
        fontSize: theme.fontSizes[1],
        marginBottom: theme.spaces.sm
      });
    case "h5":
      return css({
        color: theme.colors.text.heading,
        fontWeight: theme.fontWeights.heading,
        fontSize: theme.fontSizes[2],
        lineHeight: theme.lineHeights.heading,
        marginBottom: theme.spaces.sm
      });
    case "h4":
      return css({
        color: theme.colors.text.heading,
        fontWeight: theme.fontWeights.heading,
        fontSize: theme.fontSizes[3],
        lineHeight: theme.lineHeights.heading,
        marginBottom: theme.spaces.sm,
        letterSpacing: "-0.2px"
      });
    case "h3":
      return css({
        color: theme.colors.text.heading,
        fontWeight: theme.fontWeights.heading,
        fontSize: theme.fontSizes[4],
        lineHeight: theme.lineHeights.heading,
        marginBottom: theme.spaces.sm
      });
    case "h2":
      return css({
        color: theme.colors.text.heading,
        fontWeight: theme.fontWeights.heading,
        fontSize: theme.fontSizes[5],
        lineHeight: theme.lineHeights.heading,
        marginBottom: theme.spaces.sm,
        letterSpacing: "-0.2px"
      });
    case "h1":
      return css({
        color: theme.colors.text.heading,
        fontWeight: theme.fontWeights.heading,
        fontSize: theme.fontSizes[6],
        lineHeight: theme.lineHeights.heading,
        marginBottom: theme.spaces.sm,
        letterSpacing: "-0.2px"
      });
    case "display3":
      return css({
        color: theme.colors.text.heading,
        fontWeight: theme.fontWeights.display,
        fontSize: theme.fontSizes[5],
        lineHeight: theme.lineHeights.heading,
        marginBottom: theme.spaces.sm,
        [theme.mediaQueries.md]: {
          fontSize: theme.fontSizes[6]
        }
      });
    case "display2":
      return css({
        color: theme.colors.text.heading,
        fontWeight: theme.fontWeights.display,
        fontSize: theme.fontSizes[6],
        lineHeight: theme.lineHeights.heading,
        marginBottom: theme.spaces.sm,
        [theme.mediaQueries.md]: {
          fontSize: theme.fontSizes[7]
        }
      });
    case "display1":
      return css({
        color: theme.colors.text.heading,
        fontWeight: theme.fontWeights.display,
        fontSize: theme.fontSizes[7],
        lineHeight: theme.lineHeights.heading,
        marginBottom: theme.spaces.sm,
        [theme.mediaQueries.md]: {
          fontSize: theme.fontSizes[8]
        }
      });
  }
};

export type TextVariants =
  | "uppercase"
  | "hidden"
  | "body"
  | "paragraph"
  | "subtitle"
  | "lead"
  | "h6"
  | "h5"
  | "h4"
  | "h3"
  | "h2"
  | "h1"
  | "display3"
  | "display2"
  | "display1";

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

const basicStyles = (theme: Theme) => ({
  base: css({
    boxSizing: "border-box",
    margin: 0,
    fontWeight: theme.fontWeights.body,
    lineHeight: theme.lineHeights.body,
    fontFamily: theme.fonts.base,
    fontSize: theme.fontSizes[1],
    color: theme.colors.text.default,
    WebkitFontSmoothing: "antialiased",
    WebkitTextSizeAdjust: "none"
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
});

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
  const theme = useTheme();

  const variantStyles = React.useMemo(() => getVariantStyles(theme, variant), [
    theme,
    variant
  ]);
  const styles = React.useMemo(() => basicStyles(theme), [theme]);

  return (
    <Component
      css={[
        styles.base,
        !wrap && styles.noWrap,
        muted && styles.muted,
        variantStyles,
        !gutter && styles.noGutter
      ]}
      {...other}
    />
  );
};

Text.propTypes = {
  variant: PropTypes.oneOf([
    "uppercase",
    "hidden",
    "body",
    "paragraph",
    "subtitle",
    "lead",
    "h6",
    "h5",
    "h4",
    "h3",
    "h2",
    "h1",
    "display3",
    "display2",
    "display1"
  ]),
  wrap: PropTypes.bool,
  muted: PropTypes.bool,
  gutter: PropTypes.bool
};
