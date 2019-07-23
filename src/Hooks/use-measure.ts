import * as React from "react";
import ResizeObserver from "resize-observer-polyfill";
import { useCallbackRef } from "./use-callback-ref";

export interface Bounds {
  left: number;
  height: number;
  top: number;
  width: number;
  bottom: number;
  x: number;
  y: number;
  right: number;
}

export function useMeasure(ref: React.MutableRefObject<any>) {
  const [element, attachRef] = useCallbackRef<React.MutableRefObject<any>>();

  // unsure if this would be better defaulting to null. I think
  // in practice it's easier to just use default values of 0
  const [bounds, setBounds] = React.useState<Bounds>({
    left: 0,
    height: 0,
    top: 0,
    width: 0,
    bottom: 0,
    x: 0,
    y: 0,
    right: 0
  });

  // bind resize handler
  React.useEffect(() => {
    function onResize([entry]: ResizeObserverEntry[]) {
      setBounds(entry.contentRect);
    }

    const observer = new ResizeObserver(onResize);

    if (element && element.current) {
      observer.observe(element.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [element]);

  // attach our ref
  React.useEffect(() => {
    attachRef(ref);
  }, []);

  return { bounds };
}
