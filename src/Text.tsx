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
        fontSize: theme.sizes[0],
        fontWeight: 600,
        color: theme.colors.text.muted,
        letterSpacing: "-0.02em"
      });
    case "body":
      return css({
        fontSize: theme.sizes[1]
      });
    case "paragraph":
      return css({
        fontSize: theme.sizes[1],
        marginBottom: theme.spaces.md
      });
    case "subtitle":
      return css({
        fontSize: theme.sizes[0],
        fontWeight: 500,
        lineHeight: 1.5
      });
    case "lead":
      return css({
        fontWeight: 400,
        fontSize: theme.sizes[2]
      });
    case "h6":
      return css({
        fontWeight: 500,
        lineHeight: 1.5,
        fontSize: theme.sizes[1],
        marginBottom: theme.spaces.sm
      });
    case "h5":
      return css({
        fontWeight: 500,
        fontSize: theme.sizes[2],
        lineHeight: 1.2,
        marginBottom: theme.spaces.sm
      });
    case "h4":
      return css({
        fontWeight: 500,
        fontSize: theme.sizes[3],
        lineHeight: 1.2,
        marginBottom: theme.spaces.sm,
        letterSpacing: "-0.2px"
      });
    case "h3":
      return css({
        fontWeight: 500,
        fontSize: theme.sizes[4],
        lineHeight: 1.2,
        marginBottom: theme.spaces.sm
      });
    case "h2":
      return css({
        fontWeight: 500,
        fontSize: theme.sizes[5],
        lineHeight: 1.2,
        marginBottom: theme.spaces.sm,
        letterSpacing: "-0.2px"
      });
    case "h1":
      return css({
        fontWeight: 500,
        fontSize: theme.sizes[6],
        lineHeight: 1.2,
        marginBottom: theme.spaces.sm,
        letterSpacing: "-0.2px"
      });
    case "display3":
      return css({
        fontWeight: 300,
        fontSize: theme.sizes[5],
        lineHeight: 1.2,
        marginBottom: theme.spaces.sm,
        [theme.breakpoints.md]: {
          fontSize: theme.sizes[6]
        }
      });
    case "display2":
      return css({
        fontWeight: 300,
        fontSize: theme.sizes[6],
        lineHeight: 1.2,
        marginBottom: theme.spaces.sm,
        [theme.breakpoints.md]: {
          fontSize: theme.sizes[7]
        }
      });
    case "display1":
      return css({
        fontWeight: 300,
        fontSize: theme.sizes[7],
        lineHeight: 1.2,
        marginBottom: theme.spaces.sm,
        [theme.breakpoints.md]: {
          fontSize: theme.sizes[8]
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
