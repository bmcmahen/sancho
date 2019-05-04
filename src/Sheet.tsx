/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { animated, useSpring } from "react-spring";
import { useFocusElement } from "./Hooks/focus";
import { Portal } from "./Portal";
import PropTypes from "prop-types";
import { RemoveScroll } from "react-remove-scroll";
import { useTheme } from "./Theme/Providers";
import { Theme } from "./Theme";
import { useMeasure, Bounds } from "./Hooks/use-measure";
import { usePrevious } from "./Hooks/previous";
import { useHideBody } from "./Hooks/hide-body";
import { usePanResponder, StateType } from "pan-responder-hook";

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
    & > div {
      border-top-right-radius: ${theme.radii.lg};
      border-top-left-radius: ${theme.radii.lg};
      padding-bottom: ${theme.spaces.lg};
      padding-top: ${theme.spaces.xs};
    }
    &::before {
      content: "";
      position: fixed;
      height: 100vh;
      left: 0;
      right: 0;
      background: ${theme.colors.background.layer};
      top: 100%;
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
    & > div {
      border-bottom-right-radius: ${theme.radii.lg};
      border-bottom-left-radius: ${theme.radii.lg};
      padding-bottom: ${theme.spaces.xs};
      padding-top: ${theme.spaces.md};
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

export const Sheet: React.FunctionComponent<SheetProps> = ({
  isOpen,
  children,
  role = "document",
  closeOnClick = true,
  position = "right",
  onRequestClose,
  ...props
}) => {
  const theme = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  useFocusElement(ref, isOpen);
  const { bounds } = useMeasure(ref);
  const previousBounds = usePrevious(bounds);
  const positionsStyle = React.useMemo(() => positions(theme), [theme]);
  const initialDirection = React.useRef<"vertical" | "horizontal" | null>(null);
  const { bind: bindHideBody } = useHideBody(isOpen);
  const startVelocity = React.useRef<number | null>(null);
  const [visible, setVisible] = React.useState(isOpen);
  const isOpenRef = React.useRef(isOpen);

  // this is a weird-ass hack to allow us to access isOpen
  // state within our onRest callback. Closures!!
  React.useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // A spring which animates the sheet position
  const [{ xy }, setSpring] = useSpring(() => {
    const { x, y } = getDefaultPositions(isOpen, position);
    return {
      xy: [x, y],
      config: animationConfig,
      onStart: () => {
        setVisible(true);
      },
      onRest: () => {
        if (!isOpenRef.current) {
          setVisible(false);
        }
      }
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

  // our overlay pan responder
  const { bind: bindTouchable } = usePanResponder({
    onStartShouldSet: (_, e) => {
      e.stopPropagation();
      return true;
    },
    onRelease: ({ initial, xy }) => {
      // ignore swipes on release
      if (initial[0] === xy[0] && initial[1] === xy[1]) {
        onRequestClose();
      }
    }
  });

  function onEnd(state: StateType) {
    const close = shouldCloseOnRelease(state, bounds, position);

    if (close) {
      onRequestClose();
      return;
    }

    animateToPosition();
  }

  // our main sheet pan responder
  const { bind } = usePanResponder(
    {
      onStartShouldSet: () => {
        initialDirection.current = null;
        return false;
      },
      onMoveShouldSet: ({ initial, xy }) => {
        // we lock in the direction when it's first provided
        const gestureDirection =
          initialDirection.current || getDirection(initial, xy);

        if (!initialDirection.current) {
          initialDirection.current = gestureDirection;
        }

        if (
          gestureDirection === "horizontal" &&
          (position === "left" || position === "right")
        ) {
          return true;
        } else if (
          gestureDirection === "vertical" &&
          (position === "top" || position === "bottom")
        ) {
          return true;
        }

        return false;
      },
      onRelease: (state: StateType) => {
        startVelocity.current = state.velocity;
        onEnd(state);
      },
      onTerminate: onEnd,
      onMove: state => {
        const { x, y } = getDragCoordinates(state, position);
        const opacity = getDragOpacity(state, bounds, position);

        setSpring({
          xy: [x, y],
          immediate: true,
          config: animationConfig
        });

        setOpacity({ opacity });
      }
    },
    {
      enableMouse: false
    }
  );

  /**
   * Animate the sheet to open / close position
   * depending on position and state.
   * @param immediate
   */

  function animateToPosition(immediate = false) {
    // when the user makes the gesture to close we start
    // our animation with their last velocity
    const { width, height } = bounds;
    const velocity = startVelocity.current;
    startVelocity.current = null;

    const { x, y } = getDefaultPositions(isOpen, position, width, height);

    setSpring({
      config: {
        ...animationConfig,
        velocity: velocity || 0
      },
      xy: [x, y],
      immediate
    });

    setOpacity({ opacity: isOpen ? 1 : 0 });
  }

  /**
   * Handle close / open non-gestured controls
   */

  React.useEffect(() => {
    const { width } = bounds;

    // a bit of a hack to prevent the sheet from being
    // displayed at the wrong position before properly
    // measuring it.
    const hasMounted =
      previousBounds && previousBounds.width === 0 && width !== 0;

    if (hasMounted && !mounted) {
      setMounted(true);
    }

    animateToPosition(!mounted);
  }, [position, mounted, bounds, previousBounds, isOpen]);

  /**
   * Convert our positions to translate3d
   */

  const interpolate = (x: number, y: number) => {
    return `translate3d(${taper(x, position)}px, ${taper(y, position)}px, 0)`;
  };

  return (
    <Portal>
      <div
        {...bindHideBody}
        aria-hidden={!isOpen}
        {...bind}
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
          pointerEvents: visible ? "auto" : "none",
          visible: visible ? "visible" : "hidden",
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
          {...bindTouchable}
          css={{
            touchAction: "none",
            position: "absolute",
            willChange: "opacity",
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
            transform: xy.interpolate(interpolate as any)
          }}
          css={[
            {
              willChange: "transform",
              visibility: (visible ? "visible" : "hidden") as any,
              outline: "none",
              zIndex: theme.zIndices.modal,
              opacity: 1,
              position: "fixed" as any
            },
            positionsStyle[position]
          ]}
          {...props}
        >
          <RequestCloseContext.Provider value={onRequestClose}>
            <RemoveScroll enabled={isOpen} forwardProps>
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

Sheet.propTypes = {
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

function getDragCoordinates({ delta }: StateType, position: SheetPositions) {
  const [dx, dy] = delta;
  switch (position) {
    case "left":
    case "right":
      return { x: dx, y: 0 };
    case "top":
    case "bottom":
      return { y: dy, x: 0 };
  }
}

/**
 * Determine if the sheet should close on
 * release given a position.
 */

function shouldCloseOnRelease(
  { delta, velocity, direction }: StateType,
  { width, height }: Bounds,
  position: SheetPositions
) {
  const [dx, dy] = delta;

  switch (position) {
    case "left": {
      // quick swipe
      if (velocity > 0.2 && direction[0] < 0) {
        return true;
      }

      if (dx < 0 && Math.abs(dx) > width / 2) {
        return true;
      }

      return false;
    }

    case "top": {
      if (velocity > 0.2 && direction[1] <= -1) {
        return true;
      }

      if (dy < 0 && Math.abs(dy) > height / 2) {
        return true;
      }

      return false;
    }

    case "right": {
      if (velocity > 0.2 && direction[0] >= 1) {
        return true;
      }

      if (dx > 0 && Math.abs(dx) > width / 2) {
        return true;
      }

      return false;
    }

    case "bottom": {
      if (velocity > 0.2 && direction[1] > 0) {
        return true;
      }

      if (dy > 0 && Math.abs(dy) > height / 2) {
        return true;
      }

      return false;
    }
  }
}

/**
 * Determine the overlay opacity
 */

function getDragOpacity(
  { delta }: StateType,
  { width, height }: Bounds,
  position: SheetPositions
) {
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
        y: isOpen ? 0 : height
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

/**
 * Compare two positions and determine the direction
 * the gesture is moving (horizontal or vertical)
 *
 * If the difference is the same, return null. This happends
 * when only a click is registered.
 *
 * @param initial
 * @param xy
 */

function getDirection(initial: [number, number], xy: [number, number]) {
  const xDiff = Math.abs(initial[0] - xy[0]);
  const yDiff = Math.abs(initial[1] - xy[1]);

  // just a regular click
  if (xDiff === yDiff) {
    return null;
  }

  if (xDiff > yDiff) {
    return "horizontal";
  }

  return "vertical";
}
