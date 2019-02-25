/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { animated, useSpring } from "react-spring";
import ResizeObserver from "resize-observer-polyfill";

let count = 0;

export function useCollapse(defaultShow: boolean = false) {
  const [show, setShow] = React.useState(defaultShow);
  const id = React.useRef(`collapse-${count++}`);

  function onClick() {
    setShow(!show);
  }

  return {
    show,
    id: id.current,
    buttonProps: {
      onClick,
      "aria-controls": id.current,
      "aria-expanded": show ? true : false
    },
    collapseProps: {
      id: id.current,
      show
    }
  };
}

interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  show: boolean;
  children: React.ReactNode;
}

export function Collapse({ children, id, show, ...other }: CollapseProps) {
  const { ref, bounds } = useMeasure();

  const { height, opacity } = useSpring({
    from: { height: 0, opacity: 0 },
    to: { height: show ? bounds.height : 0, opacity: show ? 1 : 0 }
  }) as {
    height: number;
    opacity: number;
  }; // typings seems wrong for useSpring...

  return (
    <animated.div
      css={{
        overflow: "hidden",
        willChange: "height, opacity"
      }}
      style={{ opacity, height }}
      {...other}
    >
      <div ref={ref}>{children}</div>
    </animated.div>
  );
}

export function usePrevious<T>(value: T) {
  const ref = React.useRef<T | null>(null);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

interface Bounds {
  left: number;
  height: number;
  top: number;
  width: number;
}

export function useMeasure() {
  const ref = React.useRef<HTMLDivElement>(null);
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

  return { ref, bounds };
}
