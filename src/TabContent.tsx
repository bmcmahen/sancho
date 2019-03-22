/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import {
  OnChangeIndexCallback,
  AxisType,
  OnSwitchingCallback,
  OnTransitionEndCallback,
  SpringConfig
} from "react-swipeable-views";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";

interface TabContentProps {
  children: React.ReactNode;
  /** The callback for controlling which tab is being viewed */
  onChange: OnChangeIndexCallback;
  /** The index of the visible view */
  value: number;
  animateHeight?: boolean;
  animateTransitions?: boolean;
  axis?: AxisType;
  containerStyle?: React.CSSProperties;
  disabled?: boolean;
  enableMouseEvents?: boolean;
  hysteresis?: number;
  ignoreNativeScroll?: boolean;
  onSwitching?: OnSwitchingCallback;
  onTransitionEnd?: OnTransitionEndCallback;
  resistance?: boolean;
  style?: React.CSSProperties;
  slideStyle?: React.CSSProperties;
  springConfig?: SpringConfig;
  slideClassName?: string;
  threshold?: number;
}

export const TabContent: React.FunctionComponent<TabContentProps> = ({
  value,
  onChange,
  children,
  ...other
}) => {
  return (
    <SwipeableViews index={value} onChangeIndex={onChange} {...other}>
      {children}
    </SwipeableViews>
  );
};

TabContent.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  children: PropTypes.node
};
