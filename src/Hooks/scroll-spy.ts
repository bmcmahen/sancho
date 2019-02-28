import * as React from "react";
import rafSchedule from "raf-schd";
import elementInView from "element-in-view";

export function useScrollSpy() {
  const [map] = React.useState(() => new Map());
  const [inView, setInView] = React.useState<string[]>([]);

  function bind(id: string) {
    return (ref: React.Ref<any>) => {
      map.set(id, ref);
    };
  }

  const onScroll = rafSchedule(() => {
    const inView: string[] = [];
    map.forEach((value, key) => {
      if (elementInView(value)) {
        inView.push(key);
      }
    });

    setInView(inView);
  });

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  return {
    bind,
    inView
  };
}
