/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { OnChangeIndexCallback } from "react-swipeable-views";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";

interface TabContentProps {
  children: React.ReactNode;
  onChange: OnChangeIndexCallback;
  value: number;
}

export const TabContent: React.FunctionComponent<TabContentProps> = ({
  value,
  onChange,
  children
}) => {
  return (
    <SwipeableViews index={value} onChangeIndex={onChange}>
      {children}
    </SwipeableViews>
  );
};

TabContent.propTypes = {
  /** The index of the visible view */
  value: PropTypes.number.isRequired,

  /** The callback for controlling which tab is being viewed */
  onChange: PropTypes.func,

  children: PropTypes.node
};
