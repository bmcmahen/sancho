/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { useSpring, animated } from "react-spring";
import { number } from "prop-types";
import { usePrevious } from "./Collapse";

interface PositionType {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ImageProps extends React.HTMLAttributes<any> {
  fadeIn?: boolean;
  zoomed?: boolean;
  onClick: () => void;
  onRequestClose?: boolean;
  src: string;
}

// basic strategy:
// render image
// when switching to zoom:
//  - load larger image
//  - get dimensions / placement of that image
//  - render new image in that place usng fixed positioning and transformed sized
//  - use visually hidden on source image
//  - animate from initial position to full size

// zoomed image should be distinct component, and we use context to pass along
// information from the parent.

const initialDimensions = {
  w: 0,
  h: 0,
  x: 0,
  y: 0
};

const initialTransform = "translateX(0px) translateY(0px) scale(1)";

const ImageContext = React.createContext({
  zoomed: false,
  dimensions: initialDimensions
});

export const Image: React.FunctionComponent<ImageProps> = ({
  fadeIn,
  zoomed,
  onRequestClose,
  ...other
}) => {
  const ref = React.useRef<HTMLImageElement>(null);
  const prevZoom = usePrevious(zoomed);
  const cloneRef = React.useRef<any>(null);

  const [cloneSize, setCloneSize] = React.useState({
    width: 0,
    height: 0,
    loaded: false
  });

  const [thumbProps, setThumbProps] = useSpring(() => ({
    opacity: 1,
    immediate: true
  }));

  const [overlay, setOverlay] = useSpring(() => ({
    opacity: zoomed ? 1 : 0
  }));

  const [props, set] = useSpring(() => ({
    opacity: 0,
    transform: initialTransform,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    immediate: true
  }));

  const prevCloneSize = usePrevious(cloneSize);

  const generatePositions = React.useCallback(
    (immediate?: boolean) => {
      // any time this prop changes, we update our position
      if (ref.current && cloneSize.loaded) {
        const rect = ref.current.getBoundingClientRect();

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

        const zoomingIn = !prevZoom && zoomed;
        const zoomingOut = prevZoom && !zoomed;

        if (zoomingIn) {
          setThumbProps({ opacity: 0, immediate: true });
          set({ opacity: 1, immediate: true });
        }

        setOverlay({ opacity: zoomed ? 1 : 0 });

        set({
          transform: zoomed
            ? initialTransform
            : `translateX(${initialSize.translateX}px) translateY(${
                initialSize.translateY
              }px) scale(${initialSize.scale})`,
          left: clonedDimensions.x,
          top: clonedDimensions.y,
          width: clonedDimensions.w,
          height: clonedDimensions.h,
          immediate: immediate || (prevCloneSize && !prevCloneSize.loaded),
          onRest: zoomingOut
            ? () => {
                setThumbProps({ opacity: 1, immediate: true });
                set({ opacity: 0, immediate: true });
              }
            : null
        });
      }
    },
    [zoomed, cloneSize, ref, prevCloneSize, prevZoom]
  );

  const onResize = React.useCallback(() => {
    generatePositions(true);
  }, [zoomed, cloneSize, ref, prevCloneSize, prevZoom]);

  // update our various positions
  React.useEffect(() => {
    generatePositions();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [zoomed, cloneSize, ref, prevCloneSize, prevZoom]);

  return (
    <React.Fragment>
      <animated.img
        style={{
          opacity: thumbProps.opacity
        }}
        ref={ref}
        {...other}
      />
      <animated.div
        style={{
          opacity: overlay.opacity
        }}
        aria-hidden={!zoomed}
        css={{
          pointerEvents: zoomed ? "auto" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 90,
          background: "rgba(255,255,255,0.8)"
        }}
      />
      <animated.img
        onLoad={() => {
          setCloneSize({
            width: cloneRef.current!.naturalWidth,
            height: cloneRef.current!.naturalHeight,
            loaded: true
          });
        }}
        style={{
          zIndex: 100,
          position: "fixed",
          opacity: props.opacity,
          transform: props.transform,
          left: props.left,
          top: props.top,
          width: props.width,
          height: props.height
        }}
        ref={cloneRef}
        {...other}
      />
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
