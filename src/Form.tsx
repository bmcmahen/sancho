/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import theme from "./Theme";

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
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  hideLabel?: boolean;
  helpText?: string;
  size?: InputSize;
}

export function InputGroup({
  size = "md",
  name,
  label,
  textarea,
  autoFocus,
  autoComplete,
  helpText,
  hideLabel,
  ...other
}: InputProps) {
  return (
    <div
      css={{
        marginTop: theme.spaces.md,
        ":first-child": {
          marginTop: 0
        }
      }}
    >
      <Label hide={hideLabel} htmlFor={name}>
        {label}
      </Label>
      {textarea ? (
        <TextArea size={size} id={name} {...other} />
      ) : (
        <InputBase
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          size={size}
          id={name}
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
}

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

export function InputBase({
  autoComplete,
  autoFocus,
  size = "md",
  ...other
}: InputBaseProps) {
  return (
    <input
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      css={[baseStyles, inputSizes[size]]}
      {...other}
    />
  );
}

export interface TextAreaProps
  extends React.HTMLAttributes<HTMLTextAreaElement> {
  size?: InputSize;
}

export function TextArea({ size = "md", ...other }: TextAreaProps) {
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
}

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  hide?: boolean;
  htmlFor: string;
}

export function Label({ children, hide, ...other }: LabelProps) {
  return (
    <label
      css={{
        display: "inline-block",
        marginBottom: hide ? 0 : theme.spaces.sm
      }}
      {...other}
    >
      <Text
        css={{ fontSize: theme.sizes[0] }}
        variant={hide ? "hidden" : "body"}
      >
        {children}
      </Text>
    </label>
  );
}
