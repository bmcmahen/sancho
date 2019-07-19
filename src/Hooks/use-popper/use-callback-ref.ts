import React from "react";

function useCallbackRef<T>(): [T | null, React.RefObject<T>] {
  const [node, setNode] = React.useState<T | null>(null);

  const ref = React.useCallback<(node: T) => void>(node => {
    if (node !== null) {
      setNode(node);
    }
  }, []);

  return [node, (ref as unknown) as React.RefObject<T>];
}

export default useCallbackRef;
