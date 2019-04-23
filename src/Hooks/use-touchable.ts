/**
 * The state machine used here is based on the one provided
 * in react-native-web:
 *
 * https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/Touchable/index.js
 */

import * as React from "react";

/**
 * useTouchable
 *
 * useTouchable is a hook that attempt to emulate native touch behaviour for things
 * like list items, buttons, etc.
 *
 * const { bind, active } = useTouchable(onPress, disabled, {
 *   delay: 120
 * })
 *
 * TODO: keyboard support, hover, focus?
 */

const HIGHLIGHT_DELAY_MS = 130;
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

type OnPressFunction = (
  e: React.TouchEvent | React.MouseEvent | React.KeyboardEvent
) => void;

function reducer(state: States, action: Events) {
  return transitions[state][action];
}

const defaultOptions = {
  delay: HIGHLIGHT_DELAY_MS,
  pressExpandPx: PRESS_EXPAND_PX,
  behavior: "button"
};

export function useTouchable(
  onPress: OnPressFunction,
  disabled: boolean = false,
  options = {}
) {
  const { delay, behavior } = { ...options, ...defaultOptions };
  const ref = React.useRef<HTMLDivElement>(null);
  const [state, dispatch] = React.useReducer(reducer, "NOT_RESPONDER");
  const delayTimer = React.useRef<number>();
  const bounds = React.useRef<ClientRect>();
  const [hover, setHover] = React.useState(false);

  function bindScroll() {
    window.addEventListener("scroll", onScroll, true);
  }

  function unbindScroll() {
    window.removeEventListener("scroll", onScroll, true);
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
  }

  function onTouchStart() {
    onStart();
  }

  function onEnd(e: React.TouchEvent | React.MouseEvent) {
    // consider unbinding the end event instead
    if (state === "NOT_RESPONDER") {
      return;
    }

    if (state === "RESPONDER_ACTIVE_IN" || state === "RESPONDER_PRESSED_IN") {
      onPress(e);
    }

    dispatch("RESPONDER_RELEASE");
    unbindScroll();
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (e.cancelable) {
      e.preventDefault();
    }

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
    onStart(0);
  }

  /**
   * onMouseUp will simulate click
   */

  function onMouseUp(e: React.MouseEvent) {
    onEnd(e);
  }

  /**
   * Measure if the mouse remains in the active bounds.
   * This should only be bound on mouse down
   * @param e
   */

  function onMouseLeave(e: React.MouseEvent) {
    if (state !== "NOT_RESPONDER") {
      dispatch("RESPONDER_TERMINATED");
    }
    setHover(false);
  }

  function onMouseEnter() {
    setHover(true);
  }

  /**
   * Scrolling cancels all responder events. This enables
   * the user to scroll without selecting something
   */

  function onScroll() {
    unbindScroll();
    dispatch("RESPONDER_TERMINATED");
  }

  /**
   * Handle timer and scroll sideeffects
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

    if (e.type === "keydown" && e.which === ENTER) {
      onPress(e);
    } else if (e.type === "keyup" && e.which === SPACE) {
      onPress(e);
    }

    e.stopPropagation();

    if (!(e.key === "Enter" && behavior === "link")) {
      e.preventDefault();
    }
  }

  const bind = disabled
    ? {}
    : {
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
    active: state === "RESPONDER_PRESSED_IN",
    hover
  };
}
