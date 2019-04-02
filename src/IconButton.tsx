/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Button, ButtonProps, ButtonSize } from "./Button";
import { IconName } from "@blueprintjs/icons";
import { Icon } from "./Icons";
import theme from "./Theme";
import VisuallyHidden from "@reach/visually-hidden";
import PropTypes from "prop-types";

export interface IconButtonProps extends Partial<ButtonProps> {
  /** A label required for accessibility  */
  label: string;
  /** The name of the icon you wish to render */
  icon: IconName | JSX.Element;
  /** Change the colour */
  color?: string;
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
      color = "currentColor",
      ...other
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        size={size}
        css={{ padding: paddingForIconSizes[size] }}
        {...other}
      >
        <VisuallyHidden>{label}</VisuallyHidden>
        <Icon size={size} color={color} aria-hidden icon={icon} />
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
  return <IconButton variant="ghost" label={label} icon="cross" {...other} />;
};

CloseButton.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.oneOf(["default", "ghost"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"])
};
