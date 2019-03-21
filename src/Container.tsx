/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import PropTypes from "prop-types";

export const responsiveContainerPadding = css({
  padding: `0 ${theme.spaces.md}`,
  [theme.breakpoints.lg]: {
    padding: `0 ${theme.spaces.lg}`
  }
});

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {}

export const Container: React.FunctionComponent<ContainerProps> = (
  props: ContainerProps
) => {
  return (
    <div
      css={[
        {
          width: "100%",
          maxWidth: "1200px",
          boxSizing: "border-box",
          margin: "0 auto"
        },
        responsiveContainerPadding
      ]}
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
