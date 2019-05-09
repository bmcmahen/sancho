/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import VisuallyHidden from "@reach/visually-hidden";
import PropTypes from "prop-types";
import { alpha } from "./Theme/colors";
import { useUid } from "./Hooks/use-uid";
import { Theme } from "./Theme";
import { useTheme } from "./Theme/Providers";
import { getHeight, focusShadow } from "./Button";
import { IconAlertCircle, IconChevronDown } from "./Icons";

const getInputSizes = (theme: Theme) => ({
  sm: css({
    fontSize: theme.fontSizes[0],
    padding: "0.25rem 0.5rem"
  }),
  md: css({
    fontSize: theme.fontSizes[1],
    padding: "0.5rem 0.75rem"
  }),
  lg: css({
    fontSize: theme.fontSizes[2],
    padding: "0.65rem 1rem"
  })
});

export type InputSize = "sm" | "md" | "lg";

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  /** A label is required for accessibility purposes. Use `hideLabel` to hide it. */
  label: string;
  /** Visually hide the label. It remains accessible to screen readers. */
  hideLabel?: boolean;
  error?: string | React.ReactNode;
  /** Optional help text */
  helpText?: string;
  /** A single input element */
  children?: React.ReactNode;
}

export const InputGroup: React.FunctionComponent<InputGroupProps> = ({
  id,
  label,
  children,
  error,
  helpText,
  hideLabel,
  ...other
}) => {
  const uid = useUid(id);
  const theme = useTheme();
  const isDark = theme.colors.mode === "dark";
  const danger = isDark
    ? theme.colors.intent.danger.light
    : theme.colors.intent.danger.base;

  return (
    <div
      className="InputGroup"
      css={{
        marginTop: theme.spaces.md,
        ":first-child": {
          marginTop: 0
        }
      }}
      {...other}
    >
      <Label hide={hideLabel} htmlFor={uid}>
        {label}
      </Label>
      {React.isValidElement(children) &&
        React.cloneElement(children as React.ReactElement<any>, {
          id: uid
        })}

      {error && typeof error === "string" ? (
        <div
          className="InputGroup__error"
          css={{
            alignItems: "center",
            marginTop: theme.spaces.sm,
            display: "flex"
          }}
        >
          <IconAlertCircle size="sm" color={danger} />
          <Text
            css={{
              display: "block",
              marginLeft: theme.spaces.xs,
              fontSize: theme.fontSizes[0],
              color: danger
            }}
          >
            {error}
          </Text>
        </div>
      ) : (
        error
      )}

      {helpText && (
        <Text
          className="InputGroup__help"
          css={{
            display: "block",
            marginTop: theme.spaces.xs,
            color: theme.colors.text.muted,
            fontSize: theme.fontSizes[0]
          }}
          variant="body"
        >
          {helpText}
        </Text>
      )}
    </div>
  );
};

InputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  helpText: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

function getBaseStyles(theme: Theme) {
  const dark = theme.colors.mode === "dark";

  const baseStyles = css({
    display: "block",
    width: "100%",
    lineHeight: theme.lineHeights.body,
    color: theme.colors.text.default,
    backgroundColor: "transparent",
    backgroundImage: "none",
    backgroundClip: "padding-box",
    WebkitFontSmoothing: "antialiased",
    WebkitTapHighlightColor: "transparent",
    WebkitAppearance: "none",
    boxSizing: "border-box",
    touchAction: "manipulation",
    fontFamily: theme.fonts.base,
    border: "none",
    boxShadow: `0 0 0 2px transparent inset, 0 0 0 1px ${
      dark
        ? alpha(theme.colors.palette.gray.lightest, 0.14)
        : alpha(theme.colors.palette.gray.dark, 0.2)
    } inset`,
    borderRadius: theme.radii.sm,
    transition:
      "background 0.25s cubic-bezier(0.35,0,0.25,1), border-color 0.15s cubic-bezier(0.35,0,0.25,1), box-shadow 0.15s cubic-bezier(0.35,0,0.25,1)",
    "::placeholder": {
      color: alpha(theme.colors.text.default, 0.45)
    },
    ":focus": {
      boxShadow: dark
        ? focusShadow(
            alpha(theme.colors.palette.blue.light, 0.5),
            alpha(theme.colors.palette.gray.dark, 0.4),
            alpha(theme.colors.palette.gray.light, 0.2)
          )
        : focusShadow(
            alpha(theme.colors.palette.blue.dark, 0.1),
            alpha(theme.colors.palette.gray.dark, 0.2),
            alpha(theme.colors.palette.gray.dark, 0.05)
          ),
      outline: "none"
    },
    ":disabled": {
      opacity: dark ? 0.4 : 0.8,
      background: theme.colors.background.tint1,
      cursor: "not-allowed",
      boxShadow: `0 0 0 2px transparent inset, 0 0 0 1px ${
        dark
          ? alpha(theme.colors.palette.gray.lightest, 0.05)
          : alpha(theme.colors.palette.gray.dark, 0.15)
      } inset`
    },
    ":active": {
      background: theme.colors.background.tint1
    }
  });

  return baseStyles;
}

function useActiveStyle() {
  const [active, setActive] = React.useState(false);
  return {
    bind: {
      onTouchStart: () => setActive(true),
      onTouchEnd: () => setActive(false)
    },
    active
  };
}

function useSharedStyle() {
  const theme = useTheme();
  const baseStyles = React.useMemo(() => getBaseStyles(theme), [theme]);
  const inputSizes = React.useMemo(() => getInputSizes(theme), [theme]);
  const activeBackground = css({ background: theme.colors.background.tint1 });
  return {
    baseStyles,
    inputSizes,
    activeBackground
  };
}

export interface InputBaseProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** The size of the input element */
  inputSize?: InputSize;
}

/**
 * Our basic Input element. Use this when building customized
 * forms. Otherwise, stick with InputGroup
 */

export const InputBase: React.FunctionComponent<InputBaseProps> = ({
  autoComplete,
  autoFocus,
  inputSize = "md",
  ...other
}) => {
  const { bind, active } = useActiveStyle();
  const { baseStyles, inputSizes, activeBackground } = useSharedStyle();
  const height = getHeight(inputSize);
  return (
    <input
      className="Input"
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      {...bind}
      css={[
        baseStyles,
        inputSizes[inputSize],
        active && activeBackground,
        { height }
      ]}
      {...other}
    />
  );
};

InputBase.propTypes = {
  inputSize: PropTypes.oneOf(["sm", "md", "lg"] as InputSize[])
};

export const Input = InputBase;

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** The size of the textarea element */
  inputSize?: InputSize;
}

/**
 * Textarea version of InputBase
 */

export const TextArea: React.FunctionComponent<TextAreaProps> = ({
  inputSize = "md",
  ...other
}) => {
  const { bind, active } = useActiveStyle();
  const { baseStyles, inputSizes, activeBackground } = useSharedStyle();

  return (
    <textarea
      className="TextArea"
      {...bind}
      css={[
        baseStyles,
        inputSizes[inputSize],
        {
          overflow: "auto",
          resize: "vertical"
        },
        active && activeBackground
      ]}
      {...other}
    />
  );
};

TextArea.propTypes = {
  inputSize: PropTypes.oneOf(["sm", "md", "lg"] as InputSize[])
};

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  hide?: boolean;
  htmlFor: string;
}

/**
 * A styled Label to go along with input elements
 */

export const Label: React.FunctionComponent<LabelProps> = ({
  children,
  hide,
  ...other
}) => {
  const theme = useTheme();
  const child = (
    <label
      className="Label"
      css={{
        display: "inline-block",
        marginBottom: hide ? 0 : theme.spaces.sm
      }}
      {...other}
    >
      <Text className="Label__text" variant={"subtitle"}>
        {children}
      </Text>
    </label>
  );

  return hide ? <VisuallyHidden>{child}</VisuallyHidden> : child;
};

Label.propTypes = {
  hide: PropTypes.bool
};

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** The size of the select box */
  inputSize?: InputSize;
}

/**
 * A styled select menu
 */

export const Select: React.FunctionComponent<SelectProps> = ({
  multiple,
  inputSize = "md",
  ...other
}) => {
  const theme = useTheme();
  const inputSizes = getInputSizes(theme);
  const selectSize = {
    sm: inputSizes.sm,
    md: inputSizes.md,
    lg: inputSizes.lg
  };
  const dark = theme.colors.mode === "dark";
  const height = getHeight(inputSize);

  return (
    <div
      className="Select"
      css={{
        position: "relative"
      }}
    >
      <select
        className="Select__input"
        css={[
          selectSize[inputSize],
          {
            WebkitAppearance: "none",
            display: "block",
            width: "100%",
            lineHeight: theme.lineHeights.body,
            height,
            color: theme.colors.text.default,
            background: "transparent",
            fontFamily: theme.fonts.base,
            boxShadow: `0 0 0 2px transparent inset, 0 0 0 1px ${
              dark
                ? alpha(theme.colors.palette.gray.lightest, 0.14)
                : alpha(theme.colors.palette.gray.dark, 0.2)
            } inset`,
            border: "none",
            backgroundClip: "padding-box",
            borderRadius: theme.radii.sm,
            margin: 0,
            ":disabled": {
              ":disabled": {
                opacity: dark ? 0.4 : 0.8,
                background: theme.colors.background.tint1,
                cursor: "not-allowed",
                boxShadow: `0 0 0 2px transparent inset, 0 0 0 1px ${
                  dark
                    ? alpha(theme.colors.palette.gray.lightest, 0.05)
                    : alpha(theme.colors.palette.gray.dark, 0.1)
                } inset`
              }
            },
            ":focus": {
              borderColor: theme.colors.palette.blue.base,
              boxShadow: dark
                ? focusShadow(
                    alpha(theme.colors.palette.blue.light, 0.5),
                    alpha(theme.colors.palette.gray.dark, 0.4),
                    alpha(theme.colors.palette.gray.light, 0.2)
                  )
                : focusShadow(
                    alpha(theme.colors.palette.blue.dark, 0.1),
                    alpha(theme.colors.palette.gray.dark, 0.2),
                    alpha(theme.colors.palette.gray.dark, 0.05)
                  ),
              outline: 0
            }
          }
        ]}
        multiple={multiple}
        {...other}
      />
      {!multiple && (
        <IconChevronDown
          className="Select__icon"
          color={theme.colors.text.muted}
          css={{
            position: "absolute",
            top: "50%",
            right: "0.75rem",
            transform: "translateY(-50%)"
          }}
        />
      )}
    </div>
  );
};

Select.propTypes = {
  inputSize: PropTypes.oneOf(["sm", "md", "lg"])
};

export interface CheckProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** A label for the checkmark. */
  label: string;
}

export const Check: React.FunctionComponent<CheckProps> = ({
  label,
  id,
  disabled,
  ...other
}) => {
  const uid = useUid(id);
  const theme = useTheme();

  return (
    <div
      className="Check"
      css={{ display: "flex", alignItems: "center" }}
      {...other}
    >
      <input
        disabled={disabled}
        className="Check__input"
        type="checkbox"
        id={uid}
        {...other}
      />
      <label
        className="Check__label"
        css={{
          opacity: disabled ? 0.6 : undefined,
          marginLeft: theme.spaces.xs
        }}
        htmlFor={uid}
      >
        <Text>{label}</Text>
      </label>
    </div>
  );
};

Check.propTypes = {
  label: PropTypes.string.isRequired
};
