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
import { useTransition } from "react-spring";
import PropTypes from "prop-types";

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

export interface PositionerProps {
  /** Whether the item being positioned is visible */
  isOpen?: boolean;
  /** The placement of children */
  placement?: Placements;
  /** Use fixed positioning */
  positionFixed?: boolean;
  /** The element our positioner is targetting (eg, Button) */
  target: (props: ReferenceChildrenProps) => React.ReactNode;
  /** The render callback which contains positioning and animation info */
  children: (
    props: PopperChildrenProps,
    state: any
  ) => React.ReactNode;
}

export const Positioner: React.FunctionComponent<PositionerProps> = ({
  target,
  positionFixed,
  isOpen = true,
  children,
  placement
}) => {
  const transitions = useTransition(isOpen, null, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { mass: 1, tension: 185, friction: 26 }
  });

  return (
    <Manager>
      <Reference>{target}</Reference>
      {transitions.map(
        ({ item, key, props: animatedProps }) =>
          item && (
            <Portal key={key}>
              <Popper placement={placement} positionFixed={positionFixed}>
                {props => children(props, animatedProps as any)}
              </Popper>
            </Portal>
          )
      )}
    </Manager>
  );
};

Positioner.propTypes = {
  isOpen: PropTypes.bool,
  placement: PropTypes.oneOf([
    "auto-start",
    "auto",
    "auto-end",
    "top-start",
    "top",
    "top-end",
    "right-start",
    "right",
    "right-end",
    "bottom-end",
    "bottom",
    "bottom-start",
    "left-end",
    "left",
    "left-start"
  ] as Placements[]),
  positionFixed: PropTypes.bool,
  target: PropTypes.func,
  children: PropTypes.func
};
