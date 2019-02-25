/** @jsx jsx */
import { jsx, css, SerializedStyles } from "@emotion/core";
import * as React from "react";
import { useTransition, animated, useSpring, interpolate } from "react-spring";
import theme from "./Theme";
import { useFocusElement } from "./Hooks/focus";
import { Overlay } from "./Overlay";
import { useCloseOnClick } from "./Hooks/useCloseOnClick";
import { useGesture } from "react-with-gesture";

function getTransitionForPosition(position: SheetPositions) {
  switch (position) {
    case "left":
      return {
        from: { transform: `translate3d(-100%, 0, 0)` },
        enter: { transform: `translate3d(0, 0, 0)` },
        leave: { transform: `translate3d(-100%, 0, 0)` }
      };
    case "right":
      return {
        from: { transform: `translate3d(100%, 0, 0)` },
        enter: { transform: `translate3d(0, 0, 0)` },
        leave: { transform: `translate3d(100%, 0, 0)` }
      };
    case "top":
      return {
        from: { transform: `translateY(-100%)` },
        enter: { transform: `translateY(0)` },
        leave: { transform: `translateY(-100%)` }
      };
    case "bottom":
      return {
        from: { transform: `translateY(100%)` },
        enter: { transform: `translateY(0)` },
        leave: { transform: `translateY(100%)` }
      };
  }
}

const positions = {
  left: css({
    top: 0,
    left: 0,
    bottom: 0,
    width: "auto",
    maxWidth: "100vw",
    [theme.breakpoints.md]: {
      maxWidth: "400px"
    }
  }),
  right: css({
    top: 0,
    right: 0,
    bottom: 0,
    width: "auto",
    maxWidth: "100vw",
    [theme.breakpoints.md]: {
      maxWidth: "400px"
    }
  }),
  bottom: css({
    bottom: 0,
    left: 0,
    right: 0,
    height: "auto",
    width: "100%",
    [theme.breakpoints.md]: {
      maxHeight: "400px"
    }
  }),
  top: css({
    top: 0,
    left: 0,
    right: 0,
    height: "auto",
    width: "100%",
    [theme.breakpoints.md]: {
      maxHeight: "400px"
    }
  })
};

export type SheetPositions = keyof typeof positions;

interface SheetProps {
  isOpen: boolean;
  onRequestClose: () => void;
  role?: string;
  children: React.ReactNode;
  position: SheetPositions;
  closeOnClick?: boolean;
  classes?: {
    sheet?: any;
  };
}

export function Sheet({
  isOpen,
  classes = {},
  children,
  role = "document",
  closeOnClick = true,
  position = "right",
  onRequestClose,
  ...other
}: SheetProps) {
  // const removeRef = React.useRef(false);
  // const downRef = React.useRef(false);
  // const horizontal = position === "left" || position === "right";
  // const ref = React.useRef<HTMLDivElement>(null);
  const { bind: bindFocus } = useFocusElement(isOpen);
  const { bind: bindClose } = useCloseOnClick(
    closeOnClick && isOpen,
    onRequestClose
  );

  // const [{ xy }, set] = useSpring(() => ({
  //   xy: [0, 0],
  //   onRest: x => {
  //     console.log(x);
  //     if (removeRef.current) {
  //       removeRef.current = false;
  //       onRequestClose();
  //     }
  //   }
  // })) as any;

  // function closeDirection(p: SheetPositions, dir: number) {
  //   switch (p) {
  //     case "left":
  //       return dir < 0;
  //     case "right":
  //       return dir > 0;
  //     default:
  //       return false;
  //   }
  // }

  const transitions = useTransition(
    isOpen,
    null,
    getTransitionForPosition(position)
  );

  // const bindGesture = useGesture(
  //   ({ direction: [xDir], down, delta, local, distance, target, velocity }) => {
  //     const dir = xDir < 0 ? -1 : 1;
  //     const trigger = !down && closeDirection(position, xDir) && velocity > 0.2;
  //     const { width, height } = ref.current!.getBoundingClientRect();
  //     const halfClosed =
  //       !down && closeDirection(position, xDir) && distance > width / 2;
  //     const shouldClose = halfClosed || trigger;

  //     const x = shouldClose ? width * dir : 0;
  //     const y = shouldClose ? height * dir : 0;

  //     if (shouldClose) {
  //       // close
  //       removeRef.current = true;
  //     }

  //     set({ immediate: down, xy: down ? delta : [x, y] } as any);
  //   }
  // );

  // function clampX(x: number) {
  //   if (position === "left" && x > 0) return 0;
  //   if (position === "right" && x < 0) return 0;
  //   return x;
  // }

  return (
    <React.Fragment>
      <Overlay isOpen={isOpen} onRequestClose={onRequestClose} {...bindFocus}>
        <React.Fragment>
          {transitions.map(({ item, key, props: animationProps, ...other }) => {
            return (
              item && (
                <animated.div
                  key={key}
                  role={role}
                  tabIndex={-1}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                  style={{
                    transform:
                      // downRef.current || removeRef.current
                      // xy.interpolate(
                      //   (x: number, y: number) =>
                      //     `translate3d(${horizontal ? clampX(x) : 0}px,${
                      //       horizontal ? 0 : y
                      //     }px,0)`
                      // )
                      animationProps.transform
                  }}
                  css={[
                    {
                      outline: "none",
                      zIndex: 41,
                      overflowY: "auto",
                      WebkitOverflowScrolling: "touch",
                      opacity: 1,
                      position: "fixed",
                      background: "white"
                    },
                    positions[position]
                  ]}
                  {...bindClose}
                  // {...bindGesture()}
                  {...classes.sheet}
                  // ref={ref}
                  {...other}
                >
                  {children}
                </animated.div>
              )
            );
          })}
        </React.Fragment>
      </Overlay>
    </React.Fragment>
  );
}
