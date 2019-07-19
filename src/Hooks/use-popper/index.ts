import PopperJS from "popper.js";
import React from "react";
import { useDeepCompareEffect } from "use-deep-compare";
import useCallbackRef from "./use-callback-ref";
import usePopperState from "./use-popper-state";

export interface Popper {
  placement?: PopperJS.Placement;
  positionFixed?: boolean;
  eventsEnabled?: boolean;
  modifiers?: PopperJS.Modifiers;
}

function usePopper<R = HTMLElement, P = HTMLElement, A = HTMLElement>({
  placement = "bottom",
  positionFixed = false,
  eventsEnabled = true,
  modifiers = {}
}: Popper) {
  const popperInstance = React.useRef<PopperJS>(null);
  const [popperStyles, updatePopperState] = usePopperState(placement);
  const [referenceNode, referenceRef] = useCallbackRef<R>();
  const [popperNode, popperRef] = useCallbackRef<P>();
  const [arrowNode, arrowRef] = useCallbackRef<A>();

  useDeepCompareEffect(() => {
    if (popperInstance.current !== null) {
      popperInstance.current.destroy();
    }

    if (referenceNode === null || popperNode === null) return;

    // @ts-ignore
    popperInstance.current = new PopperJS(referenceNode, popperNode, {
      placement,
      positionFixed,
      modifiers: {
        ...modifiers,
        arrow: {
          ...(modifiers && modifiers.arrow),
          enabled: Boolean(arrowNode),
          element: arrowNode
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
      if (popperInstance.current !== null) {
        popperInstance.current.destroy();
      }
    };
  }, [
    popperInstance,
    arrowNode,
    referenceNode,
    popperNode,
    placement,
    positionFixed,
    modifiers
  ]);

  React.useEffect(() => {
    if (popperInstance.current === null) return;

    if (eventsEnabled) {
      popperInstance.current.enableEventListeners();
    } else {
      popperInstance.current.disableEventListeners();
    }
  }, [popperInstance, eventsEnabled]);

  React.useEffect(() => {
    if (popperInstance.current !== null) {
      popperInstance.current.scheduleUpdate();
    }
  }, [popperInstance]);

  return {
    reference: {
      ref: referenceRef
    },
    referrence: {
      // For backwards compatibility
      ref: referenceRef
    },
    popper: {
      ref: popperRef,
      styles: popperStyles.popperStyles as React.CSSProperties,
      placement: popperStyles.placement
    },
    arrow: {
      ref: arrowRef,
      styles: popperStyles.arrowStyles as React.CSSProperties
    }
  };
}

export default usePopper;
