/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { useTransition, animated, useSpring } from "react-spring";
import { useFocusElement } from "./Hooks/focus";
import { Overlay } from "./Overlay";
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
  left: css({
    top: 0,
    left: 0,
    bottom: 0,
    width: "auto",
    maxWidth: "100vw",
    [theme.mediaQueries.md]: {
      maxWidth: "400px"
    }
  }),
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
  const { ref, bounds } = useMeasure();
  const positionsStyle = React.useMemo(() => positions(theme), [theme]);

  function getFinalPosition(dx: number, width: number, down: boolean, gone: boolean) {

    if (down) {
      return dx 
    }

    if (dx < 0 || gone) {
      if (Math.abs(dx) > (width / 2)) {
        console.log('on request close')
        onRequestClose()
        return dx;
      }
    }

    return 0
  }

  const [{ x }, setSpring] = useSpring(() => ({ x: bounds.width * -1 }));

  const bind = useGesture(({ down, delta, args }) => {
    const [dx] = delta;
    const { width } = args[0]
    const isOpen = args[1]
    const x = getFinalPosition(dx, width, down, isOpen)
    setSpring({ x, immediate: down });
  });

  React.useEffect(() => {
    setSpring({ x: isOpen ? 0 : (bounds.width * -1) })
  }, [bounds, isOpen])

  return (
    <React.Fragment>
      <animated.div
        {...bind(bounds, isOpen)}
        tabIndex={-1}
        ref={ref}
        className="Sheet"
        onClick={e => {
          e.stopPropagation();
        }}
        style={{
          transform: x.interpolate(x => {
            return `translateX(${x}px)`;
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
                boxShadow: theme.shadows.md,
                background: theme.colors.background.layer,
                height: "100%"
              }}
            >
              {children}
            </div>
          </RemoveScroll>
        </RequestCloseContext.Provider>
      </animated.div>
    </React.Fragment>
  );
};

GestureSheet.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  children: PropTypes.node,
  position: PropTypes.oneOf(["left", "top", "right", "bottom"]),
  closeOnClick: PropTypes.bool
};
