/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import color from "color";
import PropTypes from "prop-types";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

const getPadding = (size: ButtonSize) => {
  if (size === "xs") return "0.1rem 0.5rem";
  if (size === "sm") return "0.25rem 1rem";
  if (size === "lg") return "0.6rem 2rem";
  if (size === "xl") return "0.8rem 2.2rem";
  return "0.5rem 1.7rem";
};

const getFontSize = (size: ButtonSize) => {
  if (size === "xs") return theme.sizes[0];
  if (size === "lg") return theme.sizes[2];
  if (size === "sm") return theme.sizes[0];
  if (size === "xl") return theme.sizes[3];
  return theme.sizes[1];
};

const getDisplay = (block: boolean) => (block ? "flex" : "inline-flex");

function gradient(start: string, end: string) {
  return `linear-gradient(to top, ${start}, ${end})`;
}

function insetShadow(from: string, to: string) {
  return `inset 0 0 0 1px ${from}, inset 0 -1px 1px 0 ${to}`;
}

export function focusShadow(
  first: string = scales.blue.B4A,
  second: string = scales.neutral.N5A,
  third: string = scales.neutral.N3A
) {
  return `0 0 0 3px ${first}, inset 0 0 0 1px ${second}, inset 0 -1px 1px 0 ${third}`;
}

const { scales, palette } = theme.colors;
const { blue, neutral } = scales;

export const buttonReset = css({
  textDecoration: "none",
  background: "none",
  "-webkit-appearance": "none",
  "-webkit-font-smoothing": "antialiased",
  border: "none",
  outline: "none",
  textRendering: "optimizeLegibility",
  userSelect: "none",
  "-webkit-tap-highlight-color": "transparent",
  cursor: "pointer",
  boxShadow: "none"
});

/**
 * Intent describes the intention of the button
 * -- eg., does it indicate danger?
 */

const intents = {
  default: css({
    backgroundColor: "white",
    color: neutral.N8,
    background: gradient(theme.colors.scales.neutral.N1, "white"),
    boxShadow: insetShadow(
      theme.colors.scales.neutral.N3A,
      theme.colors.scales.neutral.N2A
    ),
    // ":hover": {
    //   background: gradient(theme.colors.scales.neutral.N2, "white")
    // },
    ':active, &[aria-expanded="true"]': {
      background: "none",
      backgroundColor: theme.colors.palette.blue.lightest,
      boxShadow: insetShadow(scales.neutral.N5A, scales.neutral.N3A)
    },
    ":focus": {
      zIndex: 2,
      boxShadow: focusShadow(
        scales.blue.B4A,
        scales.neutral.N5A,
        scales.neutral.N3A
      )
    }
  }),
  primary: css({
    backgroundColor: blue.B9,
    color: "white",
    backgroundImage: gradient(blue.B9, blue.B7),
    boxShadow: insetShadow(neutral.N4A, neutral.N4A),
    ":focus": {
      zIndex: 2,
      boxShadow: focusShadow(
        scales.blue.B5A,
        scales.neutral.N5A,
        scales.neutral.N1A
      )
    },
    ':active, &[aria-expanded="true"]': {
      boxShadow: insetShadow(neutral.N5A, neutral.N5A),
      backgroundImage: gradient(blue.B10, blue.B9)
    }
  }),
  success: css({
    backgroundColor: palette.green.base,
    color: "white",
    backgroundImage: gradient(
      palette.green.base,
      color(palette.green.base)
        .lighten(0.4)
        .toString()
    ),
    boxShadow: insetShadow(neutral.N4A, neutral.N4A),
    ":focus": {
      zIndex: 2,
      boxShadow: focusShadow(
        color(palette.green.base)
          .alpha(0.4)
          .toString(),
        scales.neutral.N3A,
        scales.neutral.N1A
      )
    },
    ':active, &[aria-expanded="true"]': {
      boxShadow: insetShadow(neutral.N5A, neutral.N5A),
      backgroundImage: gradient(
        color(palette.green.base)
          .darken(0.4)
          .toString(),
        palette.green.base
      )
    }
  }),
  danger: css({
    backgroundColor: palette.red.base,
    color: "white",
    backgroundImage: gradient(
      palette.red.base,
      color(palette.red.base)
        .lighten(0.2)
        .toString()
    ),
    boxShadow: insetShadow(neutral.N4A, neutral.N4A),
    ":focus": {
      zIndex: 2,
      boxShadow: focusShadow(
        color(palette.red.base)
          .alpha(0.4)
          .toString(),
        scales.neutral.N4A,
        scales.neutral.N1A
      )
    },
    ':active, &[aria-expanded="true"]': {
      boxShadow: insetShadow(neutral.N5A, neutral.N5A),
      backgroundImage: gradient(
        color(palette.red.base)
          .darken(0.2)
          .toString(),
        palette.red.base
      )
    }
  }),
  warning: css({
    backgroundColor: palette.yellow.base,
    color: theme.colors.text.default,
    backgroundImage: gradient(
      palette.yellow.base,
      color(palette.yellow.base)
        .lighten(0.4)
        .toString()
    ),
    boxShadow: insetShadow(neutral.N3A, neutral.N3A),
    ":focus": {
      zIndex: 2,
      boxShadow: focusShadow(
        color(palette.yellow.base)
          .alpha(0.4)
          .toString(),
        scales.neutral.N2A,
        scales.neutral.N1A
      )
    },
    ':active, &[aria-expanded="true"]': {
      boxShadow: insetShadow(neutral.N5A, neutral.N5A),
      backgroundImage: gradient(
        color(palette.yellow.base)
          .darken(0.2)
          .toString(),
        palette.yellow.base
      )
    }
  })
};

export type ButtonIntent = keyof typeof intents;

const variants = {
  default: css({}),
  ghost: css({
    background: "transparent",
    boxShadow: "none",
    color: neutral.N7,
    ":hover": {
      background: neutral.N2A
    },
    ":focus": {
      zIndex: 2,
      boxShadow: `0 0 0 3px ${blue.B5A}`
    },
    ':active, &[aria-expanded="true"]': {
      color: blue.B10,
      background: blue.B3A,
      boxShadow: "none"
    }
  })
};

export type ButtonVariant = keyof typeof variants;

export interface ButtonStyleProps {
  variant?: ButtonVariant;
  intent?: ButtonIntent;
  block?: boolean;
  size?: ButtonSize;
}

export interface ButtonProps
  extends ButtonStyleProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
  component?: React.ReactType<any>;
  [key: string]: any; // bad hack to permit component injection
}

/**
 * Just your usual Button element.
 */

export const Button: React.RefForwardingComponent<
  React.Ref<HTMLButtonElement>,
  ButtonProps
> = React.forwardRef(
  (
    {
      size = "md",
      block,
      variant = "default",
      intent = "default",
      component: Component = "button",
      ...other
    }: ButtonProps,
    ref
  ) => {
    return (
      <Component
        ref={ref}
        css={getButtonStyles({ size, block, variant, intent })}
        {...other}
      />
    );
  }
);

Button.displayName = "Button";

Button.propTypes = {
  /**
   * Controls the basic button style.
   */
  variant: PropTypes.oneOf(["default", "ghost"] as ButtonVariant[]),
  /**
   * The size of the button.
   */
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"] as ButtonSize[]),
  /**
   * If true, the button will be displayed as a block element instead of inline.
   */
  block: PropTypes.bool,
  /**
   * Controls the colour of the button.
   */
  intent: PropTypes.oneOf([
    "default",
    "primary",
    "success",
    "warning",
    "danger"
  ] as ButtonIntent[])
};

export function getButtonStyles({
  size = "md",
  block = false,
  variant = "default",
  intent = "default"
}: ButtonStyleProps) {
  return css([
    buttonReset,
    {
      fontWeight: 500,
      fontFamily: theme.fonts.base,
      position: "relative",
      borderRadius: theme.radii.sm,
      fontSize: getFontSize(size),
      padding: getPadding(size),
      display: getDisplay(block)
    },
    intents[intent],
    variants[variant]
  ]);
}
