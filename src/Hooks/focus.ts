import * as React from "react";
import createFocusTrap, { FocusTrap } from "focus-trap";

interface Options {
  escapeDeactivates?: boolean;
  clickOutsideDeactivates?: boolean;
}

export function useFocusElement(showing: boolean, options: Options = {}) {
  const elementRef = React.useRef<HTMLDivElement | null>(null);
  const trapRef = React.useRef<FocusTrap | null>(null);

  function focusElement() {
    if (!elementRef.current) {
      console.error("No element found to found");
      return;
    }

    const trap = createFocusTrap(elementRef.current, {
      escapeDeactivates: false,
      clickOutsideDeactivates: false,
      fallbackFocus: '[tabindex="-1"]',
      ...options
    });

    trapRef.current = trap;
    trap.activate();
  }

  function focusTrigger() {
    if (!trapRef.current) {
      return;
    }

    trapRef.current.deactivate();
  }

  React.useEffect(() => {
    if (showing) focusElement();
    else focusTrigger();
  }, [showing]);

  return {
    bind: { ref: elementRef },
    focusElement,
    focusTrigger
  };
}
