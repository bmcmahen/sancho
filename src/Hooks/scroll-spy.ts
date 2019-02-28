import * as React from "react";
import rafSchedule from "raf-schd";
import elementInView from "element-in-view";

export function useScrollSpy(ids: string[]) {
  const [map, setMap] = React.useState<(Element | null)[]>(() => []);
  const [inView, setInView] = React.useState<(string | null)[]>([]);

  const onScroll = rafSchedule(() => {
    const inView = map
      .filter(el => {
        if (el) return elementInView(el);
        return false;
      })
      .map(el => el!.getAttribute("id"));

    setInView(inView);
  });

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [map]);

  React.useEffect(() => {
    const els = ids.map(id => document.getElementById(id));
    setMap(els);
  }, [ids]);

  return { inView };
}
