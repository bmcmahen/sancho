/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Button, ButtonProps, ButtonSize, getHeight } from "./Button";
import VisuallyHidden from "@reach/visually-hidden";
import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";
import { useTheme } from "./Theme/Providers";
import { IconBase } from "react-icons/lib/cjs";
import { Icon } from "./Icon";

export interface IconButtonProps extends Partial<ButtonProps> {
  /** A label required for accessibility  */
  label: string;
  /** The name of the icon you wish to render */
  icon?: React.ReactNode;
  /** Change the colour */
  color?: string;
  children?: React.ReactNode;
}

// I need to think more about maintaining consistent
// sizes for buttons and iconbuttons so that iconbuttons and buttons
// appear to be consistent heights.
// use heights instead of padding?
const paddingForIconSizes = {
  xs: "0.32rem",
  sm: "0.4rem",
  md: "0.55rem",
  lg: "0.7rem",
  xl: "0.7rem"
};

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
      color = "currentColor",
      ...other
    }: IconButtonProps,
    ref
  ) => {
    const theme = useTheme();

    return (
      <Button
        ref={ref}
        size={size}
        css={{
          padding: paddingForIconSizes[size],
          width: getHeight(size)
        }}
        {...other}
      >
        <VisuallyHidden>{label}</VisuallyHidden>
        <Icon size={size}>{icon}</Icon>
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

IconButton.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
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
  return <IconButton variant="ghost" label={label} icon={<FiX />} {...other} />;
};

CloseButton.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.oneOf(["default", "ghost"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"])
};
