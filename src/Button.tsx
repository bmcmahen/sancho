/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import color from "color";
import PropTypes from "prop-types";
import { alpha, lighten } from "./Theme/colors";
import { Spinner } from "./Spinner";
import { useTheme } from "./Theme/Providers";
import { Theme } from "./Theme";
import { IconWrapper } from "./IconWrapper";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

const getTextColor = (background: string, theme: Theme) => {
  return color(background).isDark() ? "white" : theme.modes.light.text.default;
};

export const getHeight = (size: ButtonSize) => {
  if (size === "xs") return "25px";
  if (size === "sm") return "30px";
  if (size === "lg") return "48px";
  if (size === "xl") return "60px";
  return "40px";
};

const getPadding = (size: ButtonSize) => {
  if (size === "xs") return "0 0.5rem";
  if (size === "sm") return "0 0.8rem";
  if (size === "lg") return "0 1.5rem";
  if (size === "xl") return "0 2.2rem";
  return "0 1rem";
};

const getFontSize = (size: ButtonSize, theme: Theme) => {
  if (size === "xs") return theme.fontSizes[0];
  if (size === "lg") return theme.fontSizes[2];
  if (size === "sm") return theme.fontSizes[0];
  if (size === "xl") return theme.fontSizes[3];
  return theme.fontSizes[1];
};

const getDisplay = (block?: boolean) => (block ? "flex" : "inline-flex");

function gradient(start: string, end: string) {
  return `linear-gradient(to top, ${start}, ${end})`;
}

function insetShadow(from: string, to: string) {
  return `inset 0 0 0 1px ${from}, inset 0 -1px 1px 0 ${to}`;
}

export function focusShadow(first: string, second: string, third: string) {
  return `0 0 0 3px ${first}, inset 0 0 0 1px ${second}, inset 0 -1px 1px 0 ${third}`;
}

export const buttonReset = css({
  textDecoration: "none",
  background: "none",
  WebkitAppearance: "none",
  boxSizing: "border-box",
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

const getIntentStyles = (theme: Theme, intent: ButtonIntent) => {
  const dark = theme.colors.mode === "dark";
  const { palette } = theme.colors;

  switch (intent) {
    case "none": {
      if (dark)
        return css({
          backgroundColor: theme.colors.scales.gray[5],
          color: getTextColor(theme.colors.intent.none.base, theme),
          background: gradient(
            theme.colors.intent.none.base,
            lighten(theme.colors.intent.none.base, 0.8)
          ),
          boxShadow: insetShadow(
            alpha(theme.colors.palette.gray.dark, 0.9),
            alpha(theme.colors.palette.gray.dark, 0.8)
          ),
          ":focus": {
            zIndex: 2,
            boxShadow: focusShadow(
              alpha(palette.blue.light, 0.5),
              alpha(palette.gray.dark, 0.4),
              alpha(palette.gray.light, 0.2)
            )
          },
          ':active, &[aria-expanded="true"]': {
            background: "none",
            backgroundColor: theme.colors.intent.none.base,
            boxShadow: insetShadow(
              alpha(palette.gray.base, 0.3),
              alpha(palette.gray.base, 0.15)
            )
          }
        });

      return css({
        backgroundColor: "white",
        color: getTextColor(theme.colors.intent.none.lightest, theme),
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
      });
    }
    case "primary":
      return css({
        backgroundColor: theme.colors.intent.primary.base,
        color: getTextColor(theme.colors.intent.primary.base, theme),
        backgroundImage: gradient(
          theme.colors.intent.primary.base,
          color(theme.colors.intent.primary.base)
            .lighten(0.4)
            .toString()
        ),
        boxShadow: dark
          ? insetShadow(
              theme.colors.palette.gray.dark,
              theme.colors.palette.gray.dark
            )
          : insetShadow(
              alpha(palette.gray.dark, 0.2),
              alpha(palette.gray.dark, 0.2)
            ),
        ":focus": {
          zIndex: 2,
          boxShadow: dark
            ? focusShadow(
                alpha(theme.colors.intent.primary.light, 0.5),
                alpha(palette.gray.dark, 0.4),
                alpha(palette.gray.light, 0.2)
              )
            : focusShadow(
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
      });
    case "success":
      return css({
        backgroundColor: theme.colors.intent.success.base,
        color: getTextColor(theme.colors.intent.success.base, theme),
        backgroundImage: gradient(
          theme.colors.intent.success.base,
          color(theme.colors.intent.success.base)
            .lighten(0.5)
            .toString()
        ),
        boxShadow: dark
          ? insetShadow(
              theme.colors.palette.gray.dark,
              theme.colors.palette.gray.dark
            )
          : insetShadow(
              alpha(palette.gray.dark, 0.2),
              alpha(palette.gray.dark, 0.2)
            ),
        ":focus": {
          zIndex: 2,
          boxShadow: dark
            ? focusShadow(
                alpha(theme.colors.intent.success.light, 0.5),
                alpha(palette.gray.dark, 0.4),
                alpha(palette.gray.light, 0.2)
              )
            : focusShadow(
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
      });
    case "danger":
      return css({
        backgroundColor: theme.colors.intent.danger.base,
        color: getTextColor(theme.colors.intent.danger.base, theme),
        backgroundImage: gradient(
          theme.colors.intent.danger.base,
          color(theme.colors.intent.danger.base)
            .lighten(0.3)
            .toString()
        ),
        boxShadow: dark
          ? insetShadow(
              theme.colors.palette.gray.dark,
              theme.colors.palette.gray.dark
            )
          : insetShadow(
              alpha(palette.gray.dark, 0.2),
              alpha(palette.gray.dark, 0.2)
            ),
        ":focus": {
          zIndex: 2,
          boxShadow: dark
            ? focusShadow(
                alpha(theme.colors.intent.danger.light, 0.5),
                alpha(palette.gray.dark, 0.4),
                alpha(palette.gray.light, 0.2)
              )
            : focusShadow(
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
      });
    case "warning":
      return css({
        backgroundColor: theme.colors.intent.warning.base,
        color: getTextColor(theme.colors.intent.warning.base, theme),
        backgroundImage: gradient(
          theme.colors.intent.warning.base,
          color(theme.colors.intent.warning.base)
            .lighten(0.4)
            .toString()
        ),
        boxShadow: dark
          ? insetShadow(
              theme.colors.palette.gray.dark,
              theme.colors.palette.gray.dark
            )
          : insetShadow(
              alpha(palette.gray.dark, 0.2),
              alpha(palette.gray.dark, 0.2)
            ),
        ":focus": {
          zIndex: 2,
          boxShadow: dark
            ? focusShadow(
                alpha(theme.colors.intent.warning.light, 0.5),
                alpha(palette.gray.dark, 0.4),
                alpha(palette.gray.light, 0.2)
              )
            : focusShadow(
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
      });
  }
};

export type ButtonIntent =
  | "none"
  | "warning"
  | "primary"
  | "success"
  | "danger";

// variations to the ghost buttons based on intent
const ghostIntents = (theme: Theme, intent: ButtonIntent) => {
  const none = intent === "none";
  const dark = theme.colors.mode === "dark";

  let base = none
    ? theme.colors.text.default
    : theme.colors.intent[intent].base;

  if (dark && !none) {
    base = theme.colors.intent[intent].light;
  }

  return css({
    color: none ? theme.colors.text.muted : base,
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
        background: alpha(base, 0.07)
      },
      ":focus": {
        zIndex: 2,
        boxShadow: `0 0 0 3px ${alpha(base, 0.15)}`
      },
      ':active, &[aria-expanded="true"]': {
        background: alpha(base, 0.15),
        boxShadow: "none",
        opacity: 1
      }
    }
  });
};

// variations to the outline buttons based on intent
const outlineIntents = (theme: Theme, intent: ButtonIntent) => {
  const none = intent === "none";
  const dark = theme.colors.mode === "dark";

  let base = none
    ? theme.colors.text.default
    : theme.colors.intent[intent].base;

  if (dark && !none) {
    base = theme.colors.intent[intent].light;
  }

  return css({
    color: base,
    borderColor: alpha(base, 0.2),
    boxShadow: "none",
    transition:
      "box-shadow 0.07s cubic-bezier(0.35,0,0.25,1), background 0.07s cubic-bezier(0.35,0,0.25,1)",
    "@media (hover:hover)": {
      ":hover": {
        background: alpha(base, 0.05)
      }
    },
    ":focus": {
      zIndex: 2,
      boxShadow: `0 0 0 3px ${alpha(base, 0.15)}`,
      borderColor: alpha(base, 0.5)
    },
    ':active, &[aria-expanded="true"]': {
      boxShadow: "none",
      background: alpha(base, 0.15)
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

const iconSpaceForSize = (theme: Theme) => ({
  xs: `calc(${theme.iconSizes.xs} + 0.6rem)`,
  sm: `calc(${theme.iconSizes.sm} + 0.6rem)`,
  md: `calc(${theme.iconSizes.md} + 0.6rem)`,
  lg: `calc(${theme.iconSizes.lg} + 0.6rem)`,
  xl: `calc(${theme.iconSizes.xl} + 0.6rem)`
});

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
  iconBefore?: React.ReactNode;
  /** The name of the icon to appear to the right of the button text */
  iconAfter?: React.ReactNode;
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
    const theme = useTheme();
    const intentStyle = React.useMemo(() => getIntent(variant, intent, theme), [
      variant,
      intent,
      theme
    ]);

    return (
      <Component
        ref={ref}
        css={[
          buttonReset,
          {
            width: block ? "100%" : undefined,
            fontWeight: 500,
            position: "relative",
            fontFamily: theme.fonts.base,
            borderRadius: theme.radii.sm,
            fontSize: getFontSize(size, theme),
            padding: getPadding(size),
            height: getHeight(size),
            display: getDisplay(block),
            alignItems: "center",
            justifyContent: "center"
          },
          variants[variant],
          intentStyle,
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
          (iconBefore || (block && iconAfter)) && {
            paddingLeft: "0.65rem"
          },
          (iconAfter || (block && iconBefore)) && {
            paddingRight: "0.65rem"
          }
        ]}
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
          <IconWrapper
            css={{ marginRight: theme.spaces.sm }}
            size={size}
            color="currentColor"
            aria-hidden
          >
            {iconBefore}
          </IconWrapper>
        )}

        {typeof children === "string" ? (
          <span
            css={{
              flex: 1,
              // kinda lame hack to center our text in block
              // mode with icons before and after
              marginRight:
                block && iconBefore && !iconAfter
                  ? iconSpaceForSize(theme)[size]
                  : 0,
              marginLeft:
                block && iconAfter && !iconBefore
                  ? iconSpaceForSize(theme)[size]
                  : 0
            }}
            aria-hidden={loading}
          >
            {children}
          </span>
        ) : (
          children
        )}

        {iconAfter && (
          <IconWrapper
            color="currentColor"
            css={{ marginLeft: theme.spaces.sm }}
            size={size}
          >
            {iconAfter}
          </IconWrapper>
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

function getIntent(variant: ButtonVariant, intent: ButtonIntent, theme: Theme) {
  switch (variant) {
    case "default":
      return getIntentStyles(theme, intent);
    case "ghost":
      return ghostIntents(theme, intent);
    case "outline":
      return outlineIntents(theme, intent);
  }
}
