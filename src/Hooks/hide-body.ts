import * as React from "react";

export function useHideBody(showing: boolean) {
  const overlayRef = React.useRef<HTMLDivElement | null>(null);
  const returnRef = React.useRef<(() => void) | null>(null);

  function setElementsHidden() {
    const els = document.querySelectorAll("body > *");

    let originals: {
      el: Element;
      attr: string | null;
    }[] = [];

    els.forEach(el => {
      if (el.contains(overlayRef.current)) {
        return;
      }

      const hidden = el.getAttribute("aria-hidden");

      if (hidden !== "true") {
        originals.push({ el, attr: hidden });
        el.setAttribute("aria-hidden", "true");
      }
    });

    return () => {
      originals.forEach(({ el, attr }) => {
        attr === null
          ? el.removeAttribute("aria-hidden")
          : el.setAttribute("aria-hidden", attr);
      });
    };
  }

  React.useEffect(() => {
    if (showing) {
      returnRef.current = setElementsHidden();
    } else if (returnRef.current) {
      returnRef.current();
    }
  }, [showing]);

  // unmount
  React.useEffect(() => {
    if (returnRef.current) {
      returnRef.current();
    }
  }, []);

  return {
    bind: { ref: overlayRef }
  };
}
