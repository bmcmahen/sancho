/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { IconProps } from "./IconTypes";
import { useTheme } from "../Theme/Providers";

export const IconActivity: React.FunctionComponent<IconProps> = ({
  color = "currentColor",
  size = "md",
  ...other
}) => {
  const theme = useTheme();
  const width = typeof size == "string" ? theme.iconSizes[size] : size;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...other}
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
};
