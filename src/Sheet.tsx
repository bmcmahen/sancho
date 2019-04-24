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
import { usePrevious } from "./Hooks/previous";
import { useHideBody } from "./Hooks/hide-body";
import { ResponderContext } from "./Hooks/use-responder-grant";

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
  const [click, setClick] = React.useState();
  const [disableChildGestures, setDisableChildGestures] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  useFocusElement(ref, isOpen);
  const { bounds } = useMeasure(ref);
  const previousBounds = usePrevious(bounds);
  const positionsStyle = React.useMemo(() => positions(theme), [theme]);
  const initialDirection = React.useRef(null);
  const { bind: bindHideBody } = useHideBody(isOpen);

  const startVelocity = React.useRef(null);

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

  const bind = useGesture({
    onMove: () => {
      setDisableChildGestures(true);
    },
    onUp: () => {
      setDisableChildGestures(false);
    },
    onAction: ({
      down,
      delta,
      args,
      velocity,
      initial,
      xy,
      direction,
      first
    }: any) => {
      const { width, height } = args[0];
      const isOpen = args[1];
      const position = args[2];
      const initialDirection = args[3] as React.MutableRefObject<any>;
      const startVelocity = args[4] as React.MutableRefObject<number | null>;

      // We determine the direction of the gesture within the first
      // two drag events. This "locks in" the gesture direction for the
      // remainder of the swipe.
      if (first) {
        initialDirection.current = null;
        return;
      }

      const gestureDirection =
        initialDirection.current || getDirection(initial, xy);

      if (!initialDirection.current) {
        initialDirection.current = gestureDirection;
      }

      // determine the sheet position
      const { x, y } = getFinalPosition({
        delta,
        width,
        height,
        down,
        isOpen,
        velocity,
        direction,
        gestureDirection,
        onRequestClose,
        position,
        startVelocity
      });

      // determine the overlay opacity
      const opacity = getOpacity({
        delta,
        width,
        gestureDirection,
        down,
        height,
        isOpen,
        position
      });

      // set spring values
      setSpring({
        x,
        y,
        immediate: down,
        config: {
          ...animationConfig,
          velocity: startVelocity.current || 0
        }
      });
      setOpacity({ immediate: down, opacity });
    }
  });

  /**
   * Handle close / open non-gestured controls
   */

  React.useEffect(() => {
    const { width, height } = bounds;

    // a bit of a hack to prevent the sheet from being
    // displayed at the wrong position before properly
    // measuring it.
    const hasMounted =
      previousBounds && previousBounds.width === 0 && width !== 0;

    if (hasMounted && !mounted) {
      setMounted(true);
    }

    // when the user makes the gesture to close we start
    // our animation with their last velocity
    const velocity = startVelocity.current;
    startVelocity.current = null;

    setSpring({
      config: {
        ...animationConfig,
        velocity: velocity || 0
      },
      ...getDefaultPositions(isOpen, position, width, height),
      immediate: !!hasMounted
    });

    setOpacity({ opacity: isOpen ? 1 : 0 });
  }, [position, mounted, bounds, previousBounds, isOpen]);

  /**
   * Emulate a click event to disambiguate it
   * from gesture events. Not the ideal solution.
   */

  function onMouseDown(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    setClick(true);
  }

  function onMouseMove(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    setClick(false);
  }

  function onMouseUp(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    if (click && closeOnClick) {
      onRequestClose();
    }
  }

  return (
    <Portal>
      {/** 
        Ideally we would reuse the Overlay here, but the behaviour is 
        unique enough that (for now) it's easier just copying it
      */}
      <div
        {...bindHideBody}
        aria-hidden={!isOpen}
        {...bind(bounds, isOpen, position, initialDirection, startVelocity)}
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
              return `
                translateX(${taper(x, position)}px) 
                translateY(${taper(y, position)}px)
              `;
            })
          }}
          css={[
            {
              visibility: mounted ? "visible" : "hidden",
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
            <RemoveScroll enabled={isOpen} forwardProps>
              <div
                className="Sheet__container"
                css={{
                  background: theme.colors.background.layer,
                  height: "100%"
                }}
              >
                <ResponderContext.Provider
                  value={{ disabled: disableChildGestures }}
                >
                  {children}
                </ResponderContext.Provider>
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

interface GetPositionOptions {
  delta: [number, number];
  width: number;
  height: number;
  down: boolean;
  gestureDirection: null | "horizontal" | "vertical";
  onRequestClose: () => void;
  isOpen: boolean;
  velocity: number;
  direction: [number, number];
  position: SheetPositions;
  startVelocity: React.MutableRefObject<number | null>;
}

function getFinalPosition({
  delta,
  width,
  height,
  down,
  isOpen,
  gestureDirection,
  velocity,
  direction,
  onRequestClose,
  position,
  startVelocity
}: GetPositionOptions) {
  const [dx, dy] = delta;

  function close() {
    startVelocity.current = velocity;
    onRequestClose();
  }

  switch (position) {
    case "left": {
      if (gestureDirection !== "horizontal") {
        return { x: 0, y: 0 };
      }

      if (down) {
        return { x: dx, y: 0 };
      }

      // calculate if our direction is _primarily_ horizontal,
      // and only update our x coordinate if so. This means that
      // you can vertically scroll without any obvious
      // gesture response
      if (velocity > 0.2 && direction[0] < 0) {
        close();
        return { x: dx, y: 0 };
      }

      if (dx < 0 || !isOpen) {
        if (Math.abs(dx) > width / 2) {
          close();
          return { x: dx, y: 0 };
        }
      }

      return { x: 0, y: 0 };
    }

    case "top": {
      if (gestureDirection !== "vertical") {
        return { x: 0, y: 0 };
      }

      if (down) {
        return { y: dy, x: 0 };
      }

      if (velocity > 0.2 && direction[1] <= -1) {
        close();
        return { y: dy, x: 0 };
      }

      if (dy < 0 || !isOpen) {
        if (Math.abs(dy) > height / 2) {
          close();
          return { y: dy, x: 0 };
        }
      }

      return { x: 0, y: 0 };
    }

    case "right": {
      if (gestureDirection !== "horizontal") {
        return { x: 0, y: 0 };
      }

      if (down) {
        return { x: dx, y: 0 };
      }

      if (velocity > 0.2 && direction[0] >= 1) {
        close();
        return { x: dx, y: 0 };
      }

      if (dx > 0 || !isOpen) {
        if (Math.abs(dx) > width / 2) {
          close();
          return { x: dx, y: 0 };
        }
      }

      return { x: 0, y: 0 };
    }

    case "bottom": {
      if (gestureDirection !== "vertical") {
        return { x: 0, y: 0 };
      }

      if (down) {
        return { y: dy, x: 0 };
      }

      if (velocity > 0.2 && direction[1] > 0) {
        close();
        return { y: dy, x: 0 };
      }

      if (dy > 0 || !isOpen) {
        if (Math.abs(dy) > height / 2) {
          close();
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
  down: boolean;
  isOpen: boolean;
  position: SheetPositions;
  gestureDirection: null | "horizontal" | "vertical";
}

function getOpacity({
  delta,
  gestureDirection,
  width,
  height,
  down,
  isOpen,
  position
}: GetOpacityOptions) {
  if (!isOpen) {
    return 0;
  }

  if (isOpen && !down) {
    return 1;
  }

  const [dx, dy] = delta;

  switch (position) {
    case "left": {
      if (gestureDirection !== "horizontal") {
        return 1;
      }

      return dx < 0 ? 1 - Math.abs(dx) / width : 1;
    }

    case "top": {
      if (gestureDirection !== "vertical") {
        return 1;
      }
      return dy < 0 ? 1 - Math.abs(dy) / height : 1;
    }

    case "right": {
      if (gestureDirection !== "horizontal") {
        return 1;
      }

      return dx > 0 ? 1 - Math.abs(dx) / width : 1;
    }

    case "bottom": {
      if (gestureDirection !== "vertical") {
        return 1;
      }
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
