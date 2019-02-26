// This is buggy as shit. I think there's some interpolation bug
// with react-spring which is currently preventing this from working correctly.
// /** @jsx jsx */
// import { jsx, css, SerializedStyles } from "@emotion/core";
// import * as React from "react";
// import { useTransition, animated, useSpring, interpolate } from "react-spring";
// import theme from "./Theme";
// import { useFocusElement } from "./Hooks/focus";
// import { Overlay } from "./Overlay";
// import { useCloseOnClick } from "./Hooks/useCloseOnClick";
// import { useGesture } from "react-with-gesture";
// import { usePrevious } from "./Hooks/previous";

// const transitionPositions = {
//   left: {
//     from: { transform: `translate3d(-100%, 0, 0)` },
//     enter: { transform: `translate3d(0, 0, 0)` },
//     leave: { transform: `translate3d(-100%, 0, 0)` }
//   },
//   right: {
//     from: { transform: `translate3d(100%, 0, 0)` },
//     enter: { transform: `translate3d(0, 0, 0)` },
//     leave: { transform: `translate3d(100%, 0, 0)` }
//   },
//   top: {
//     from: { transform: `translateY(-100%)` },
//     enter: { transform: `translateY(0)` },
//     leave: { transform: `translateY(-100%)` }
//   },
//   bottom: {
//     from: { transform: `translateY(100%)` },
//     enter: { transform: `translateY(0)` },
//     leave: { transform: `translateY(100%)` }
//   }
// };

// const positions = {
//   left: css({
//     top: 0,
//     left: 0,
//     bottom: 0,
//     width: "auto",
//     maxWidth: "100vw",
//     [theme.breakpoints.md]: {
//       maxWidth: "400px"
//     }
//   }),
//   right: css({
//     top: 0,
//     right: 0,
//     bottom: 0,
//     width: "auto",
//     maxWidth: "100vw",
//     [theme.breakpoints.md]: {
//       maxWidth: "400px"
//     }
//   }),
//   bottom: css({
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: "auto",
//     width: "100%",
//     [theme.breakpoints.md]: {
//       maxHeight: "400px"
//     }
//   }),
//   top: css({
//     top: 0,
//     left: 0,
//     right: 0,
//     height: "auto",
//     width: "100%",
//     [theme.breakpoints.md]: {
//       maxHeight: "400px"
//     }
//   })
// };

// export type SheetPositions = keyof typeof positions;

// interface SheetProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   role?: string;
//   children: React.ReactNode;
//   position: SheetPositions;
//   closeOnClick?: boolean;
//   classes?: {
//     sheet?: any;
//   };
// }

// export function Sheet({
//   isOpen,
//   classes = {},
//   children,
//   role = "document",
//   closeOnClick = true,
//   position = "right",
//   onRequestClose,
//   ...other
// }: SheetProps) {
//   const horizontal = position === "left" || position === "right";
//   const ref = React.useRef<HTMLDivElement>(null);

//   const { bind: bindFocus } = useFocusElement(isOpen);
//   const { bind: bindClose } = useCloseOnClick(
//     closeOnClick && isOpen,
//     onRequestClose
//   );

//   const [{ transform }, set] = useSpring(() => ({
//     transform: transitionPositions[position].from.transform
//   }));

//   function closeDirection(p: SheetPositions, xDir: number, yDir: number) {
//     switch (p) {
//       case "left":
//         return xDir < 0;
//       case "right":
//         return xDir > 0;
//       case "top":
//         return yDir < 0;
//       case "bottom":
//         return yDir > 0;
//     }
//   }

//   function isHalfClosed(p: SheetPositions, x: number, y: number) {
//     switch (p) {
//       case "left":
//         return Math.abs(x) > 50;
//       case "right":
//         return Math.abs(x) < 50;
//       case "top":
//         return Math.abs(y) > 50;
//       case "bottom":
//         return Math.abs(y) < 50;
//     }
//   }

//   const bindGesture = useGesture(
//     ({
//       direction: [xDir, yDir],
//       down,
//       delta,
//       local,
//       distance,
//       target,
//       velocity
//     }) => {
//       const swipeCloseTriggered =
//         !down && closeDirection(position, xDir, yDir) && velocity > 0.2;
//       const { width, height } = ref.current!.getBoundingClientRect();
//       const xper = (delta[0] / width) * 100;
//       const yper = (delta[1] / height) * 100;
//       const releasedOverHalfClosed =
//         !down && isHalfClosed(position, xper, yper);
//       const shouldClose = releasedOverHalfClosed || swipeCloseTriggered;

//       if (shouldClose) {
//         return onRequestClose();
//       }

//       set({
//         immediate: down,
//         transform: down
//           ? `translate3d(${clamp(position, xper)}%, ${clamp(
//               position,
//               yper
//             )}%, 0)`
//           : `translate3d(0,0,0)`
//       });
//     }
//   );

//   function clamp(position: SheetPositions, x: number) {
//     if (position === "left" && x > 0) return 0;
//     if (position === "right" && x < 0) return 0;
//     if (position === "top" && x > 0) return 0;
//     if (position === "bottom" && x < 0) return 0;
//     return x;
//   }

//   React.useEffect(() => {
//     if (isOpen) {
//       console.log("set open");
//       set({
//         transform: transitionPositions[position].enter.transform,
//         immediate: false
//       });
//     } else {
//       console.log("set close");
//       set({
//         transform: transitionPositions[position].from.transform,
//         immediate: false
//       });
//     }
//   }, [position, isOpen]);

//   return (
//     <React.Fragment>
//       <Overlay isOpen={isOpen} onRequestClose={onRequestClose} {...bindFocus}>
//         <React.Fragment>
//           <animated.div
//             role={role}
//             tabIndex={-1}
//             onClick={e => {
//               e.stopPropagation();
//             }}
//             style={{
//               transform: transform
//             }}
//             css={[
//               {
//                 outline: "none",
//                 zIndex: 41,
//                 overflowY: "auto",
//                 WebkitOverflowScrolling: "touch",
//                 opacity: 1,
//                 position: "fixed",
//                 background: "white"
//               },
//               positions[position]
//             ]}
//             {...bindClose}
//             {...bindGesture()}
//             {...classes.sheet}
//             ref={ref}
//             {...other}
//           >
//             {children}
//           </animated.div>
//           )
//         </React.Fragment>
//       </Overlay>
//     </React.Fragment>
//   );
// }
