import * as React from "react";
import { useTheme } from "./Theme/Providers";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconProps {
  size?: IconSize;
  color?: string;
  children: React.ReactNode;
  className?: string;
}

export const Icon: React.FunctionComponent<IconProps> = ({
  size = "md",
  color,
  children,
  ...other
}) => {
  const theme = useTheme();

  return React.cloneElement(children as React.ReactElement<any>, {
    size: theme.iconSizes[size],
    color,
    "aria-hidden": true,
    style: { display: "block" },
    ...other
  });
};
