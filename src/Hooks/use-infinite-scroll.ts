import * as React from "react";

interface InfiniteScrollProps {
  container: React.RefObject<HTMLElement | null>;
  onFetch: () => Promise<any>;
  hasMore: boolean;
  triggerOffset?: number;
  disabled?: boolean;
}

export const useInfiniteScroll = ({
  container,
  onFetch,
  hasMore,
  disabled = false,
  triggerOffset = 300
}: InfiniteScrollProps) => {
  const [fetching, setFetching] = React.useState(false);

  const onScroll = React.useCallback(() => {
    const el = container.current;

    if (
      el &&
      !fetching &&
      hasMore &&
      el.scrollTop + el.clientHeight + triggerOffset >= el.scrollHeight
    ) {
      setFetching(true);
    }
  }, [fetching, hasMore]);

  React.useEffect(() => {
    if (container.current && !disabled) {
      container.current.addEventListener("scroll", onScroll);
    }

    return () => {
      if (container.current) {
        container.current.removeEventListener("scroll", onScroll);
      }
    };
  }, [container, onScroll, disabled]);

  React.useEffect(() => {
    if (fetching) {
      onFetch().finally(() => setFetching(false));
    }
  }, [fetching]);

  return [fetching, setFetching];
};
