import * as React from "react";
import ResizeObserver from "resize-observer-polyfill";

interface Bounds {
  left: number;
  height: number;
  top: number;
  width: number;
}

export function useMeasure(ref: React.RefObject<HTMLDivElement | null>) {
  const [bounds, setBounds] = React.useState<Bounds>({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  });

  const [observer] = React.useState(
    () =>
      new ResizeObserver(([entry]) => {
        setBounds(entry.contentRect);
      })
  );

  React.useEffect(() => {
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { bounds };
}
