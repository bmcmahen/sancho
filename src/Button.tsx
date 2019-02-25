/** @jsx jsx */
import { jsx, css, SerializedStyles } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";

export type ButtonType =
  | "default"
  | "primary"
  | "secondary"
  | "danger"
  | "ghost"
  | "link";

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

function focusShadow(first: string, second: string, third: string) {
  return `0 0 0 3px ${first}, inset 0 0 0 1px ${second}, inset 0 -1px 1px 0 ${third}`;
}

const { scales } = theme.colors;
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

const styles: { [key: string]: SerializedStyles } = {
  base: css([
    buttonReset,
    {
      fontWeight: 500,
      display: "inline-flex",

      position: "relative",
      borderRadius: theme.radii.sm
    }
  ]),
  default: css({
    backgroundColor: "white",
    color: neutral.N8,
    background: gradient(theme.colors.scales.neutral.N1, "white"),
    boxShadow: insetShadow(
      theme.colors.scales.neutral.N2A,
      theme.colors.scales.neutral.N1A
    ),
    ":hover": {
      background: gradient(theme.colors.scales.neutral.N2, "white")
    },
    ':active, &[aria-expanded="true"]': {
      background: "none",
      backgroundColor: theme.colors.palette.blue.lightest,
      boxShadow: insetShadow(scales.neutral.N4A, scales.neutral.N2A)
    },
    ":focus": {
      zIndex: 2,
      boxShadow: focusShadow(
        scales.blue.B4A,
        scales.neutral.N4A,
        scales.neutral.N2A
      )
    }
  }),
  primary: css({
    backgroundColor: blue.B9,
    color: "white",
    backgroundImage: gradient(blue.B9, blue.B8),
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
  secondary: css({}),
  danger: css({}),
  ghost: css({
    backgroundColor: "transparent",
    color: neutral.N7,
    ":hover": {
      backgroundColor: neutral.N2A
    },
    ":focus": {
      zIndex: 2,
      boxShadow: `0 0 0 3px ${blue.B5A}`
    },
    ':active, &[aria-expanded="true"]': {
      color: blue.B10,
      backgroundColor: blue.B3A
    }
  }),
  link: css({})
};

export interface ButtonStyleProps {
  variant?: ButtonType;
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

export const Button = React.forwardRef(
  (
    {
      size,
      block,
      variant,
      component: Component = "button",
      ...other
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <Component
        ref={ref}
        css={getButtonStyles({ size, block, variant })}
        {...other}
      />
    );
  }
);

export function getButtonStyles({
  size = "md",
  block = false,
  variant = "default"
}: ButtonStyleProps) {
  return css([
    styles.base,
    {
      fontSize: getFontSize(size),
      padding: getPadding(size),
      display: getDisplay(block)
    },
    styles[variant]
  ]);
}
