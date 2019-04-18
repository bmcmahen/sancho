/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { useTransition, animated, useSpring } from "react-spring";
import { useFocusElement } from "./Hooks/focus";
import { Overlay } from "./Overlay";
import { Portal } from "./Portal";
import { useGesture } from "react-with-gesture";
import PropTypes from "prop-types";
import { RemoveScroll } from "react-remove-scroll";
import { useTheme } from "./Theme/Providers";
import { Theme } from "./Theme";
import { useMeasure } from "./Collapse";

export const RequestCloseContext = React.createContext(() => {});

const animationConfig = { mass: 1, tension: 185, friction: 26 };

function getTransitionForPosition(position: SheetPositions) {
  switch (position) {
    case "left":
      return {
        from: { transform: `translate3d(-100%, 0, 0)` },
        enter: { transform: `translate3d(0, 0, 0)` },
        leave: { transform: `translate3d(-100%, 0, 0)` },
        config: animationConfig
      };
    case "right":
      return {
        from: { transform: `translate3d(100%, 0, 0)` },
        enter: { transform: `translate3d(0, 0, 0)` },
        leave: { transform: `translate3d(100%, 0, 0)` },
        config: animationConfig
      };
    case "top":
      return {
        from: { transform: `translateY(-100%)` },
        enter: { transform: `translateY(0)` },
        leave: { transform: `translateY(-100%)` },
        config: animationConfig
      };
    case "bottom":
      return {
        from: { transform: `translateY(100%)` },
        enter: { transform: `translateY(0)` },
        leave: { transform: `translateY(100%)` },
        config: animationConfig
      };
  }
}

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
      transform: translateX(-100%);
    }
  `,
  right: css({
    top: 0,
    right: 0,
    bottom: 0,
    width: "auto",
    maxWidth: "100vw",
    [theme.mediaQueries.md]: {
      maxWidth: "400px"
    }
  }),
  bottom: css({
    bottom: 0,
    left: 0,
    right: 0,
    height: "auto",
    width: "100%",
    padding: 0,
    boxSizing: "border-box",
    [theme.mediaQueries.md]: {
      maxHeight: "400px"
    },
    "& > div": {
      borderTopRightRadius: theme.radii.lg,
      borderTopLeftRadius: theme.radii.lg,
      paddingBottom: theme.spaces.lg,
      paddingTop: theme.spaces.xs
    }
  }),
  top: css({
    top: 0,
    left: 0,
    right: 0,
    height: "auto",
    width: "100%",
    padding: 0,
    [theme.mediaQueries.md]: {
      maxHeight: "400px"
    },
    "& > div": {
      borderBottomRightRadius: theme.radii.lg,
      borderBottomLeftRadius: theme.radii.lg,
      paddingBottom: theme.spaces.xs,
      paddingTop: theme.spaces.md
    }
  })
});

const noop = () => {};

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
  const [mounted, setMounted] = React.useState();
  const { ref, bounds } = useMeasure();
  const positionsStyle = React.useMemo(() => positions(theme), [theme]);

  function getFinalPosition(
    dx: number,
    width: number,
    down: boolean,
    isOpen: boolean
  ) {
    if (down) {
      return dx;
    }

    if (dx < 0 || !isOpen) {
      if (Math.abs(dx) > width / 2) {
        onRequestClose();
        return dx;
      }
    }

    return 0;
  }

  const [{ x }, setSpring] = useSpring(() => {
    return {
      x: isOpen ? 0 : -400
    };
  });

  const [{ opacity }, setOpacity] = useSpring(() => {
    return {
      opacity: isOpen ? 1 : 0
    };
  });

  function getOpacity(dx: number, width: number, isOpen: boolean) {
    if (!isOpen) {
      return 0;
    }

    if (dx < 0) {
      const percent = Math.abs(dx) / width;
      return 1 - percent;
    }

    return 1;
  }

  const bind = useGesture(({ event, down, delta, args }) => {
    const [dx] = delta;
    const { width } = args[0];
    const isOpen = args[1];
    const x = getFinalPosition(dx, width, down, isOpen);
    setSpring({ x, immediate: down });
    setOpacity({ immediate: down, opacity: getOpacity(dx, width, isOpen) });
  });

  React.useEffect(() => {
    setSpring({ x: isOpen ? 0 : bounds.width * -1 });
    setOpacity({ opacity: isOpen ? 1 : 0 });
  }, [bounds, isOpen]);

  function taper(x: number) {
    if (x <= 0) {
      return x;
    }

    return x * 0.4;
  }

  // 4. support all 4 positions

  // 5. actually unmount when finished?
  // keep a local close state, and monitor animation to finish.

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
    <div
      aria-hidden={!isOpen}
      {...bind(bounds, isOpen)}
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
          transform: x.interpolate(x => {
            return `translateX(${taper(x)}px)`;
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
  );
};

GestureSheet.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  children: PropTypes.node,
  position: PropTypes.oneOf(["left", "top", "right", "bottom"]),
  closeOnClick: PropTypes.bool
};
