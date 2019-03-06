/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Button, ButtonProps } from "./Button";
import { IconName } from "@blueprintjs/icons";
import { Icon } from "./Icons";
import theme from "./Theme";
import VisuallyHidden from "@reach/visually-hidden";
import PropTypes from "prop-types";

export interface IconButtonProps extends Partial<ButtonProps> {
  label: string;
  icon: IconName | JSX.Element;
  color?: string;
}

export const IconButton: React.RefForwardingComponent<
  React.Ref<HTMLButtonElement>,
  IconButtonProps
> = React.forwardRef(({ label, icon, color, ...other }, ref) => {
  return (
    <Button ref={ref} css={{ padding: "0.5rem" }} {...other}>
      <VisuallyHidden>{label}</VisuallyHidden>
      <Icon color={color} aria-hidden icon={icon} />
    </Button>
  );
});

IconButton.displayName = "IconButton";

IconButton.propTypes = {
  /** The name of the icon you wish to render */
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,

  /** Change the colour */
  color: PropTypes.string,

  /** A label required for accessibility  */
  label: PropTypes.string.isRequired,

  /**
   * Controls the basic button style.
   */

  variant: PropTypes.oneOf(["default", "ghost"]),
  /**
   * The size of the button.
   */
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"])
};

interface CloseButtonProps extends Partial<ButtonProps> {
  label?: string;
  color?: string;
}

export const CloseButton: React.FunctionComponent<CloseButtonProps> = ({
  label = "Close",
  ...other
}) => {
  return (
    <IconButton
      variant="ghost"
      css={{
        color: theme.colors.text.default
      }}
      label={label}
      icon="cross"
      {...other}
    />
  );
};

CloseButton.propTypes = {
  /** An optional label for the close button */
  label: PropTypes.string,

  /** Change the colour */
  color: PropTypes.string,

  /**
   * Controls the basic button style.
   */
  variant: PropTypes.oneOf(["default", "ghost"]),
  /**
   * The size of the button.
   */
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"])
};
