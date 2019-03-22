/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import { Spinner } from "./Spinner";
import PropTypes from "prop-types";

export type LayerElevations = keyof typeof theme.shadows;

interface LayerProps extends React.HTMLAttributes<HTMLElement> {
  /** The size of the shadow to use */
  elevation?: LayerElevations;
  /** The contents of the layer */
  children: React.ReactNode;
}

export const Layer: React.RefForwardingComponent<
  React.Ref<HTMLDivElement>,
  LayerProps
> = React.forwardRef(
  (
    { elevation = "md", children, ...other }: LayerProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        css={{
          position: "relative",
          background: "white",
          boxShadow: theme.shadows[elevation],
          borderRadius: theme.radii.lg
        }}
        {...other}
      >
        {children}
      </div>
    );
  }
);

Layer.displayName = "Layer";

Layer.propTypes = {
  elevation: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  children: PropTypes.node
};

interface LayerLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the layer is currently loading */
  loading: boolean;
}

export const LayerLoading: React.FunctionComponent<LayerLoadingProps> = ({
  loading,
  ...other
}) => {
  return (
    <div
      css={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        borderRadius: theme.radii.lg,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.7)",
        zIndex: 5,
        transition: "opacity 0.3s ease",
        pointerEvents: loading ? "auto" : "none",
        opacity: loading ? 1 : 0
      }}
      {...other}
    >
      <Spinner />
    </div>
  );
};

LayerLoading.propTypes = {
  loading: PropTypes.bool
};
