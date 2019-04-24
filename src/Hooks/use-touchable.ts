/**
 * The state machine used here is based on the one provided
 * in react-native-web:
 *
 * https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/Touchable/index.js
 */

import * as React from "react";
import { noOp } from "../misc/noop";
import { useResponderGrant } from "./use-responder-grant";
import { isHoverEnabled } from "./hover-enabled";

/**
 * useTouchable
 *
 * useTouchable is a hook that attempt to emulate native touch behaviour for things
 * like list items, buttons, etc.
 *
 * const { bind, active } = useTouchable({
 *   onPress: () => console.log('hello'),
 *   disabled: false,
 *   delay: 120
 * })
 *
 */

/**
 * Proposal:
 *
 * Naive implementation of some mechanism that allows us
 * to prevent children from being selected.
 *
 * You can imagine, for example, having a swipable sheet with
 * buttons as children. When you swipe the sheet (like, actually have
 * gesture movement) you should cancel the selection of any buttons.
 *
 * Parent can define a responder for children:
 *
 * <ResponderContext.Provider value={{
 *   responderId: 1,
 *   requestResponderGrant: (id) => {
 *     return swipingLeftOrRight ? false : true
 *   }
 * }}>
 *  {children}
 * </ResponderContext.Provider>
 */

const HIGHLIGHT_DELAY_MS = 100;
const PRESS_EXPAND_PX = 20;

type States =
  | "ERROR"
  | "NOT_RESPONDER"
  | "RESPONDER_ACTIVE_IN"
  | "RESPONDER_ACTIVE_OUT"
  | "RESPONDER_PRESSED_IN"
  | "RESPONDER_PRESSED_OUT";

type Events =
  | "DELAY"
  | "RESPONDER_GRANT"
  | "RESPONDER_RELEASE"
  | "RESPONDER_TERMINATED"
  | "ENTER_PRESS_RECT"
  | "LEAVE_PRESS_RECT";

type TransitionsType = { [key in States]: TransitionType };

type TransitionType = { [key in Events]: States };

const transitions = {
  NOT_RESPONDER: {
    DELAY: "ERROR",
    RESPONDER_GRANT: "RESPONDER_ACTIVE_IN",
    RESPONDER_RELEASE: "ERROR",
    RESPONDER_TERMINATED: "NOT_RESPONDER",
    ENTER_PRESS_RECT: "ERROR",
    LEAVE_PRESS_RECT: "ERROR"
  },
  RESPONDER_ACTIVE_IN: {
    DELAY: "RESPONDER_PRESSED_IN",
    RESPONDER_GRANT: "ERROR",
    RESPONDER_RELEASE: "NOT_RESPONDER",
    RESPONDER_TERMINATED: "NOT_RESPONDER",
    ENTER_PRESS_RECT: "RESPONDER_ACTIVE_IN",
    LEAVE_PRESS_RECT: "RESPONDER_ACTIVE_OUT"
  },
  RESPONDER_ACTIVE_OUT: {
    DELAY: "RESPONDER_PRESSED_OUT",
    RESPONDER_GRANT: "ERROR",
    RESPONDER_RELEASE: "NOT_RESPONDER",
    RESPONDER_TERMINATED: "NOT_RESPONDER",
    ENTER_PRESS_RECT: "RESPONDER_ACTIVE_IN",
    LEAVE_PRESS_RECT: "RESPONDER_ACTIVE_OUT"
  },
  RESPONDER_PRESSED_IN: {
    DELAY: "ERROR",
    RESPONDER_GRANT: "ERROR",
    RESPONDER_RELEASE: "NOT_RESPONDER",
    RESPONDER_TERMINATED: "NOT_RESPONDER",
    ENTER_PRESS_RECT: "RESPONDER_PRESSED_IN",
    LEAVE_PRESS_RECT: "RESPONDER_PRESSED_OUT"
  },
  RESPONDER_PRESSED_OUT: {
    DELAY: "ERROR",
    RESPONDER_GRANT: "ERROR",
    RESPONDER_RELEASE: "NOT_RESPONDER",
    RESPONDER_TERMINATED: "NOT_RESPONDER",
    ENTER_PRESS_RECT: "RESPONDER_PRESSED_IN",
    LEAVE_PRESS_RECT: "RESPONDER_PRESSED_OUT"
  },
  ERROR: {
    DELAY: "NOT_RESPONDER",
    RESPONDER_GRANT: "RESPONDER_ACTIVE_IN",
    RESPONDER_RELEASE: "NOT_RESPONDER",
    RESPONDER_TERMINATED: "NOT_RESPONDER",
    ENTER_PRESS_RECT: "NOT_RESPONDER",
    LEAVE_PRESS_RECT: "NOT_RESPONDER"
  }
} as TransitionsType;

export type OnPressFunction = (
  e?: React.TouchEvent | React.MouseEvent | React.KeyboardEvent
) => void;

function reducer(state: States, action: Events) {
  const nextState = transitions[state][action];
  console.log(`${state} -> ${action} -> ${nextState}`);
  return nextState;
}

export interface TouchableOptions {
  delay: number;
  pressExpandPx: number;
  behavior: "button" | "link";
  disabled: boolean;
  onPress: OnPressFunction;
}

const defaultOptions: TouchableOptions = {
  delay: HIGHLIGHT_DELAY_MS,
  pressExpandPx: PRESS_EXPAND_PX,
  behavior: "button",
  disabled: false,
  onPress: noOp
};

export function useTouchable(options: Partial<TouchableOptions> = {}) {
  const { disabled: contextDisabled } = useResponderGrant();
  const { onPress, delay, behavior, disabled: localDisabled } = {
    ...defaultOptions,
    ...options
  };
  const disabled = contextDisabled || localDisabled;
  const ref = React.useRef<HTMLAnchorElement | HTMLDivElement | any>(null);
  const [state, dispatch] = React.useReducer(reducer, "NOT_RESPONDER");
  const delayTimer = React.useRef<number>();
  const bounds = React.useRef<ClientRect>();
  const [hover, setHover] = React.useState(false);
  const [showHover, setShowHover] = React.useState(true);
  const isTouch = React.useRef(false);

  function emitPress(
    e: React.TouchEvent | React.MouseEvent | React.KeyboardEvent
  ) {
    if (!disabled) {
      onPress(e);
    }
  }

  function bindScroll() {
    console.log("bind scroll");
    document.addEventListener("scroll", onScroll, false);
  }

  function unbindScroll() {
    console.log("unbind scroll");
    document.removeEventListener("scroll", onScroll, false);
  }

  function afterDelay() {
    dispatch("DELAY");
  }

  /**
   * Get our initial bounding box clientRect and set any delay
   * timers if necessary.
   * @param delayPressMs
   */

  function onStart(delayPressMs = delay) {
    dispatch("RESPONDER_GRANT");
    bounds.current = ref.current!.getBoundingClientRect();
    delayTimer.current =
      delayPressMs > 0
        ? window.setTimeout(afterDelay, delayPressMs)
        : undefined;
    if (delayPressMs === 0) {
      dispatch("DELAY");
    } else {
      bindScroll();
    }

    setShowHover(false);
  }

  function onTouchStart(e: React.TouchEvent) {
    console.log("touch start");
    onStart();
  }

  function onEnd(e: React.TouchEvent | React.MouseEvent | React.KeyboardEvent) {
    // consider unbinding the end event instead
    if (state === "NOT_RESPONDER") {
      return;
    }

    if (state === "RESPONDER_ACTIVE_IN" || state === "RESPONDER_PRESSED_IN") {
      emitPress(e);
    }

    dispatch("RESPONDER_RELEASE");
    setShowHover(true);
    unbindScroll();
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (e.cancelable) {
      e.preventDefault();
    }
    isTouch.current = true;
    onEnd(e);
  }

  function isWithinActiveBounds(
    clientX: number,
    clientY: number,
    rect: ClientRect,
    expandPx: number = PRESS_EXPAND_PX
  ) {
    return (
      clientX > rect.left - expandPx &&
      clientY > rect.top - expandPx &&
      clientX < rect.right + expandPx &&
      clientY < rect.bottom + expandPx
    );
  }

  /**
   * Determine if the touch remains in the active bounds
   * @param e
   */

  function onTouchMove(e: React.TouchEvent) {
    if (state === "NOT_RESPONDER" || state === "ERROR") {
      return;
    }

    const { clientX, clientY } = e.nativeEvent.touches[0];
    const withinBounds = isWithinActiveBounds(
      clientX,
      clientY,
      bounds.current!
    );
    if (withinBounds) {
      dispatch("ENTER_PRESS_RECT");
    } else {
      dispatch("LEAVE_PRESS_RECT");
    }
  }

  /**
   * Use an activePressDelay of 0 for mouse feedback
   * @param e
   */

  function onMouseDown(e: React.MouseEvent) {
    if (!isTouch.current) {
      onStart(0);
    }
  }

  /**
   * onMouseUp will simulate click
   */

  function onMouseUp(e: React.MouseEvent) {
    if (!isTouch.current) {
      onEnd(e);
    }
    isTouch.current = false;
  }

  /**
   * Measure if the mouse remains in the active bounds.
   * This should only be bound on mouse down
   * @param e
   */

  function onMouseLeave() {
    if (hover) {
      setHover(false);
    }
    if (!showHover) {
      setShowHover(true);
    }
    if (state !== "NOT_RESPONDER") {
      dispatch("RESPONDER_TERMINATED");
    }
  }

  function onMouseEnter() {
    if (!hover) {
      setHover(true);
    }
  }

  /**
   * Scrolling cancels all responder events. This enables
   * the user to scroll without selecting something
   */

  function onScroll() {
    console.log("on scroll");
    unbindScroll();
    dispatch("RESPONDER_TERMINATED");
  }

  /**
   * Handle timer and disabled side-effects
   */

  React.useEffect(() => {
    if (state === "NOT_RESPONDER") {
      clearTimeout(delayTimer.current);
    }
  }, [state]);

  React.useEffect(() => {
    return () => {
      clearTimeout(delayTimer.current);
      unbindScroll();
    };
  }, []);

  React.useEffect(() => {
    if (disabled && state !== "NOT_RESPONDER") {
      dispatch("RESPONDER_TERMINATED");
      setShowHover(true);
    }
  }, [disabled]);

  /**
   * Keyboard support
   * button:
   *   onEnterDown -> onPress
   *   onSpaceUp -> onPress
   * Prevent default.
   *
   * link: Don't prevent default
   */

  function onKey(e: React.KeyboardEvent) {
    const ENTER = 13;
    const SPACE = 32;

    if (e.type === "keydown" && e.which === SPACE) {
      onStart(0);
    } else if (e.type === "keydown" && e.which === ENTER) {
      emitPress(e);
    } else if (e.type === "keyup" && e.which === SPACE) {
      onEnd(e);
    } else {
      return;
    }

    e.stopPropagation();

    if (!(e.which === ENTER && behavior === "link")) {
      e.preventDefault();
    }
  }

  const bind = {
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
    onKeyDown: onKey,
    onKeyUp: onKey
  };

  return {
    bind: {
      ref,
      ...bind
    },
    active: !disabled && state === "RESPONDER_PRESSED_IN",
    hover: isHoverEnabled() && !disabled && hover && showHover
  };
}
