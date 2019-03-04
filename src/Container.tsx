/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import PropTypes from "prop-types";

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {}

export const Container: React.FunctionComponent<ContainerProps> = (
  props: ContainerProps
) => {
  return (
    <div
      css={{
        width: "100%",
        maxWidth: "1200px",
        boxSizing: "border-box",
        margin: "0 auto",
        padding: `0 ${theme.spaces.md}`,
        [theme.breakpoints.lg]: {
          padding: `0 ${theme.spaces.lg}`
        }
      }}
      {...props}
    />
  );
};

Container.propTypes = {
  children: PropTypes.node
};

export function NegativeMarginsContainer(props: ContainerProps) {
  return (
    <div
      css={{
        marginLeft: `-${theme.spaces.md}`,
        marginRight: `-${theme.spaces.md}`,
        [theme.breakpoints.lg]: {
          marginLeft: `-${theme.spaces.lg}`,
          marginRight: `-${theme.spaces.lg}`
        }
      }}
      {...props}
    />
  );
}
