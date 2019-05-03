import { Ref } from "react";
import { mergeRefs } from "./merge-refs";

interface FunctionsType {
  [key: string]: any;
}

interface GroupedFunctionsType {
  [key: string]: Array<Function>;
}

export const safeBind = (...bindGroups: Array<any>) => {
  const groupedFns: GroupedFunctionsType = {};
  const fns: FunctionsType = {};
  const refs: Array<Ref<any>> = [];

  function propFnFactory(name: string) {
    return (e: Event, ...args: any) => {
      const callbacks = groupedFns[name];
      if (!e.defaultPrevented) {
        callbacks.forEach(cb => cb(e, ...args));
      }
    };
  }

  bindGroups.forEach(bind => {
    Object.entries(bind).forEach(([key, value]) => {
      if (key === "ref") {
        refs.push(value as Ref<any>);
        return;
      }

      if (typeof value !== "function") {
        fns[key] = value;
        return;
      }

      if (!groupedFns[key]) {
        groupedFns[key] = [];
      }

      groupedFns[key].push(value as Function);
      fns[key] = propFnFactory(key);
    });
  });

  if (refs.length > 0) {
    fns.ref = mergeRefs(...refs);
  }

  return fns;
};
