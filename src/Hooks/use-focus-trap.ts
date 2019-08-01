import * as React from "react";
import createFocusTrap, { FocusTrap } from "focus-trap";

interface Options {
  escapeDeactivates?: boolean;
  clickOutsideDeactivates?: boolean;
}

export function useFocusElement(
  elementRef: React.MutableRefObject<HTMLDivElement | null>,
  showing: boolean,
  options: Options = {}
) {
  React.useEffect(() => {
    let trap: FocusTrap;

    function focusElement() {
      if (!elementRef.current) {
        console.error("No element found to found");
        return;
      }

      trap = createFocusTrap(elementRef.current, {
        escapeDeactivates: false,
        clickOutsideDeactivates: true,
        fallbackFocus: '[tabindex="-1"]',
        ...options
      });

      trap.activate();
    }

    function focusTrigger() {
      if (!trap) {
        return;
      }

      trap.deactivate();
    }

    if (showing) {
      focusElement();
      return () => {
        focusTrigger();
      };
    }
  }, [showing]);
}
