/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { animated, useSpring, interpolate } from "react-spring";
import { useFocusElement } from "./Hooks/focus";
import { Portal } from "./Portal";
import { useGesture } from "react-with-gesture";
import PropTypes from "prop-types";
import { RemoveScroll } from "react-remove-scroll";
import { useTheme } from "./Theme/Providers";
import { Theme } from "./Theme";
import { useMeasure } from "./Hooks/use-measure";

export const RequestCloseContext = React.createContext(() => {});

const animationConfig = { mass: 1, tension: 185, friction: 26 };

const positions = (theme: Theme) => ({
  left: css`
    top: 0;
    left: 0;
    bottom: 0;
    width: auto;
    max-width: 100vw;
    ${theme.mediaQueries.md} {
      max-width: 400px;
    }
    &::before {
      content: "";
      position: fixed;
      width: 100vw;
      top: 0;
      background: ${theme.colors.background.layer};
      bottom: 0;
      right: 100%;
    }
  `,
  right: css`
    top: 0;
    right: 0;
    bottom: 0;
    width: auto;
    max-width: 100vw;
    ${theme.mediaQueries.md} {
      max-width: 400px;
    }
    &::after {
      content: "";
      position: fixed;
      width: 100vw;
      top: 0;
      left: 100%;
      background: ${theme.colors.background.layer};
      bottom: 0;
    }
  `,
  bottom: css`
    bottom: 0;
    left: 0;
    right: 0;
    height: auto;
    width: 100%;
    padding: 0;
    box-sizing: border-box;
    ${theme.mediaQueries.md} {
      max-height: 400px;
    }
    &::before {
      content: "";
      position: fixed;
      height: 100vh;
      left: 0;
      right: 0;
      background: ${theme.colors.background.layer};
      transform: translateY(100%);
    }
  `,
  top: css`
    top: 0;
    left: 0;
    right: 0;
    height: auto;
    width: 100%;
    padding: 0;
    box-sizing: border-box;
    ${theme.mediaQueries.md} {
      max-height: 400px;
    }
    &::before {
      content: "";
      position: fixed;
      height: 100vh;
      left: 0;
      right: 0;
      background: ${theme.colors.background.layer};
      transform: translateY(-100%);
    }
  `
});

export type SheetPositions = "left" | "top" | "bottom" | "right";

interface SheetProps {
  /** Whether the sheet is visible */
  isOpen: boolean;
  /** A callback to handle closing the sheet */
  onRequestClose: () => void;
  role?: string;
  children: React.ReactNode;
  /**
   *  The position of the sheet.
   * 'left' is typically used for navigation,
   * 'right' for additional information,
   * 'bottom' for responsive modal popovers.
   */
  position: SheetPositions;
  closeOnClick?: boolean;
}

/**
 * A sheet is useful for displaying app based navigation (typically on the left),
 * supplemental information (on the right), or menu options (typically
 * from the bottom on mobile devices).
 *
 * Sheets should not be tied to specific URLs.
 */

export const GestureSheet: React.FunctionComponent<SheetProps> = ({
  isOpen,
  children,
  role = "document",
  closeOnClick = true,
  position = "right",
  onRequestClose,
  ...props
}) => {
  const theme = useTheme();
  const [click, setClick] = React.useState();
  const ref = React.useRef<HTMLDivElement | null>(null);
  useFocusElement(ref, isOpen);
  const { bounds } = useMeasure(ref);
  const positionsStyle = React.useMemo(() => positions(theme), [theme]);

  // A spring which animates the sheet position
  const [{ x, y }, setSpring] = useSpring(() => {
    const { x, y } = getDefaultPositions(isOpen, position);
    return {
      x,
      y,
      config: animationConfig
    };
  });

  // A spring which animates the overlay opacity
  const [{ opacity }, setOpacity] = useSpring(() => {
    return {
      opacity: isOpen ? 1 : 0,
      config: animationConfig
    };
  });

  /**
   * Handle gestures
   */

  const bind = useGesture(({ down, delta, args, velocity, direction }) => {
    const { width, height } = args[0];
    const isOpen = args[1];
    const position = args[2];

    // determine the sheet position
    const { x, y } = getFinalPosition({
      delta,
      width,
      height,
      down,
      isOpen,
      velocity,
      direction,
      onRequestClose,
      position
    });

    // determine the overlay opacity
    const opacity = getOpacity({
      delta,
      width,
      height,
      isOpen,
      position
    });

    // set spring values
    setSpring({ x, immediate: down });
    setOpacity({ immediate: down, opacity });
  });

  /**
   * Handle close / open non-gestured controls
   */

  React.useEffect(() => {
    const { width, height } = bounds;
    setSpring(getDefaultPositions(isOpen, position, width, height));
    setOpacity({ opacity: isOpen ? 1 : 0 });
  }, [position, bounds, isOpen]);

  /**
   * Emulate a click event to disambiguate it
   * from gesture events
   */

  function onMouseDown() {
    setClick(true);
  }

  function onMouseMove() {
    setClick(false);
  }

  function onMouseUp() {
    if (click) {
      onRequestClose();
    }
  }

  return (
    <Portal>
      <div
        aria-hidden={!isOpen}
        {...bind(bounds, isOpen, position)}
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
          pointerEvents: isOpen ? "auto" : "none",
          zIndex: theme.zIndices.overlay,
          position: "fixed",
          content: "''",
          right: 0,
          top: 0,
          WebkitTapHighlightColor: "transparent"
        }}
      >
        <animated.div
          style={{ opacity }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onTouchStart={onMouseDown}
          onTouchMove={onMouseMove}
          onTouchEnd={onMouseUp}
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: isOpen ? "auto" : "none",
            right: 0,
            bottom: 0,
            background: theme.colors.background.overlay
          }}
        />
        <animated.div
          tabIndex={-1}
          ref={ref}
          className="Sheet"
          onClick={e => {
            e.stopPropagation();
          }}
          style={{
            transform: interpolate([x, y], (x, y) => {
              return `translateX(${taper(x, position)}px) translateY(${taper(
                y,
                position
              )})`;
            })
          }}
          css={[
            {
              outline: "none",
              zIndex: theme.zIndices.modal,
              opacity: 1,
              position: "fixed"
            },
            positionsStyle[position]
          ]}
          {...props}
        >
          <RequestCloseContext.Provider value={onRequestClose}>
            <RemoveScroll forwardProps>
              <div
                className="Sheet__container"
                css={{
                  background: theme.colors.background.layer,
                  height: "100%"
                }}
              >
                {children}
              </div>
            </RemoveScroll>
          </RequestCloseContext.Provider>
        </animated.div>
      </div>
    </Portal>
  );
};

GestureSheet.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  children: PropTypes.node,
  position: PropTypes.oneOf(["left", "top", "right", "bottom"]),
  closeOnClick: PropTypes.bool
};

/**
 * Determine the sheet location given
 * its position and the gesture input
 */

interface GetPositionOptions {
  delta: [number, number];
  width: number;
  height: number;
  down: boolean;
  onRequestClose: () => void;
  isOpen: boolean;
  velocity: number;
  direction: [number, number];
  position: SheetPositions;
}

function getFinalPosition({
  delta,
  width,
  height,
  down,
  isOpen,
  velocity,
  direction,
  onRequestClose,
  position
}: GetPositionOptions) {
  const [dx, dy] = delta;

  switch (position) {
    case "left": {
      if (down) {
        return { x: dx, y: 0 };
      }

      if (velocity > 0.2 && direction[0] < 1) {
        onRequestClose();
        return { x: dx, y: 0 };
      }

      if (dx < 0 || !isOpen) {
        if (Math.abs(dx) > width / 2) {
          onRequestClose();
          return { x: dx, y: 0 };
        }
      }

      return { x: 0, y: 0 };
    }

    case "top": {
      if (down) {
        return { y: dy, x: 0 };
      }

      if (velocity > 0.2 && direction[1] < 1) {
        onRequestClose();
        return { y: dy, x: 0 };
      }

      if (dy < 0 || !isOpen) {
        if (Math.abs(dy) > height / 2) {
          onRequestClose();
          return { y: dy, x: 0 };
        }
      }

      return { x: 0, y: 0 };
    }

    case "right": {
      if (down) {
        return { x: dx, y: 0 };
      }

      if (velocity > 0.2 && direction[0] > 1) {
        onRequestClose();
        return { x: dx, y: 0 };
      }

      if (dx > 0 || !isOpen) {
        if (Math.abs(dx) > width / 2) {
          onRequestClose();
          return { x: dx, y: 0 };
        }
      }

      return { x: 0, y: 0 };
    }

    case "bottom": {
      if (down) {
        return { y: dy, x: 0 };
      }

      if (velocity > 0.2 && direction[1] > 1) {
        onRequestClose();
        return { y: dy, x: 0 };
      }

      if (dy > 0 || !isOpen) {
        if (Math.abs(dy) > height / 2) {
          onRequestClose();
          return { y: dy, x: 0 };
        }
      }

      return { x: 0, y: 0 };
    }
  }
}

/**
 * Determine the overlay opacity
 */

interface GetOpacityOptions {
  delta: [number, number];
  width: number;
  height: number;
  isOpen: boolean;
  position: SheetPositions;
}

function getOpacity({
  delta,
  width,
  height,
  isOpen,
  position
}: GetOpacityOptions) {
  if (!isOpen) {
    return 0;
  }

  const [dx, dy] = delta;

  switch (position) {
    case "left": {
      return dx < 0 ? 1 - Math.abs(dx) / width : 1;
    }

    case "top": {
      return dy < 0 ? 1 - Math.abs(dy) / height : 1;
    }

    case "right": {
      return dx > 0 ? 1 - Math.abs(dx) / width : 1;
    }

    case "bottom": {
      return dy > 0 ? 1 - Math.abs(dy) / height : 1;
    }
  }
}

/**
 * Determine the default x, y position
 * for the various positions
 */

function getDefaultPositions(
  isOpen: boolean,
  position: SheetPositions,
  width: number = 400,
  height: number = 400
) {
  switch (position) {
    case "left": {
      return {
        x: isOpen ? 0 : -width,
        y: 0
      };
    }
    case "top": {
      return {
        x: 0,
        y: isOpen ? 0 : -height
      };
    }
    case "right": {
      return {
        x: isOpen ? 0 : width,
        y: 0
      };
    }
    case "bottom": {
      return {
        x: 0,
        y: isOpen ? -height : 0
      };
    }
  }
}

/**
 * Add friction to the sheet position if it's
 * moving inwards
 * @param x
 */

function taper(x: number, position: SheetPositions) {
  if (position === "left" || position === "top") {
    if (x <= 0) {
      return x;
    }

    return x * 0.4;
  }

  if (x >= 0) {
    return x;
  }

  return x * 0.4;
}
