import * as React from "react";

export function useCloseOnClick(enabled: boolean, close: () => void) {
  const element = React.useRef<HTMLDivElement>(null);

  function removeBodyListeners() {
    document.body.removeEventListener("touch", onBodyTouch, false);
    document.body.removeEventListener("click", onBodyClick, false);
  }

  function addBodyListeners() {
    document.body.addEventListener("touch", onBodyTouch, false);
    document.body.addEventListener("click", onBodyClick, false);
  }

  function onBodyTouch(e: any) {
    if (e.target) {
      onBodySelect(e.target as Element);
    }
  }

  function onBodyClick(e: MouseEvent) {
    if (e.target) {
      onBodySelect(e.target as Element);
    }
  }

  function onBodySelect(target: Element) {
    const el = element.current;

    if (!el) {
      return;
    }

    // or the popover, sometimes
    if (el === target || el.contains(target)) {
      if (enabled) {
        if (
          target.hasAttribute('[data-trigger-close="true"]') ||
          target.closest('[data-trigger-close="true"]')
        ) {
          close();
          return;
        }
      }

      return;
    }

    close();
  }

  React.useEffect(() => {
    if (enabled) addBodyListeners();
    else removeBodyListeners();
  }, [enabled]);

  React.useEffect(() => {
    return () => {
      removeBodyListeners();
    };
  }, []);

  return {
    bind: { ref: element }
  };
}
