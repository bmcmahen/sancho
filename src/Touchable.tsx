/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { useTouchable, OnPressFunction } from "touchable-hook";
import cx from "classnames";
import { safeBind } from "./Hooks/compose-bind";

/**
 * Touchable is a low level component which implements
 * the useTouchable hook. It provides consistent hover and
 * active styles on desktop and mobile devices.
 */

export interface TouchableProps {
  onPress?: OnPressFunction;
  disabled?: boolean;
  /** By default, a touchable element will only highlight after a short
   * delay to prevent unintended highlights when scrolling. This will
   * only effect touch devices. */
  delay?: number;
  /**
   * By default, a touchable element will have an expanded press area of 20px
   * on touch devices. This will only effect touch devices.
   */
  pressExpandPx?: number;
  /** Whether active presses should be terminated when scrolling occurs. Typically this should be true. */
  terminateOnScroll?: boolean;
  component?: React.ReactType<any>;
  [key: string]: any; // lame hack to allow component injection
}

export const Touchable: React.RefForwardingComponent<
  React.Ref<any>,
  TouchableProps
> = React.forwardRef(
  (
    {
      children,
      className = "",
      delay,
      pressExpandPx,
      terminateOnScroll = true,
      component: Component = "button",
      onPress,
      disabled = false,
      ...other
    }: TouchableProps,
    ref: React.Ref<any>
  ) => {
    const isLink = other.to || other.href;
    const { bind, hover, active } = useTouchable({
      onPress,
      disabled,
      delay,
      terminateOnScroll,
      pressExpandPx,
      behavior: isLink ? "link" : "button"
    });

    return (
      <Component
        className={cx("Touchable", className, {
          "Touchable--hover": hover,
          "Touchable--active": active
        })}
        {...safeBind({ ref }, bind, other)}
      >
        {children}
      </Component>
    );
  }
);
