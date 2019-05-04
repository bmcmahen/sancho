import { Ref } from "react";

export const mergeRefs = <T>(...refs: Array<Ref<T>>) => (ref: T) => {
  refs.forEach(resolvableRef => {
    if (typeof resolvableRef === "function") {
      resolvableRef(ref);
    } else if (resolvableRef) {
      (resolvableRef as any).current = ref;
    }
  });
};
