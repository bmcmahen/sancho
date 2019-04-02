/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import PropTypes from "prop-types";

import {
  SkipNavLink as ReachSkipNavLink,
  SkipNavContent as ReachSkipNavContent,
  ISkipNavProps
} from "@reach/skip-nav";
import { focusShadow } from "./Button";
import { Text } from "./Text";
import { useTheme } from "./Theme/Providers";

export const SkipNavLink: React.FunctionComponent<ISkipNavProps> = ({
  children = "Skip to content",
  ...other
}) => {
  const theme = useTheme();
  return (
    <ReachSkipNavLink
      css={{
        border: 0,
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        color: theme.colors.text.default,
        textDecoration: "none",
        width: "1px",
        ":focus": {
          background: "white",
          clip: "auto",
          height: "auto",
          left: theme.spaces.md,
          top: theme.spaces.md,
          position: "fixed",
          zIndex: 40,
          width: "auto",
          padding: theme.spaces.md,
          borderRadius: theme.radii.md
        }
      }}
      {...other}
    >
      <Text>{children}</Text>
    </ReachSkipNavLink>
  );
};

SkipNavLink.propTypes = {
  children: PropTypes.node
};

export const SkipNavContent = ReachSkipNavContent;
