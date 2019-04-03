/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { animated, useTransition } from "react-spring";
import { Portal } from "./Portal";
import { useHideBody } from "./Hooks/hide-body";
import PropTypes from "prop-types";
import { useTheme } from "./Theme/Providers";

interface OverlayProps {
  /** Whether the overlay is open */
  isOpen: boolean;
  /** Whatever you'd like to appear on top */
  children: React.ReactNode;
  /** Callback to handle closing the overlay */
  onRequestClose: () => void;
}

export const Overlay: React.RefForwardingComponent<
  React.Ref<HTMLDivElement>,
  OverlayProps
> = React.forwardRef(
  (
    { isOpen, onRequestClose, children }: OverlayProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const theme = useTheme();
    const transitions = useTransition(isOpen, null, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 }
    });

    const { bind } = useHideBody(isOpen);

    return (
      <Portal>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <div
                key={key}
                ref={ref}
                {...bind}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onRequestClose();
                }}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Escape") {
                    e.stopPropagation();
                    onRequestClose();
                  }
                }}
                css={{
                  bottom: 0,
                  left: 0,
                  overflow: "auto",
                  width: "100vw",
                  height: "100vh",
                  zIndex: theme.zIndex.overlay,
                  position: "fixed",
                  content: "''",
                  right: 0,
                  top: 0,
                  WebkitTapHighlightColor: "transparent"
                }}
              >
                <animated.div
                  style={{ opacity: props.opacity }}
                  css={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: theme.colors.background.overlay
                  }}
                />

                {children}
              </div>
            )
        )}
      </Portal>
    );
  }
);

Overlay.displayName = "Overlay";

Overlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.node
};
