/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";
import * as React from "react";
import { useTheme } from "./Theme/Providers";
import PropTypes from "prop-types";

const animation = keyframes`
  0% {
    background-position: -190px 0;
  }
  100% {
    background-position: calc(190px + 100%) 0;
  }
`;

export interface SkeletonProps {
  baseColor?: string;
  highlightColor?: string;
  duration?: number;
  animated?: boolean;
}

export const Skeleton: React.FunctionComponent<SkeletonProps> = ({
  baseColor,
  highlightColor,
  animated = false,
  duration = 1.2,
  ...other
}) => {
  const theme = useTheme();
  const base = baseColor || theme.colors.background.tint2;
  const highlight = highlightColor || theme.colors.background.tint1;

  return (
    <span
      css={{
        backgroundColor: base,
        backgroundImage: animated
          ? `linear-gradient(90deg, ${base}, ${highlight}, ${base})`
          : "none",
        backgroundSize: "190px 100%",
        backgroundRepeat: "no-repeat",
        borderRadius: theme.radii.sm,
        display: "inline-block",
        lineHeight: 1,
        width: "100%",
        animation: animated
          ? `${animation} ${duration}s linear infinite`
          : "none"
      }}
      {...other}
    >
      &zwnj;
    </span>
  );
};

Skeleton.propTypes = {
  baseColor: PropTypes.string,
  highlightColor: PropTypes.string,
  duration: PropTypes.number
};
