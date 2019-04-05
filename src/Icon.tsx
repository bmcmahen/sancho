import * as React from "react";
import { useTheme } from "./Theme/Providers";
import { IconBase } from "react-icons/lib/cjs";

export interface IconProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: string;
  children: React.ReactNode;
}

export const Icon: React.FunctionComponent<IconProps> = ({
  size = "md",
  color,
  children
}) => {
  const theme = useTheme();

  return React.cloneElement(children as React.ReactElement<any>, {
    size: theme.iconSizes[size],
    color,
    "aria-hidden": true
  });
};
