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

interface PositionsProps {
  placement?: Placements;
  isOpen?: boolean;
  positionFixed?: boolean;
  target: (props: ReferenceChildrenProps) => React.ReactNode;
  children: (
    props: PopperChildrenProps,
    state: AnimatedValue<any>
  ) => React.ReactNode;
}

export const Positioner: React.FunctionComponent<PositionsProps> = ({
  target,
  positionFixed,
  isOpen = true,
  children,
  placement
}) => {
  const transitions = useTransition(isOpen, null, {
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

Positioner.propTypes = {
  /** Whether the item being positioned is visible */
  isOpen: PropTypes.bool,

  /** The placement of the children */
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

  /** Use fixed positioning */
  positionFixed: PropTypes.bool,

  /** The element our positioner is targetting (eg, Button) */
  target: PropTypes.node,

  /** The render callback which contains positioning and animation info */
  children: PropTypes.func
};
