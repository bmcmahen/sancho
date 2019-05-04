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
import { useTouchable, OnPressFunction } from "touchable-hook";
import cx from "classnames";
import { mergeRefs } from "./Hooks/merge-refs";
import { safeBind } from "./Hooks/compose-bind";

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
  whiteSpace: "nowrap",
  WebkitAppearance: "none",
  boxSizing: "border-box",
  textAlign: "center",
  WebkitFontSmoothing: "antialiased",
  border: "none",
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

const getIntentStyles = (
  theme: Theme,
  intent: ButtonIntent,
  _hover: boolean,
  active: boolean
) => {
  const dark = theme.colors.mode === "dark";
  const { palette } = theme.colors;

  const activeShadow = dark
    ? insetShadow(alpha(palette.gray.dark, 1), alpha(palette.gray.dark, 0.9))
    : insetShadow(alpha(palette.gray.dark, 0.5), alpha(palette.gray.dark, 0.5));

  switch (intent) {
    case "none": {
      if (dark)
        return css([
          {
            backgroundColor: theme.colors.scales.gray[5],
            color: getTextColor(theme.colors.intent.none.base, theme),
            background: gradient(
              theme.colors.intent.none.base,
              lighten(theme.colors.intent.none.base, 0.6)
            ),
            boxShadow: insetShadow(
              alpha(theme.colors.palette.gray.dark, 0.9),
              alpha(theme.colors.palette.gray.dark, 0.8)
            ),
            '&[aria-expanded="true"]': {
              background: "none",
              backgroundColor: theme.colors.intent.none.base,
              boxShadow: insetShadow(
                alpha(palette.gray.base, 1),
                alpha(palette.gray.base, 0.9)
              )
            }
          },
          active && {
            background: "none",
            backgroundColor: theme.colors.intent.none.base,
            boxShadow: insetShadow(
              alpha(theme.colors.palette.gray.dark, 1),
              alpha(theme.colors.palette.gray.dark, 0.9)
            )
          }
        ]);

      return css([
        {
          backgroundColor: "white",
          color: getTextColor(theme.colors.intent.none.lightest, theme),
          background: gradient(theme.colors.intent.none.lightest, "white"),
          boxShadow: insetShadow(
            alpha(theme.colors.palette.gray.dark, 0.2),
            alpha(theme.colors.palette.gray.dark, 0.1)
          ),
          '&[aria-expanded="true"]': {
            background: "none",
            backgroundColor: theme.colors.intent.none.lightest,
            boxShadow: insetShadow(
              alpha(palette.gray.dark, 0.3),
              alpha(palette.gray.dark, 0.15)
            )
          }
        },
        active && {
          background: "none",
          backgroundColor: theme.colors.intent.none.lightest,
          boxShadow: insetShadow(
            alpha(palette.gray.dark, 0.3),
            alpha(palette.gray.dark, 0.15)
          )
        }
      ]);
    }
    case "primary":
      return css([
        {
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

          '&[aria-expanded="true"]': {
            boxShadow: activeShadow,
            backgroundImage: gradient(
              theme.colors.intent.primary.dark,
              theme.colors.intent.primary.base
            )
          }
        },
        active && {
          boxShadow: activeShadow,
          backgroundImage: gradient(
            theme.colors.intent.primary.dark,
            theme.colors.intent.primary.base
          )
        }
      ]);
    case "success":
      return css([
        {
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

          '&[aria-expanded="true"]': {
            boxShadow: activeShadow,
            backgroundImage: gradient(
              color(theme.colors.intent.success.base)
                .darken(0.2)
                .toString(),
              theme.colors.intent.success.base
            )
          }
        },
        active && {
          boxShadow: activeShadow,
          backgroundImage: gradient(
            color(theme.colors.intent.success.base)
              .darken(0.2)
              .toString(),
            theme.colors.intent.success.base
          )
        }
      ]);
    case "danger":
      return css([
        {
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

          '&[aria-expanded="true"]': {
            boxShadow: activeShadow,
            backgroundImage: gradient(
              color(theme.colors.intent.danger.base)
                .darken(0.2)
                .toString(),
              theme.colors.intent.danger.base
            )
          }
        },
        active && {
          boxShadow: activeShadow,
          backgroundImage: gradient(
            color(theme.colors.intent.danger.base)
              .darken(0.2)
              .toString(),
            theme.colors.intent.danger.base
          )
        }
      ]);
    case "warning":
      return css([
        {
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

          '&[aria-expanded="true"]': {
            boxShadow: activeShadow,
            backgroundImage: gradient(
              color(theme.colors.intent.warning.base)
                .darken(0.2)
                .toString(),
              theme.colors.intent.warning.base
            )
          }
        },
        active && {
          boxShadow: activeShadow,
          backgroundImage: gradient(
            color(theme.colors.intent.warning.base)
              .darken(0.2)
              .toString(),
            theme.colors.intent.warning.base
          )
        }
      ]);
  }
};

export type ButtonIntent =
  | "none"
  | "warning"
  | "primary"
  | "success"
  | "danger";

// variations to the ghost buttons based on intent
const ghostIntents = (
  theme: Theme,
  intent: ButtonIntent,
  hover: boolean,
  active: boolean
) => {
  const none = intent === "none";
  const dark = theme.colors.mode === "dark";

  let base = none
    ? theme.colors.text.default
    : theme.colors.intent[intent].base;

  if (dark && !none) {
    base = theme.colors.intent[intent].light;
  }

  return css([
    {
      color: none ? theme.colors.text.muted : base,
      opacity: 1,
      background: "transparent",
      boxShadow: "none",
      transition:
        "box-shadow 0.07s cubic-bezier(0.35,0,0.25,1), background 0.07s cubic-bezier(0.35,0,0.25,1), opacity 0.35s cubic-bezier(0.35,0,0.25,1)",
      '&[aria-expanded="true"]': {
        background: alpha(base, 0.15),
        boxShadow: "none",
        opacity: 1
      }
    },
    hover && {
      background: alpha(base, 0.07)
    },
    active && {
      background: alpha(base, 0.15),
      boxShadow: "none",
      opacity: 1
    }
  ]);
};

// variations to the outline buttons based on intent
const outlineIntents = (
  theme: Theme,
  intent: ButtonIntent,
  hover: boolean,
  active: boolean
) => {
  const none = intent === "none";
  const dark = theme.colors.mode === "dark";

  let base = none
    ? theme.colors.text.default
    : theme.colors.intent[intent].base;

  if (dark && !none) {
    base = theme.colors.intent[intent].light;
  }

  return css([
    {
      color: base,
      borderColor: alpha(base, 0.2),
      boxShadow: "none",
      transition:
        "box-shadow 0.07s cubic-bezier(0.35,0,0.25,1), background 0.07s cubic-bezier(0.35,0,0.25,1)",
      '&[aria-expanded="true"]': {
        background: alpha(base, 0.15)
      }
    },
    hover && {
      background: alpha(base, 0.05)
    },
    active && {
      background: alpha(base, 0.15)
    }
  ]);
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
  /** Use onPress instead of onClick to handle both touch and click events */
  onPress?: OnPressFunction;
  /** Controls the basic button style. */
  variant?: ButtonVariant;
  /** Controls the colour of the button. */
  intent?: ButtonIntent;
  /** If true, the button will be displayed as a block element instead of inline. */
  block?: boolean;
  /** The size of the button. */
  size?: ButtonSize;
  /** Show a loading indicator */
  loading?: boolean;
  disabled?: boolean;
  /** The name of the icon to appear to the left of the button text*/
  iconBefore?: React.ReactNode;
  /** The name of the icon to appear to the right of the button text */
  iconAfter?: React.ReactNode;
  /** By default, a button element will only highlight after a short
   * delay to prevent unintended highlights when scrolling. You can set this to
   * 0 if the element is not in a scrollable container */
  pressDelay?: number;
  /**
   * By default, a touchable element will have an expanded press area of 20px
   * on touch devices. This will only effect touch devices.
   */
  pressExpandPx?: number;
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
      className = "",
      disabled = false,
      loading = false,
      component: Component = "div",
      iconBefore,
      iconAfter,
      children,
      pressDelay = 0,
      pressExpandPx,
      onPress,
      ...other
    }: ButtonProps,
    ref: React.Ref<any>
  ) => {
    const theme = useTheme();
    const isLink = other.to || other.href;
    const { bind, hover, active } = useTouchable({
      onPress,
      delay: pressDelay,
      pressExpandPx,
      disabled,
      behavior: isLink ? "link" : "button"
    });

    // how necessary is this?
    const intentStyle = React.useMemo(
      () => getIntent(variant, intent, theme, hover, active),
      [variant, intent, theme, hover, active]
    );

    return (
      <Component
        className={cx("Button", "Touchable", className, {
          "Touchable--hover": hover,
          "Touchable--active": active
        })}
        role={isLink ? "link" : "button"}
        tabIndex={0}
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
            justifyContent: "center",
            ":focus": {
              outline: theme.outline
            },
            ":focus:not([data-focus-visible-added])": {
              outline: "none"
            }
          },
          variants[variant],
          intentStyle,
          disabled && {
            opacity: 0.6,
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
        {...safeBind(bind, { ref }, other)}
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
  iconBefore: PropTypes.node,
  iconAfter: PropTypes.node
};

function getIntent(
  variant: ButtonVariant,
  intent: ButtonIntent,
  theme: Theme,
  hover: boolean,
  active: boolean
) {
  switch (variant) {
    case "default":
      return getIntentStyles(theme, intent, hover, active);
    case "ghost":
      return ghostIntents(theme, intent, hover, active);
    case "outline":
      return outlineIntents(theme, intent, hover, active);
  }
}
