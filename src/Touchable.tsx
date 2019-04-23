/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";

/**
 * events:
 *
 * - when a touch was activated (active state)
 * - when a touch was deactivated (disable active state)
 * - when a touch was pressed - a touch ended while within the geometry
 *   of the element, and no other element has "stolen" the toch (like a scroll)
 *
 * - a slight delay before shwoing a highlight.
 * - if a touch leaves boundary, it should unhighlight, but rehighlight if brought back
 * - a press is only triggered if that touch ends within the element's boundary
 *
 *
 */

// const HIGHLIGHT_DELAY_MS = 130;
// const PRESS_EXPAND_PX = 20;

/*
 * ========== Geometry =========
 * `Touchable` only assumes that there exists a `HitRect` node. The `PressRect`
 * is an abstract box that is extended beyond the `HitRect`.
 *
 *  +--------------------------+
 *  |                          | - "Start" events in `HitRect` cause `HitRect`
 *  |  +--------------------+  |   to become the responder.
 *  |  |  +--------------+  |  | - `HitRect` is typically expanded around
 *  |  |  |              |  |  |   the `VisualRect`, but shifted downward.
 *  |  |  |  VisualRect  |  |  | - After pressing down, after some delay,
 *  |  |  |              |  |  |   and before letting up, the Visual React
 *  |  |  +--------------+  |  |   will become "active". This makes it eligible
 *  |  |     HitRect        |  |   for being highlighted (so long as the
 *  |  +--------------------+  |   press remains in the `PressRect`).
 *  |        PressRect     o   |
 *  +----------------------|---+
 *           Out Region    |
 *                         +-----+ This gap between the `HitRect` and
 *                                 `PressRect` allows a touch to move far away
 *                                 from the original hit rect, and remain
 *                                 highlighted, and eligible for a "Press".
 *                                 Customize this via
 *                                 `touchableGetPressRectOffset()`.
 */

/**
 * ======= State Machine =======
 *
 * +-------------+ <---+ RESPONDER_RELEASE
 * |NOT_RESPONDER|
 * +-------------+ <---+ RESPONDER_TERMINATED
 *     +
 *     | RESPONDER_GRANT (HitRect)
 *     v
 * +---------------------------+  DELAY   +-------------------------+  
 * |RESPONDER_INACTIVE_PRESS_IN|+-------->|RESPONDER_ACTIVE_PRESS_IN| 
 * +---------------------------+          +-------------------------+ 
 *     +            ^                         +           ^           
 *     |LEAVE_      |ENTER_                   |LEAVE_     |ENTER_     
 *     |PRESS_RECT  |PRESS_RECT               |PRESS_RECT |PRESS_RECT 
 *     |            |                         |           |           
 *     v            +                         v           +           
 * +----------------------------+  DELAY  +--------------------------+
 * |RESPONDER_INACTIVE_PRESS_OUT|+------->|RESPONDER_ACTIVE_PRESS_OUT|
 * +----------------------------+         +--------------------------+

 */

// bind events
//

// const States = {
//   NOT_RESPONDER: "NOT_RESPONDER", // Not the responder
//   RESPONDER_INACTIVE_PRESS_IN: "RESPONDER_INACTIVE_PRESS_IN", // Responder, inactive, in the `PressRect`
//   RESPONDER_INACTIVE_PRESS_OUT: "RESPONDER_INACTIVE_PRESS_OUT", // Responder, inactive, out of `PressRect`
//   RESPONDER_ACTIVE_PRESS_IN: "RESPONDER_ACTIVE_PRESS_IN", // Responder, active, in the `PressRect`
//   RESPONDER_ACTIVE_PRESS_OUT: "RESPONDER_ACTIVE_PRESS_OUT", // Responder, active, out of `PressRect`
//   ERROR: "ERROR"
// };

// const IsActive = {
//   RESPONDER_ACTIVE_PRESS_OUT: true,
//   RESPONDER_ACTIVE_PRESS_IN: true
// };

// const IsPressingIn = {
//   RESPONDER_INACTIVE_PRESS_IN: true,
//   RESPONDER_ACTIVE_PRESS_IN: true
// };

// const Signals = {
//   DELAY: "DELAY",
//   RESPONDER_GRANT: "RESPONDER_GRANT",
//   RESPONDER_RELEASE: "RESPONDER_RELEASE",
//   RESPONDER_TERMINATED: "RESPONDER_TERMINATED",
//   ENTER_PRESS_RECT: "ENTER_PRESS_RECT",
//   LEAVE_PRESS_RECT: "LEAVE_PRESS_RECT"
// };

// const Transitions = {
//   NOT_RESPONDER: {
//     DELAY: States.ERROR,
//     RESPONDER_GRANT: States.RESPONDER_INACTIVE_PRESS_IN,
//     RESPONDER_RELEASE: States.ERROR,
//     RESPONDER_TERMINATED: States.ERROR,
//     ENTER_PRESS_RECT: States.ERROR,
//     LEAVE_PRESS_RECT: States.ERROR,
//     LONG_PRESS_DETECTED: States.ERROR
//   },
//   RESPONDER_INACTIVE_PRESS_IN: {
//     DELAY: States.RESPONDER_ACTIVE_PRESS_IN,
//     RESPONDER_GRANT: States.ERROR,
//     RESPONDER_RELEASE: States.NOT_RESPONDER,
//     RESPONDER_TERMINATED: States.NOT_RESPONDER,
//     ENTER_PRESS_RECT: States.RESPONDER_INACTIVE_PRESS_IN,
//     LEAVE_PRESS_RECT: States.RESPONDER_INACTIVE_PRESS_OUT,
//     LONG_PRESS_DETECTED: States.ERROR
//   },
//   RESPONDER_INACTIVE_PRESS_OUT: {
//     DELAY: States.RESPONDER_ACTIVE_PRESS_OUT,
//     RESPONDER_GRANT: States.ERROR,
//     RESPONDER_RELEASE: States.NOT_RESPONDER,
//     RESPONDER_TERMINATED: States.NOT_RESPONDER,
//     ENTER_PRESS_RECT: States.RESPONDER_INACTIVE_PRESS_IN,
//     LEAVE_PRESS_RECT: States.RESPONDER_INACTIVE_PRESS_OUT,
//     LONG_PRESS_DETECTED: States.ERROR
//   },
//   RESPONDER_ACTIVE_PRESS_IN: {
//     DELAY: States.ERROR,
//     RESPONDER_GRANT: States.ERROR,
//     RESPONDER_RELEASE: States.NOT_RESPONDER,
//     RESPONDER_TERMINATED: States.NOT_RESPONDER,
//     ENTER_PRESS_RECT: States.RESPONDER_ACTIVE_PRESS_IN,
//     LEAVE_PRESS_RECT: States.RESPONDER_ACTIVE_PRESS_OUT
//   },
//   RESPONDER_ACTIVE_PRESS_OUT: {
//     DELAY: States.ERROR,
//     RESPONDER_GRANT: States.ERROR,
//     RESPONDER_RELEASE: States.NOT_RESPONDER,
//     RESPONDER_TERMINATED: States.NOT_RESPONDER,
//     ENTER_PRESS_RECT: States.RESPONDER_ACTIVE_PRESS_IN,
//     LEAVE_PRESS_RECT: States.RESPONDER_ACTIVE_PRESS_OUT,
//     LONG_PRESS_DETECTED: States.ERROR
//   },
//   RESPONDER_ACTIVE_LONG_PRESS_IN: {
//     DELAY: States.ERROR,
//     RESPONDER_GRANT: States.ERROR,
//     RESPONDER_RELEASE: States.NOT_RESPONDER,
//     RESPONDER_TERMINATED: States.NOT_RESPONDER
//   },
//   RESPONDER_ACTIVE_LONG_PRESS_OUT: {
//     DELAY: States.ERROR,
//     RESPONDER_GRANT: States.ERROR,
//     RESPONDER_RELEASE: States.NOT_RESPONDER,
//     RESPONDER_TERMINATED: States.NOT_RESPONDER,
//     LONG_PRESS_DETECTED: States.ERROR
//   },
//   error: {
//     DELAY: States.NOT_RESPONDER,
//     RESPONDER_GRANT: States.RESPONDER_INACTIVE_PRESS_IN,
//     RESPONDER_RELEASE: States.NOT_RESPONDER,
//     RESPONDER_TERMINATED: States.NOT_RESPONDER,
//     ENTER_PRESS_RECT: States.NOT_RESPONDER,
//     LEAVE_PRESS_RECT: States.NOT_RESPONDER,
//     LONG_PRESS_DETECTED: States.NOT_RESPONDER
//   }
// };

// maybe only bind this event once RESPONDER_INACTIVE_PRESS_IN
// window.addEventListener('scroll', function(){ code goes here }, true)
// then use it to cancel any active presses.

// we'd need to emit other events to indicate to children (using context?)
// to cancel. Say, we are triggeing a gesturre on the sheet. In that case,
// we want to emit to our children to cancel.

// Ion does something similar here except they use some custtom event?
// https://github.com/ionic-team/ionic/blob/2b4d7b7be917cf943f3e7957aa35dd953dbf952c/core/src/utils/tap-click.ts

interface Props {
  children: React.ReactNode;
}

// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role

// THREE MAIN STATES

// isActive (press down)
// isTouchResponder (cancelled via scroll)
// isVisuallyPressed (after delay, press is within container)

// onPress?
// onTouchEnd -> isTouchResponder && released within container

export function Touchable({ children }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const timer = React.useRef<number>();
  const [active, setActive] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const bounds = React.useRef<ClientRect>();

  function onScroll() {
    setActive(false);
    setPressed(false);
    clearTimeout(timer.current);
    unbindScroll();
  }

  function unbindScroll() {
    window.removeEventListener("scroll", onScroll, true);
  }

  function afterDelay() {
    setPressed(true);
  }
  function onMouseDown(e: React.MouseEvent) {
    console.log("touch start");
    onTouchStart(e, 0);
  }

  function onTouchStart(e: React.TouchEvent | React.MouseEvent, delay = 120) {
    console.log("touch start");

    timer.current =
      delay > 0 ? window.setTimeout(afterDelay, delay) : undefined;
    setActive(true);
    if (delay === 0) {
      setPressed(true);
    }
    const el = ref.current;
    if (el) {
      bounds.current = el.getBoundingClientRect();
    }
    window.addEventListener("scroll", onScroll, true);
  }

  function onTouchEnd(e: React.TouchEvent | React.MouseEvent) {
    if (e.cancelable) {
      e.preventDefault(); // necessary to prevent mouse events
    }
    clearTimeout(timer.current);
    unbindScroll();

    // if not cancelled (by scroll, or another responder)
    // If released within hitzone
    if (active) {
      console.log("press");
    }

    setActive(false);
    setPressed(false);
  }

  function onTouchMove(e: React.TouchEvent) {
    console.log("move", active);
    if (!active) {
      return;
    }

    const { clientX, clientY } = e.nativeEvent.touches[0];
    const b = bounds.current!;

    const isTouchWithinActive =
      clientX > b.left &&
      clientY > b.top &&
      clientX < b.right &&
      clientY < b.bottom;

    if (!isTouchWithinActive) {
      setPressed(false);
    } else {
      setPressed(true);
    }
  }

  return (
    <div
      ref={ref}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onMouseDown={onMouseDown}
      // onMouseMove={active ? onMouseLeave : undefined}
      onMouseUp={onTouchEnd}
      css={{
        height: "40px",
        width: "100%",
        background: pressed ? "#08e" : "white"
      }}
    >
      {children}
    </div>
  );
}
