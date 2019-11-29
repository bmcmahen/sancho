/** @jsx jsx */
import { jsx, SerializedStyles } from "@emotion/core";
import * as React from "react";
import { animated, useSpring } from "react-spring";
import PropTypes from "prop-types";
import { useMeasure } from "./Hooks/use-measure";
import { useUid } from "./Hooks/use-uid";

export function useCollapse(defaultShow: boolean = false) {
  const [show, setShow] = React.useState(defaultShow);
  const id = useUid();

  function onClick() {
    setShow(!show);
  }

  return {
    show,
    id,
    buttonProps: {
      onClick,
      "aria-controls": id,
      "aria-expanded": show ? true : false
    },
    collapseProps: {
      id,
      show
    }
  };
}

interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A unique id required for accessibility purposes. */
  id: string;
  /** Controls whether the children should be visible */
  show: boolean;
  /** Any element that you want to reveal */
  children: React.ReactNode;
  divStyle?: SerializedStyles;
  paddingSpring?: number;
  noAnimated?: boolean;
}

/**
 * Hide and reveal content with an animation. Supports dynamic
 * heights.
 */
export const Collapse: React.FunctionComponent<CollapseProps> = ({
  children,
  id,
  show,
  divStyle,
  paddingSpring,
  noAnimated =false,
  ...other
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { bounds } = useMeasure(ref);
  const prevShow = usePrevious(show);
  //高度 动画副作用，导致计算问题？ 旧的to: { height: show ? bounds.height : 0 },
  //这个height实际是一个对象的。  const { animationObj } = useSpring ；注意两个height不是一个东西。
  //这里useSpring({）的参数 实际是初始化用的，后面输出的对象height.value实际是动画编制的起始数值，而不是目标数值。
  const { height } = useSpring({
    from: { height: 0 },
    to: { height: show ? bounds.height+70 : 0 },
    immediate: true
  }) as any;
  //实际打印预览会捕获3次的render这里，Collapse-捕获height=，前面2次纸张缩放调整，缩小了，后面第三次是屏幕页面的。
  console.log("Collapse-捕获height=", height&&height.value,";bounds =",bounds);
  return (
    <React.Fragment>
    {
      noAnimated? ( <div
          id={id}
          css={{
            overflow: "hidden",
          }}
          {...other}
          >
          <div ref={ref}>{children}</div>
        </div> )
        :
        ( <animated.div
          id={id}
          css={{
            overflow: "hidden",
            willChange: "height, opacity"
          }}
          style={{ height } as any}
          {...other}
        >
          <div ref={ref}
               css={{
                 // overflow: "hidden",
                 //willChange: "height, opacity"
               }}
          >{children}</div>
        </animated.div> )
    }
    </React.Fragment>
  );
};

Collapse.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired
};

export function usePrevious<T>(value: T) {
  const ref = React.useRef<T | null>(null);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
