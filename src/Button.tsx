/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import color from "color";
import PropTypes from "prop-types";
import { alpha } from "./Theme/colors";
import { Spinner } from "./Spinner";
import { IconName } from "@blueprintjs/icons";
import { Icon, sizesForIcon } from "./Icons";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

const getTextColor = (background: string) => {
  return color(background).isDark() ? "white" : theme.colors.text.default;
};

const getPadding = (size: ButtonSize) => {
  if (size === "xs") return "0.1rem 0.5rem";
  if (size === "sm") return "0.25rem 0.8rem";
  if (size === "lg") return "0.6rem 1.5rem";
  if (size === "xl") return "0.8rem 2.2rem";
  return "0.5rem 1rem";
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
  WebkitAppearance: "none",
  textAlign: "center",
  WebkitFontSmoothing: "antialiased",
  border: "none",
  outline: "none",
  textRendering: "optimizeLegibility",
  userSelect: "none",
  WebkitTapHighlightColor: "transparent",
  cursor: "pointer",
  boxShadow: "none"
});

/**
 * Intent describes the intention of the button
 * -- eg., does it indicate danger?
 */

const intents = {
  none: css({
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

// variations to the ghost buttons based on intent
const ghostIntents = (intent: ButtonIntent) => {
  return css({
    color:
      intent === "none"
        ? theme.colors.text.muted
        : theme.colors.intent[intent].base,
    opacity: 1,
    background: "transparent",
    boxShadow: "none",
    transition:
      "box-shadow 0.07s cubic-bezier(0.35,0,0.25,1), background 0.07s cubic-bezier(0.35,0,0.25,1), opacity 0.35s cubic-bezier(0.35,0,0.25,1)",
    ":active": {
      opacity: 0.4
    },
    "@media (hover: hover)": {
      ":hover": {
        background: alpha(theme.colors.intent[intent].base, 0.07)
      },
      ":focus": {
        zIndex: 2,
        boxShadow: `0 0 0 3px ${alpha(theme.colors.intent[intent].base, 0.15)}`
      },
      ':active, &[aria-expanded="true"]': {
        background: alpha(theme.colors.intent[intent].base, 0.15),
        boxShadow: "none",
        opacity: 1
      }
    }
  });
};

// variations to the outline buttons based on intent
const outlineIntents = (intent: ButtonIntent) => {
  return css({
    color: theme.colors.intent[intent].base,
    borderColor: alpha(theme.colors.intent[intent].base, 0.2),
    boxShadow: "none",
    transition:
      "box-shadow 0.07s cubic-bezier(0.35,0,0.25,1), background 0.07s cubic-bezier(0.35,0,0.25,1)",
    "@media (hover:hover)": {
      ":hover": {
        background: alpha(theme.colors.intent[intent].base, 0.05)
      }
    },
    ":focus": {
      zIndex: 2,
      boxShadow: `0 0 0 3px ${alpha(theme.colors.intent[intent].base, 0.15)}`,
      borderColor: alpha(theme.colors.intent[intent].base, 0.5)
    },
    ':active, &[aria-expanded="true"]': {
      boxShadow: "none",
      background: alpha(theme.colors.intent[intent].base, 0.15)
    }
  });
};

const variants = {
  default: css({}),
  ghost: css({
    background: "transparent",
    boxShadow: "none"
  }),
  outline: css({
    border: `1px solid`,
    background: "none"
  })
};

const iconSpaceForSize = {
  xs: `calc(${sizesForIcon.xs}px + ${theme.spaces.md} + ${theme.spaces.sm})`,
  sm: `calc(${sizesForIcon.sm}px + ${theme.spaces.md} + ${theme.spaces.sm})`,
  md: `calc(${sizesForIcon.md}px + ${theme.spaces.md} + 0.65rem)`,
  lg: `calc(${sizesForIcon.lg}px + ${theme.spaces.md} + 0.8rem)`,
  xl: `calc(${sizesForIcon.xl}px + ${theme.spaces.md} + ${theme.spaces.md})`
};

export type ButtonVariant = keyof typeof variants;

export interface ButtonStyleProps {
  /** Controls the basic button style. */
  variant?: ButtonVariant;
  /** Controls the colour of the button. */
  intent?: ButtonIntent;
  /** If true, the button will be displayed as a block element instead of inline. */
  block?: boolean;
  /** The size of the button. */
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  /** The name of the icon to appear to the left of the button text*/
  iconBefore?: IconName | JSX.Element;
  /** The name of the icon to appear to the right of the button text */
  iconAfter?: IconName | JSX.Element;
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
 * Your standard Button element
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
      intent = "none",
      disabled = false,
      loading = false,
      component: Component = "button",
      iconBefore,
      iconAfter,
      children,
      ...other
    }: ButtonProps,
    ref
  ) => {
    return (
      <Component
        ref={ref}
        css={getButtonStyles({
          size,
          block,
          variant,
          intent,
          disabled,
          loading,
          iconBefore,
          iconAfter
        })}
        {...other}
      >
        {loading && (
          <div
            className="Spinner"
            css={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            <Spinner delay={1} size={size} />
          </div>
        )}

        {iconBefore && (
          <Icon
            css={{
              position: "absolute",
              left: theme.spaces.md,
              top: "50%",
              transform: "translateY(-50%)"
            }}
            size={size}
            color="currentColor"
            aria-hidden
            icon={iconBefore}
          />
        )}

        {typeof children === "string" ? (
          <span aria-hidden={loading}>{children}</span>
        ) : (
          children
        )}

        {iconAfter && (
          <Icon
            css={{
              position: "absolute",
              right: theme.spaces.md,
              top: "50%",
              transform: "translateY(-50%)"
            }}
            size={size}
            color="currentColor"
            aria-hidden
            icon={iconAfter}
          />
        )}
      </Component>
    );
  }
);

Button.displayName = "Button";

Button.propTypes = {
  variant: PropTypes.oneOf(["default", "ghost", "outline"] as ButtonVariant[]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"] as ButtonSize[]),
  block: PropTypes.bool,
  intent: PropTypes.oneOf([
    "none",
    "primary",
    "success",
    "warning",
    "danger"
  ] as ButtonIntent[]),
  iconBefore: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  iconAfter: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

export function getButtonStyles({
  size = "md",
  block = false,
  variant = "default",
  intent = "none",
  disabled = false,
  loading = false,
  iconBefore,
  iconAfter
}: ButtonStyleProps) {
  return css([
    buttonReset,
    {
      width: block ? "100%" : undefined,
      fontWeight: 500,
      position: "relative",
      fontFamily: theme.fonts.base,
      borderRadius: theme.radii.sm,
      fontSize: getFontSize(size),
      padding: getPadding(size),
      display: getDisplay(block)
    },
    variants[variant],
    getIntent(variant, intent),
    disabled && {
      opacity: 0.7,
      pointerEvents: "none"
    },
    loading && {
      "& > :not(.Spinner)": {
        opacity: 0,
        transition: "opacity 0.1s ease"
      }
    },
    iconBefore && {
      paddingLeft: iconSpaceForSize[size]
    },
    iconAfter && {
      paddingRight: iconSpaceForSize[size]
    }
  ]);
}

function getIntent(variant: ButtonVariant, intent: ButtonIntent) {
  switch (variant) {
    case "default":
      return intents[intent];
    case "ghost":
      return ghostIntents(intent);
    case "outline":
      return outlineIntents(intent);
  }
}
