/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import {
  Manager,
  Reference,
  Popper,
  ReferenceChildrenProps,
  PopperChildrenProps
} from "react-popper";
import { Portal } from "./Portal";
import { useTransition, AnimatedValue } from "react-spring";

export type Placements =
  | "auto-start"
  | "auto"
  | "auto-end"
  | "top-start"
  | "top"
  | "top-end"
  | "right-start"
  | "right"
  | "right-end"
  | "bottom-end"
  | "bottom"
  | "bottom-start"
  | "left-end"
  | "left"
  | "left-start";

interface PositionsProps {
  placement?: Placements;
  show?: boolean;
  positionFixed?: boolean;
  duration?: number;
  target: (props: ReferenceChildrenProps) => React.ReactNode;
  children: (
    props: PopperChildrenProps,
    state: AnimatedValue<any>
  ) => React.ReactNode;
}

export const Positioner = ({
  target,
  positionFixed,
  show = true,
  children,
  placement
}: PositionsProps) => {
  const transitions = useTransition(show, null, {
    from: { opacity: 0, transform: "scale(0.9)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.9)" }
  });

  return (
    <Manager>
      <Reference>{target}</Reference>
      {transitions.map(
        ({ item, key, props: animatedProps }) =>
          item && (
            <Portal key={key}>
              <Popper placement={placement} positionFixed={positionFixed}>
                {props => children(props, animatedProps)}
              </Popper>
            </Portal>
          )
      )}
    </Manager>
  );
};
