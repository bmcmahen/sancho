/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import theme from "./Theme";
import VisuallyHidden from "@reach/visually-hidden";
import PropTypes from "prop-types";
import uniqueId from "lodash.uniqueId";

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

interface OptionalInputProps {
  autoFocus?: boolean;
  autoComplete?: string;
  value?: string;
  type?: string;
}

interface InputProps
  extends OptionalInputProps,
    React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id?: string;
  label: string;
  type?: string;
  textarea?: boolean;
  hideLabel?: boolean;
  helpText?: string;
  size?: InputSize;
}

export const InputGroup: React.FunctionComponent<InputProps> = ({
  size = "md",
  id = uniqueId(),
  label,
  textarea,
  autoFocus,
  autoComplete,
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
    >
      <Label hide={hideLabel} htmlFor={id}>
        {label}
      </Label>
      {textarea ? (
        <TextArea size={size} id={name} {...other} />
      ) : (
        <InputBase
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          size={size}
          id={id}
          {...other}
        />
      )}
      {helpText && (
        <Text
          css={{
            display: "block",
            marginTop: theme.spaces.sm,
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

  /** Use a textarea instead of an input */
  textarea: PropTypes.bool,

  /** Visually hide the label. It remains accessible to screen readers. */
  hideLabel: PropTypes.bool,

  /** Optional help text */
  helpText: PropTypes.string,

  /** The size of the input element */
  size: PropTypes.oneOf(["sm", "md", "lg"] as InputSize[])
};

export const baseStyles = css({
  display: "block",
  width: "100%",
  lineHeight: "1.5",
  color: theme.colors.text.default,
  backgroundColor: "white",
  backgroundImage: "none",
  backgroundClip: "padding-box",
  "-webkit-font-smoothing": "antialiased",
  boxSizing: "border-box",
  touchAction: "manipulation",
  fontFamily: theme.fonts.base,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${
    theme.colors.scales.neutral.N3A
  }, inset 0 1px 2px ${theme.colors.scales.neutral.N3A}`,
  borderRadius: theme.radii.sm,
  transition: "border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s",
  "::placeholder": {
    color: theme.colors.scales.neutral.N5
  },
  ":focus": {
    zIndex: 2,
    boxShadow: `inset 0 0 2px ${
      theme.colors.scales.neutral.N4A
    }, inset 0 0 0 1px ${theme.colors.scales.blue.B6A}, 0 0 0 3px ${
      theme.colors.scales.blue.B3A
    }`,
    outline: "none"
  },
  ":disabled": {
    boxShadow: `inset 0 0 0 1px ${theme.colors.scales.neutral.N3A}`
  }
});

export interface InputBaseProps
  extends OptionalInputProps,
    React.HTMLAttributes<HTMLInputElement> {
  size?: InputSize;
}

export const InputBase: React.FunctionComponent<InputBaseProps> = ({
  autoComplete,
  autoFocus,
  size = "md",
  ...other
}) => {
  return (
    <input
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      css={[baseStyles, inputSizes[size]]}
      {...other}
    />
  );
};

InputBase.propTypes = {
  /** The size of the input element */
  size: PropTypes.oneOf(["sm", "md", "lg"] as InputSize[])
};

export const Input = InputBase;

export interface TextAreaProps
  extends React.HTMLAttributes<HTMLTextAreaElement> {
  size?: InputSize;
}

export const TextArea: React.FunctionComponent<TextAreaProps> = ({
  size = "md",
  ...other
}) => {
  return (
    <textarea
      css={[
        baseStyles,
        inputSizes[size],
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
  size: PropTypes.oneOf(["sm", "md", "lg"] as InputSize[])
};

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
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
        marginBottom: hide ? 0 : theme.spaces.sm
      }}
      {...other}
    >
      <Text css={{ fontSize: theme.sizes[0] }} variant={"body"}>
        {children}
      </Text>
    </label>
  );

  return hide ? <VisuallyHidden>{child}</VisuallyHidden> : child;
};

Label.propTypes = {
  hide: PropTypes.bool
};
