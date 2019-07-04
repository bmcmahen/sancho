/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "./Theme/Providers";

export const useResponsiveContainerPadding = () => {
  const theme = useTheme();
  return css({
    padding: `0 ${theme.spaces.md}`,
    [theme.mediaQueries.lg]: {
      padding: `0 ${theme.spaces.lg}`
    }
  });
};

type ContainerProps = React.HTMLAttributes<HTMLElement>;

export const Container: React.FunctionComponent<ContainerProps> = (
  props: ContainerProps
) => {
  const responsiveContainerPadding = useResponsiveContainerPadding();
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
  const theme = useTheme();
  return (
    <div
      css={{
        marginLeft: `-${theme.spaces.md}`,
        marginRight: `-${theme.spaces.md}`,
        [theme.mediaQueries.lg]: {
          marginLeft: `-${theme.spaces.lg}`,
          marginRight: `-${theme.spaces.lg}`
        }
      }}
      {...props}
    />
  );
}
