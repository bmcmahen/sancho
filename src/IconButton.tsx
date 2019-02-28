/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Button, ButtonProps } from "./Button";
import { IconName } from "@blueprintjs/icons";
import { Icon } from "./Icons";
import theme from "./Theme";
import VisuallyHidden from "@reach/visually-hidden";

export interface IconButtonProps extends Partial<ButtonProps> {
  label: string;
  icon: IconName;
  color?: string;
}

export const IconButton = React.forwardRef(
  (
    { label, icon, color, ...other }: IconButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <Button ref={ref} css={{ padding: "0.5rem" }} {...other}>
        <VisuallyHidden>{label}</VisuallyHidden>
        <Icon color={color} aria-hidden icon={icon} />
      </Button>
    );
  }
);

interface CloseButtonProps extends Partial<ButtonProps> {
  label?: string;
  color?: string;
}

export function CloseButton({ label = "Close", ...other }: CloseButtonProps) {
  return (
    <IconButton
      variant="ghost"
      css={{
        color: theme.colors.scales.neutral.N10
      }}
      label={label}
      icon="cross"
      {...other}
    />
  );
}
