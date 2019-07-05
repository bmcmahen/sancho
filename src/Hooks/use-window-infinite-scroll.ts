import * as React from "react";

interface WindowInfiniteScrollProps {
  container?: React.MutableRefObject<HTMLElement | null>;
  onFetch: () => Promise<any>;
  hasMore: Boolean;
  triggerOffset?: number;
}

export const useWindowInfiniteScroll = ({
  container,
  onFetch,
  hasMore,
  triggerOffset = 300
}: WindowInfiniteScrollProps) => {
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onScroll = React.useCallback(() => {
    const doc =
      document.documentElement || document.body.parentNode || document.body;
    const scrollTop = window.pageYOffset;
    // const offset =

    // if (
    //   !fetching &&
    //   hasMore &&
    //   el.scrollTop + el.clientHeight + triggerOffset >= el.scrollHeight
    // ) {
    //   setFetching(true);
    // }
  }, []);

  React.useEffect(() => {
    if (fetching) {
      onFetch().finally(() => setFetching(false));
    }
  }, [fetching]);

  return [fetching, setFetching];
};
