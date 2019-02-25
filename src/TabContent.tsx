/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { OnChangeIndexCallback } from "react-swipeable-views";
import SwipeableViews from "react-swipeable-views";

interface TabContentProps {
  children: React.ReactNode;
  onChange: OnChangeIndexCallback;
  value: number;
}

export function TabContent({ value, onChange, children }: TabContentProps) {
  return (
    <SwipeableViews index={value} onChangeIndex={onChange}>
      {children}
    </SwipeableViews>
  );
}
