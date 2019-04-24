/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Button, ButtonProps, ButtonSize, getHeight } from "./Button";
import VisuallyHidden from "@reach/visually-hidden";
import PropTypes from "prop-types";
import { IconWrapper } from "./IconWrapper";
import { IconX } from "./Icons";

export interface IconButtonProps extends Partial<ButtonProps> {
  /** A label required for accessibility  */
  label: string;
  /** The name of the icon you wish to render */
  icon?: React.ReactNode;
  /** Change the colour */
  color?: string;
  children?: React.ReactNode;
}

/**
 * A component which composes Button and Icon to provide
 * interactive icon elements.
 */
export const IconButton: React.RefForwardingComponent<
  React.Ref<HTMLButtonElement>,
  IconButtonProps
> = React.forwardRef(
  (
    {
      label,
      size = "md" as ButtonSize,
      icon,
      children,
      onPress,
      color = "currentColor",
      ...other
    }: IconButtonProps,
    ref
  ) => {
    return (
      <Button
        ref={ref}
        size={size}
        css={{
          padding: 0,
          width: getHeight(size)
        }}
        onPress={onPress}
        {...other}
      >
        <VisuallyHidden>{label}</VisuallyHidden>
        <IconWrapper color="currentColor" size={size}>
          {icon}
        </IconWrapper>
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["default", "ghost"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"])
};

interface CloseButtonProps extends Partial<ButtonProps> {
  /** An optional label for the close button */
  label?: string;
  /** Change the colour */
  color?: string;
}

export const CloseButton: React.FunctionComponent<CloseButtonProps> = ({
  label = "Close",
  ...other
}) => {
  return (
    <IconButton variant="ghost" label={label} icon={<IconX />} {...other} />
  );
};

CloseButton.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.oneOf(["default", "ghost"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"])
};
