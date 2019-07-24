import * as React from "react";
import rafSchd from "raf-schd";

interface InfiniteScrollProps {
  container?: React.RefObject<HTMLElement | null>;
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

  const onScroll = React.useCallback(
    rafSchd(() => {
      // check container
      if (container) {
        if (container.current) {
          if (
            container.current &&
            !fetching &&
            hasMore &&
            container.current.scrollTop +
              container.current.clientHeight +
              triggerOffset >=
              container.current.scrollHeight
          ) {
            setFetching(true);
          }
        }

        // check window
      } else {
        if (
          !fetching &&
          hasMore &&
          window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - triggerOffset
        ) {
          setFetching(true);
        }
      }
    }),
    [fetching, hasMore]
  );

  // bind our scroll listener
  React.useEffect(() => {
    if (disabled) {
      return;
    }

    // this is so ugly uggh
    // bind our scroll event to either container or window
    if (container) {
      if (container.current) {
        container.current.addEventListener("scroll", onScroll);
      }
    } else {
      window.addEventListener("scroll", onScroll);
    }

    // unbind our scroll event
    return () => {
      if (container) {
        if (container.current) {
          container.current.removeEventListener("scroll", onScroll);
        }
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    };
  }, [onScroll, disabled]);

  React.useEffect(() => {
    if (fetching) {
      onFetch().finally(() => setFetching(false));
    }
  }, [fetching]);

  return [fetching, setFetching];
};
