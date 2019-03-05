/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import color from "color";
import PropTypes from "prop-types";
import { alpha } from "./Theme/colors";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

const getTextColor = (background: string) => {
  return color(background).isDark() ? "white" : theme.colors.text.default;
};

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
  first: string = alpha(palette.blue.dark, 0.4),
  second: string = alpha(palette.gray.dark, 0.5),
  third: string = alpha(palette.gray.dark, 0.3)
) {
  return `0 0 0 3px ${first}, inset 0 0 0 1px ${second}, inset 0 -1px 1px 0 ${third}`;
}

const { palette } = theme.colors;

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
    color: getTextColor(theme.colors.intent.none.lightest),
    background: gradient(theme.colors.intent.none.lightest, "white"),
    boxShadow: insetShadow(
      alpha(theme.colors.palette.gray.dark, 0.2),
      alpha(theme.colors.palette.gray.dark, 0.1)
    ),
    ":focus": {
      zIndex: 2,
      boxShadow: focusShadow(
        alpha(palette.blue.dark, 0.1),
        alpha(palette.gray.dark, 0.2),
        alpha(palette.gray.dark, 0.05)
      )
    },
    ':active, &[aria-expanded="true"]': {
      background: "none",
      backgroundColor: theme.colors.intent.none.lightest,
      boxShadow: insetShadow(
        alpha(palette.gray.dark, 0.3),
        alpha(palette.gray.dark, 0.15)
      )
    }
  }),
  primary: css({
    backgroundColor: theme.colors.intent.primary.base,
    color: getTextColor(theme.colors.intent.primary.base),
    backgroundImage: gradient(
      theme.colors.intent.primary.base,
      color(theme.colors.intent.primary.base)
        .lighten(0.4)
        .toString()
    ),
    boxShadow: insetShadow(
      alpha(palette.gray.dark, 0.2),
      alpha(palette.gray.dark, 0.2)
    ),
    ":focus": {
      zIndex: 2,
      boxShadow: focusShadow(
        alpha(theme.colors.intent.primary.base, 0.3),
        alpha(palette.gray.dark, 0.3),
        alpha(palette.gray.dark, 0.07)
      )
    },
    ':active, &[aria-expanded="true"]': {
      boxShadow: insetShadow(
        alpha(palette.gray.dark, 0.1),
        alpha(palette.gray.dark, 0.1)
      ),
      backgroundImage: gradient(
        theme.colors.intent.primary.dark,
        theme.colors.intent.primary.base
      )
    }
  }),
  success: css({
    backgroundColor: theme.colors.intent.success.base,
    color: getTextColor(theme.colors.intent.success.base),
    backgroundImage: gradient(
      theme.colors.intent.success.base,
      color(theme.colors.intent.success.base)
        .lighten(0.5)
        .toString()
    ),
    boxShadow: insetShadow(
      alpha(palette.gray.dark, 0.2),
      alpha(palette.gray.dark, 0.2)
    ),
    ":focus": {
      zIndex: 2,
      boxShadow: focusShadow(
        color(theme.colors.intent.success.base)
          .alpha(0.4)
          .toString(),
        alpha(palette.gray.dark, 0.3),
        alpha(palette.gray.dark, 0.1)
      )
    },
    ':active, &[aria-expanded="true"]': {
      boxShadow: insetShadow(
        alpha(palette.gray.dark, 0.1),
        alpha(palette.gray.dark, 0.1)
      ),
      backgroundImage: gradient(
        color(theme.colors.intent.success.base)
          .darken(0.2)
          .toString(),
        theme.colors.intent.success.base
      )
    }
  }),
  danger: css({
    backgroundColor: theme.colors.intent.danger.base,
    color: getTextColor(theme.colors.intent.danger.base),
    backgroundImage: gradient(
      theme.colors.intent.danger.base,
      color(theme.colors.intent.danger.base)
        .lighten(0.3)
        .toString()
    ),
    boxShadow: insetShadow(
      alpha(palette.gray.dark, 0.2),
      alpha(palette.gray.dark, 0.2)
    ),
    ":focus": {
      zIndex: 2,
      boxShadow: focusShadow(
        color(theme.colors.intent.danger.base)
          .alpha(0.4)
          .toString(),
        alpha(palette.gray.dark, 0.3),
        alpha(palette.gray.dark, 0.1)
      )
    },
    ':active, &[aria-expanded="true"]': {
      boxShadow: insetShadow(
        alpha(palette.gray.dark, 0.1),
        alpha(palette.gray.dark, 0.1)
      ),
      backgroundImage: gradient(
        color(theme.colors.intent.danger.base)
          .darken(0.2)
          .toString(),
        theme.colors.intent.danger.base
      )
    }
  }),
  warning: css({
    backgroundColor: theme.colors.intent.warning.base,
    color: getTextColor(theme.colors.intent.warning.base),
    backgroundImage: gradient(
      theme.colors.intent.warning.base,
      color(theme.colors.intent.warning.base)
        .lighten(0.4)
        .toString()
    ),
    boxShadow: insetShadow(
      alpha(palette.gray.dark, 0.2),
      alpha(palette.gray.dark, 0.2)
    ),
    ":focus": {
      zIndex: 2,
      boxShadow: focusShadow(
        color(theme.colors.intent.warning.base)
          .alpha(0.4)
          .toString(),
        alpha(palette.gray.dark, 0.2),
        alpha(palette.gray.dark, 0.1)
      )
    },
    ':active, &[aria-expanded="true"]': {
      boxShadow: insetShadow(
        alpha(palette.gray.dark, 0.1),
        alpha(palette.gray.dark, 0.1)
      ),
      backgroundImage: gradient(
        color(theme.colors.intent.warning.base)
          .darken(0.2)
          .toString(),
        theme.colors.intent.warning.base
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
    color: theme.colors.text.muted,
    ":hover": {
      background: alpha(theme.colors.palette.gray.base, 0.07)
    },
    ":focus": {
      zIndex: 2,
      boxShadow: `0 0 0 3px ${alpha(theme.colors.palette.blue.base, 0.25)}`
    },
    ':active, &[aria-expanded="true"]': {
      color: palette.blue.dark,
      background: alpha(theme.colors.palette.gray.base, 0.13),
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
