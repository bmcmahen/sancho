import Popper, { PopperOptions } from "popper.js";
import * as React from "react";
import { useCallbackRef } from "./use-callback-ref";

const defaultStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  opacity: 0,
  pointerEvents: "none"
};

export interface PositionerOptions {
  placement?: Popper.Placement;
  positionFixed?: boolean;
  eventsEnabled?: boolean;
  modifiers?: Popper.Modifiers;
}

/**
 * Position an element relative to another
 */

export function usePositioner({
  placement: defaultPlacement = "bottom",
  positionFixed = false,
  eventsEnabled = true,
  modifiers = {}
}: PositionerOptions = {}) {
  const [target, attachTarget] = useCallbackRef();
  const [popover, attachPopover] = useCallbackRef();
  const [arrow, attachArrow] = useCallbackRef();

  // positions
  const [popperStyle, setPopperStyle] = React.useState(defaultStyle as any);
  const [arrowStyle, setArrowStyle] = React.useState({});
  const [placement, setPlacement] = React.useState<Popper.Placement | null>(
    null
  );

  React.useEffect(() => {
    if (!target || !popover) {
      return;
    }

    function updatePopperState(data: Popper.Data) {
      const { styles, arrowStyles, placement: place } = data;
      setPopperStyle(styles);
      setArrowStyle(arrowStyles);
      setPlacement(place);
      return data;
    }

    //  @ts-ignore
    const pop = new Popper(target, popover, {
      placement: defaultPlacement,
      positionFixed,
      eventsEnabled,
      modifiers: {
        ...modifiers,
        arrow: {
          ...(modifiers && modifiers.arrow),
          enabled: true,
          element: arrow
        },
        applyStyle: { enabled: false },
        updateStateModifier: {
          enabled: true,
          order: 900,
          fn: updatePopperState
        }
      }
    });

    return () => {
      if (pop) {
        pop.destroy();
      }
    };
  }, [target, popover, defaultPlacement, eventsEnabled, positionFixed, arrow]);

  return {
    target: {
      ref: attachTarget,
      node: target
    },
    popover: {
      node: popover,
      style: popperStyle as any,
      ref: attachPopover,
      placement
    },
    arrow: {
      node: arrow,
      style: arrowStyle,
      ref: attachArrow
    }
  };
}
