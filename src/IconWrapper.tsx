import * as React from "react";

type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconWrapperProps {
  size?: IconSize;
  color?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * This wrapper allows us to also render non-sancho icons. It should probably
 * remain a private component.
 */

export const IconWrapper: React.FunctionComponent<IconWrapperProps> = ({
  size = "md",
  color,
  children,
  ...other
}) => {
  return React.cloneElement(children as React.ReactElement<any>, {
    size,
    color,
    "aria-hidden": true,
    style: { display: "block" },
    ...other
  });
};
