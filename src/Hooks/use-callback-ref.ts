import * as React from "react";

type SetRef<T> = (node: T | null) => void;

export function useCallbackRef<T>(): [T | null, SetRef<T>] {
  const [ref, setRef] = React.useState<T | null>(null);

  const fn = React.useCallback<SetRef<T>>(node => {
    if (node !== null) {
      setRef(node);
    }
  }, []);

  return [ref, fn];
}
