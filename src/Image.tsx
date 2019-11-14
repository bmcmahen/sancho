/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { useSpring, animated, config } from "react-spring";
import { usePrevious } from "./Collapse";
import { useGestureResponder, StateType } from "react-gesture-responder";
import { useTheme } from "./Theme/Providers";
import useScrollLock from "use-scroll-lock";
import { Text } from "./Text";
import { Spinner } from "./Spinner";
import { LayerLoading } from "./Layer";

interface PositionType {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ImageProps extends React.HTMLAttributes<any> {
  fadeIn?: boolean;
  zoomed?: boolean;
  caption?: string;
  onClick: () => void;
  fullscreenSrc?: string;
  onRequestClose?: () => void;
  src: string;
}

const initialTransform = "translateX(0px) translateY(0px) scale(1)";

const getScale = linearConversion([0, 400], [1, 0.4]);
const scaleClamp = clamp(0.4, 1);

export const Image: React.FunctionComponent<ImageProps> = ({
  fadeIn,
  zoomed = false,
  caption,
  fullscreenSrc,
  onRequestClose,
  src,
  ...other
}) => {
  const theme = useTheme();
  const ref = React.useRef<HTMLImageElement>(null);
  const prevZoom = usePrevious(zoomed);
  const [animating, setAnimating] = React.useState(false);
  const cloneRef = React.useRef<any>(null);
  const [cloneLoaded, setCloneLoaded] = React.useState(false);
  const prevCloneLoaded = usePrevious(cloneLoaded);
  const [hasRequestedZoom, setHasRequestedZoom] = React.useState(zoomed);

  // this allows us to lazily load our cloned image
  React.useEffect(() => {
    if (!hasRequestedZoom && zoomed) {
      setHasRequestedZoom(true);
    }
  }, [hasRequestedZoom, zoomed]);

  // disable scrolling while zooming is taking place
  useScrollLock(zoomed || animating);

  /**
   * We basically only use this to imperatively set the
   * visibility of the thumbnail
   */

  const [thumbProps, setThumbProps] = useSpring(() => ({
    opacity: 1,
    immediate: true
  }));

  // set overlay opacity
  const [overlay, setOverlay] = useSpring(() => ({
    opacity: zoomed ? 1 : 0
  }));

  // our cloned image spring
  const [props, set] = useSpring(() => ({
    opacity: 0,
    transform: initialTransform,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    immediate: true,
    config: config.stiff
  }));

  /**
   * Handle drag movement
   */

  function onMove({ delta }: StateType) {
    const scale = scaleClamp(getScale(Math.abs(delta[1])));

    set({
      transform: `translateX(${delta[0] * 0.8}px) translateY(${
        delta[1]
      }px) scale(${scale})`,
      immediate: true
    });

    setOverlay({ opacity: scale, immediate: true });
  }

  /**
   * Handle release - we almost always close
   * @param param0
   */

  function onEnd({ delta }: StateType) {
    if (Math.abs(delta[1]) > 20 && onRequestClose) {
      onRequestClose();
    } else {
      // reset
      set({ transform: initialTransform, immediate: false });
      setOverlay({ opacity: 1, immediate: false });
    }
  }

  // our gesture binding helper
  const { bind } = useGestureResponder({
    onStartShouldSet: () => false,
    onMoveShouldSet: ({ initialDirection, delta }) => {
      if (!zoomed) {
        return false;
      }

      return true;
    },
    onMove: onMove,
    onRelease: onEnd,
    onTerminate: onEnd
  });

  /**
   * Basic logic for determining positions. A bit of a mess tbh,
   * but that often comes when mixing imperative logic w/
   * react's declarative nature.
   */

  const generatePositions = React.useCallback(
    (immediate: boolean = false) => {
      // any time this prop changes, we update our position
      if (ref.current && cloneLoaded) {
        const rect = ref.current.getBoundingClientRect();

        const cloneSize = {
          width: cloneRef.current!.naturalWidth,
          height: cloneRef.current!.naturalHeight
        };

        const thumbDimensions = {
          x: rect.left,
          y: rect.top,
          w: rect.width,
          h: rect.height
        };

        const clonedDimensions = getTargetDimensions(
          cloneSize.width,
          cloneSize.height
        );

        const initialSize = getInitialClonedDimensions(
          thumbDimensions,
          clonedDimensions
        );

        const zoomingIn =
          (!prevZoom && zoomed) || (!prevCloneLoaded && cloneLoaded);
        const zoomingOut = prevZoom && !zoomed;

        // handle zooming in
        if (zoomingIn && !immediate) {
          setThumbProps({ opacity: 0, immediate: true });
          set({
            opacity: 1,
            immediate: true,
            transform: `translateX(${initialSize.translateX}px) translateY(${
              initialSize.translateY
            }px) scale(${initialSize.scale})`,
            left: clonedDimensions.x,
            top: clonedDimensions.y,
            width: clonedDimensions.w,
            height: clonedDimensions.h,
            onRest: null
          });

          set({
            transform: initialTransform,
            immediate: false
          });

          // handle zooming out
        } else if (zoomingOut) {
          setAnimating(true);

          set({
            transform: `translateX(${initialSize.translateX}px) translateY(${
              initialSize.translateY
            }px) scale(${initialSize.scale})`,
            immediate: false,
            onRest: () => {
              setThumbProps({ opacity: 1, immediate: true });
              set({ opacity: 0, immediate: true });
              setAnimating(false);
            }
          });

          // handle resizing
        } else if (immediate) {
          set({
            immediate: true,
            transform: initialTransform,
            left: clonedDimensions.x,
            top: clonedDimensions.y,
            width: clonedDimensions.w,
            height: clonedDimensions.h,
            onRest: null
          });
        }

        setOverlay({ opacity: zoomed ? 1 : 0 });
      }
    },
    [
      zoomed,
      cloneLoaded,
      ref,
      cloneRef,
      prevCloneLoaded,
      hasRequestedZoom,
      prevZoom
    ]
  );

  // we need to update our fixed positioning when resizing
  // this should probably be debounced
  const onResize = React.useCallback(() => {
    generatePositions(true);
  }, [zoomed, cloneLoaded, ref, prevCloneLoaded, prevZoom]);

  // update our various positions
  React.useEffect(() => {
    generatePositions();
    if (zoomed) window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [zoomed, cloneLoaded, ref, prevCloneLoaded, prevZoom]);

  return (
    <React.Fragment>
      <div className="Image">
        <div css={{ position: "relative" }}>
          <animated.img
            src={src}
            style={{
              maxWidth: "100%",
              height: "auto",
              opacity: thumbProps.opacity
            }}
            ref={ref}
            {...other}
          />
          <LayerLoading
            css={{ borderRadius: 0 }}
            loading={!cloneLoaded && zoomed}
          />
        </div>
        {caption && (
          <Text
            css={{
              display: "inline",
              marginTop: theme.spaces.sm,
              marginBottom: theme.spaces.md
            }}
            variant="subtitle"
          >
            {caption}
          </Text>
        )}
      </div>
      {hasRequestedZoom ||
        (src !== fullscreenSrc && (
          <div
            {...bind}
            aria-hidden={!zoomed}
            onClick={onRequestClose}
            css={{
              pointerEvents: zoomed ? "auto" : "none",
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              zIndex: 90
            }}
          >
            <animated.div
              style={{
                opacity: overlay.opacity,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
              css={{
                background: theme.colors.background.default
              }}
            />

            <animated.img
              css={{ pointerEvents: "none" }}
              onLoad={() => {
                setCloneLoaded(true);
              }}
              style={{
                zIndex: 100,
                position: "absolute",
                opacity: props.opacity,
                transform: props.transform,
                left: props.left,
                top: props.top,
                width: props.width,
                height: props.height
              }}
              ref={cloneRef}
              src={fullscreenSrc || src}
            />
          </div>
        ))}
    </React.Fragment>
  );
};

/**
 * Get the original dimensions of the clone so that it appears
 * in the same place as the original image
 * @param o origin
 * @param t target
 */

function getInitialClonedDimensions(o: PositionType, t: PositionType) {
  const scale = o.w / t.w;
  const translateX = o.x + o.w / 2 - (t.x + t.w / 2);
  const translateY = o.y + o.h / 2 - (t.y + t.h / 2);
  return {
    scale,
    translateX,
    translateY
  };
}

/**
 * Get the target dimensions / position of the image when
 * it's zoomed in
 *
 * @param iw (image width)
 * @param ih (image height)
 * @param padding
 */

function getTargetDimensions(iw: number, ih: number, padding = 0) {
  const vp = getViewport();
  const target = scaleToBounds(iw, ih, vp.width - padding, vp.height - padding);
  const left = vp.width / 2 - target.width / 2;
  const top = vp.height / 2 - target.height / 2;
  return {
    x: left,
    y: top,
    w: target.width,
    h: target.height
  };
}

/**
 * Scale numbers to bounds given max dimensions while
 * maintaining the original aspect ratio
 *
 * @param ow
 * @param oh
 * @param mw
 * @param mh
 */

function scaleToBounds(ow: number, oh: number, mw: number, mh: number) {
  let scale = Math.min(mw / ow, mh / oh);
  if (scale > 1) scale = 1;
  return {
    width: ow * scale,
    height: oh * scale
  };
}

/**
 * Server-safe measurement of the viewport size
 */

function getViewport() {
  if (typeof window !== "undefined") {
    return { width: window.innerWidth, height: window.innerHeight };
  }

  return { width: 0, height: 0 };
}

/**
 * Create a basic linear conversion fn
 */

function linearConversion(a: [number, number], b: [number, number]) {
  const o = a[1] - a[0];
  const n = b[1] - b[0];

  return function(x: number) {
    return ((x - a[0]) * n) / o + b[0];
  };
}

/**
 * Create a clamp
 * @param max
 * @param min
 */

function clamp(min: number, max: number) {
  return function(x: number) {
    if (x > max) return max;
    if (x < min) return min;
    return x;
  };
}
