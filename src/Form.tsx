/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import theme from "./Theme";
import VisuallyHidden from "@reach/visually-hidden";
import PropTypes from "prop-types";
import uniqueId from "lodash.uniqueid";
import { alpha } from "./Theme/colors";
import { Icon } from "./Icons";

const inputSizes = {
  sm: css({
    fontSize: theme.sizes[0],
    padding: "0.25rem 0.5rem"
  }),
  md: css({
    fontSize: theme.sizes[1],
    padding: "0.375rem 0.75rem"
  }),
  lg: css({
    fontSize: theme.sizes[2],
    padding: "0.5rem 1rem"
  })
};

export type InputSize = keyof typeof inputSizes;

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  label: string;
  hideLabel?: boolean;
  error?: string | React.ReactNode;
  helpText?: string;
  children?: React.ReactNode;
}

export const InputGroup: React.FunctionComponent<InputGroupProps> = ({
  id = uniqueId(),
  label,
  children,
  error,
  helpText,
  hideLabel,
  ...other
}) => {
  return (
    <div
      css={{
        marginTop: theme.spaces.md,
        ":first-child": {
          marginTop: 0
        }
      }}
      {...other}
    >
      <Label hide={hideLabel} htmlFor={id}>
        {label}
      </Label>
      {React.isValidElement(children) &&
        React.cloneElement(children as React.ReactElement<any>, {
          id
        })}

      {error && typeof error === "string" ? (
        <div
          css={{
            alignItems: "center",
            marginTop: theme.spaces.xs,
            display: "flex"
          }}
        >
          <Icon
            icon="error"
            color={theme.colors.intent.danger.base}
            size={14}
          />
          <Text
            css={{
              display: "block",
              marginLeft: theme.spaces.xs,
              fontSize: theme.sizes[0],
              color: theme.colors.intent.danger.base
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
          css={{
            display: "block",
            marginTop: theme.spaces.xs,
            color: theme.colors.text.muted,
            fontSize: theme.sizes[0]
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
  /** A label is required for accessibility purposes. Use `hideLabel` to hide it. */
  label: PropTypes.string.isRequired,
  /** Visually hide the label. It remains accessible to screen readers. */
  hideLabel: PropTypes.bool,
  /** Optional help text */
  helpText: PropTypes.string
};

const gray = theme.colors.palette.gray.base;
const blue = theme.colors.palette.blue.base;

export const baseStyles = css({
  display: "block",
  width: "100%",
  lineHeight: "1.5",
  color: theme.colors.text.default,
  backgroundColor: "white",
  backgroundImage: "none",
  backgroundClip: "padding-box",
  WebkitFontSmoothing: "antialiased",
  WebkitAppearance: "none",
  boxSizing: "border-box",
  touchAction: "manipulation",
  fontFamily: theme.fonts.base,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${alpha(gray, 0.15)}, inset 0 1px 2px ${alpha(
    gray,
    0.2
  )}`,
  borderRadius: theme.radii.sm,
  transition: "border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s",
  "::placeholder": {
    color: alpha(gray, 0.7)
  },
  ":focus": {
    zIndex: 2,
    boxShadow: `inset 0 0 2px ${alpha(gray, 0.4)}, inset 0 0 0 1px ${alpha(
      blue,
      0.3
    )}, 0 0 0 3px ${alpha(blue, 0.2)}`,
    outline: "none"
  },
  ":disabled": {
    boxShadow: `inset 0 0 0 1px ${alpha(gray, 0.45)}`
  }
});

export interface InputBaseProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
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
  return (
    <input
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      css={[baseStyles, inputSizes[inputSize]]}
      {...other}
    />
  );
};

InputBase.propTypes = {
  /** The size of the input element */
  inputSize: PropTypes.oneOf(["sm", "md", "lg"] as InputSize[])
};

export const Input = InputBase;

/**
 * Textarea version of InputBase
 */

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputSize?: InputSize;
}

export const TextArea: React.FunctionComponent<TextAreaProps> = ({
  inputSize = "md",
  ...other
}) => {
  return (
    <textarea
      css={[
        baseStyles,
        inputSizes[inputSize],
        {
          overflow: "auto",
          resize: "vertical"
        }
      ]}
      {...other}
    />
  );
};

TextArea.propTypes = {
  /** The size of the input element */
  inputSize: PropTypes.oneOf(["sm", "md", "lg"] as InputSize[])
};

/**
 * A styled Label to go along with input elements
 */

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  hide?: boolean;
  htmlFor: string;
}

export const Label: React.FunctionComponent<LabelProps> = ({
  children,
  hide,
  ...other
}) => {
  const child = (
    <label
      css={{
        display: "inline-block",
        marginBottom: hide ? 0 : theme.spaces.xs
      }}
      {...other}
    >
      <Text variant={"subtitle"}>{children}</Text>
    </label>
  );

  return hide ? <VisuallyHidden>{child}</VisuallyHidden> : child;
};

Label.propTypes = {
  hide: PropTypes.bool
};

/**
 * A standard Select menu
 */

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  inputSize?: InputSize;
}

const selectSize = {
  sm: inputSizes.sm,
  md: inputSizes.md,
  lg: inputSizes.lg
};

export const Select: React.FunctionComponent<SelectProps> = ({
  multiple,
  inputSize = "md",
  ...other
}) => {
  return (
    <div
      css={{
        position: "relative"
      }}
    >
      <select
        css={[
          selectSize[inputSize],
          {
            WebkitAppearance: "none",
            display: "block",
            width: "100%",
            lineHeight: theme.lineHeight,
            color: theme.colors.text.dark,
            background: "white",
            fontFamily: theme.fonts.base,
            boxShadow: `inset 0 0 0 1px ${alpha(
              gray,
              0.15
            )}, inset 0 1px 2px ${alpha(gray, 0.2)}`,
            border: "none",
            backgroundClip: "padding-box",
            borderRadius: theme.radii.sm,
            margin: 0,
            "& [disabled]": {
              opacity: 0.8,
              backgroundImage: "none",
              cursor: "not-allowed"
            },
            ":focus": {
              borderColor: theme.colors.palette.blue.base,
              boxShadow: `inset 0 0 2px ${alpha(
                gray,
                0.4
              )}, inset 0 0 0 1px ${alpha(blue, 0.3)}, 0 0 0 3px ${alpha(
                blue,
                0.2
              )}`,
              outline: 0
            }
          }
        ]}
        multiple={multiple}
        {...other}
      />
      {!multiple && (
        <Icon
          icon="double-caret-vertical"
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
  /** The size of the select box */
  inputSize: PropTypes.oneOf(Object.keys(selectSize))
};

export interface CheckProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Check: React.FunctionComponent<CheckProps> = ({
  label,
  id = uniqueId(),
  ...other
}) => {
  return (
    <div css={{ display: "flex", alignItems: "center" }}>
      <input type="checkbox" id={id} {...other} />
      <label css={{ marginLeft: theme.spaces.xs }} htmlFor={id}>
        <Text>{label}</Text>
      </label>
    </div>
  );
};

Check.propTypes = {
  /** a label for the Checkmark */
  label: PropTypes.string.isRequired
};
