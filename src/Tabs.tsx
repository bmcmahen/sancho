/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import { buttonReset } from "./Button";
import { useMeasure } from "./Collapse";
import VisuallyHidden from "@reach/visually-hidden";
import PropTypes from "prop-types";
import { alpha } from "./Theme/colors";
import { useSpring, animated } from "react-spring";
import { usePrevious } from "./Hooks/previous";
import { Badge } from "./Badge";
import { useTheme } from "./Theme/Providers";
import { IconWrapper } from "./IconWrapper";
import { IconSizes } from "./Icons/IconTypes";
import scrollIntoView from "scroll-into-view-if-needed";
import { scrollTo } from "./misc/tween";

const hideScrollbar = css`
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
`;

/**
 * Ideas for improving accessibility:
 *
 * Utilize a 'Tabs' container:
 * This will provide a unique id using context to TabList and TabContent.
 * Both of these components go through children and assign
 * each one a unique id consistent with the index. ('random-tab-1', 'random-tab-content-1')
 */

interface SliderPositions {
  right: number;
  left: number;
  value: number;
}

export interface TabsProps {
  /** The currently selected index */
  value: number;
  /** Toggle slider visibiliby */
  slider?: boolean;
  /** Whether tabs should be left-aligned or justified */
  variant?: "default" | "evenly-spaced";
  /** Change callback to control which tab is selected */
  onChange: (value: number) => void;
  /** Tab elements */
  children: React.ReactElement<TabProps>[] | React.ReactElement<TabProps>;
}

/**
 * Provide a tabbed interface, similar to that found in Material-UI.
 */
export const Tabs: React.FunctionComponent<TabsProps> = ({
  children,
  variant = "default",
  slider: enableSlider = true,
  value,
  onChange,
  ...other
}) => {
  const theme = useTheme();
  const boundary = React.useRef<HTMLDivElement>(null);
  const tablist = React.useRef<HTMLDivElement>(null);
  const refs = React.useRef<Map<number, HTMLButtonElement | null>>(new Map());
  const dark = theme.colors.mode === "dark";

  // We store the 'value' prop to determine when we should actually
  // animated our slider. ie., only when the index changes.
  const [slider, setSlider] = React.useState<SliderPositions>({
    right: 0,
    left: 0,
    value
  });

  const [showSlider, setShowSlider] = React.useState(false);
  const previousSlider = usePrevious(slider);

  // this should be debounced, probably
  const { ref, bounds } = useMeasure();

  React.useEffect(() => {
    const target = refs.current!.get(value);
    if (target) {
      scrollIntoView(target, {
        behavior: instructions => {
          if (instructions[0]) {
            const { el, left } = instructions[0];
            scrollTo(el, left);
          }
        },

        block: "center",
        inline: "center",
        boundary: boundary.current
      });
    }
  }, [value]);

  // measure our elements
  React.useEffect(() => {
    const target = refs.current!.get(value);
    const container = tablist.current!;

    if (target) {
      const cRect = container.getBoundingClientRect();

      // when container is `display: none`, width === 0.
      // ignore this case
      if (cRect.width === 0) {
        return;
      }

      const tRect = target.getBoundingClientRect();
      const left = tRect.left - cRect.left;
      const right = cRect.right - tRect.right;

      setSlider({
        value,
        left: left + 8,
        right: right + 8
      });

      setShowSlider(true);
    }
  }, [value, bounds]);

  const spring = useSpring({
    left: slider.left + "px",
    right: slider.right + "px",
    immediate: previousSlider ? previousSlider.value === slider.value : false,
    config: { mass: 1, tension: 185, friction: 26 } // default friction is 160: speed up our animation slightly
  });

  // Thanks to Ryan Florence for this code
  // https://github.com/reach/reach-ui/blob/master/packages/tabs/src/index.js
  function onKeyDown(e: React.KeyboardEvent) {
    const enabledIndexes = React.Children.map(
      children as React.ReactElement<any>,
      (child, index) => {
        return child.props.disabled === true ? null : index;
      }
    ).filter(index => index != null);
    const enabledSelectedIndex = enabledIndexes.indexOf(value);

    switch (e.key) {
      case "ArrowRight": {
        const nextEnabledIndex =
          (enabledSelectedIndex + 1) % enabledIndexes.length;
        const nextIndex = enabledIndexes[nextEnabledIndex];
        if (typeof nextIndex === "number") {
          onChange(nextIndex);
        }
        break;
      }

      case "ArrowLeft": {
        const count = enabledIndexes.length;
        const nextEnabledIndex = (enabledSelectedIndex - 1 + count) % count;
        const nextIndex = enabledIndexes[nextEnabledIndex];
        if (typeof nextIndex === "number") {
          onChange(nextIndex);
        }
        break;
      }

      // todo: ArrowDown should focus our selected tab content

      case "Home": {
        onChange(0);
        break;
      }

      case "End": {
        onChange(React.Children.count(children) - 1);
        break;
      }
    }
  }

  return (
    <div
      className="Tabs"
      ref={boundary}
      css={{
        boxShadow: dark ? `0px 3px 2px rgba(0,0,0,0.15)` : "none"
      }}
      {...other}
    >
      <div
        className="Tabs__container"
        ref={ref}
        css={[
          {
            width: "100%",
            whiteSpace: "nowrap",
            overflowX: "scroll",
            WebkitOverflowScrolling: "touch",
            maxWidth: "1200px",
            margin: "0 auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          },
          hideScrollbar
        ]}
      >
        <div
          className="Tabs__tablist"
          role="tablist"
          ref={tablist}
          onKeyDown={onKeyDown}
          css={{
            display: variant === "evenly-spaced" ? "flex" : "inline-block",
            position: "relative",
            verticalAlign: "bottom",
            "& button": {
              flex: variant === "evenly-spaced" ? "1" : undefined
            }
          }}
        >
          {React.Children.map(children, (child, i) => {
            return React.cloneElement(child as React.ReactElement<any>, {
              isActive: i === value,
              ref: (el: HTMLButtonElement | null) => {
                refs.current!.set(i, el);
              },
              onParentSelect: () => {
                onChange(i);
              }
            });
          })}
          {enableSlider && showSlider && (
            <animated.div
              className="Tabs__slider"
              style={spring}
              css={{
                height: "4px",
                borderTopRightRadius: "8px",
                borderTopLeftRadius: "8px",
                marginLeft: theme.spaces.sm,
                marginRight: theme.spaces.sm,
                bottom: 0,
                position: "absolute",
                background: dark ? "white" : theme.colors.text.selected
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  slider: PropTypes.bool,
  variant: PropTypes.oneOf(["default", "evenly-spaced"]),
  children: PropTypes.node
};

/**
 * Tab
 */

interface LocalTabProps {
  ref: React.Ref<HTMLButtonElement>;
  onParentSelect: () => void;
  isActive: boolean;
}

export interface TabProps
  extends Partial<LocalTabProps>,
    React.HTMLAttributes<HTMLButtonElement> {
  /** The text content of the tab */
  children: React.ReactNode;
  /** The id of the tab to be shared with TabContent */
  id: string;
  component?: React.ReactType<any>;
  [key: string]: any;
  /** An optional badge */
  badge?: React.ReactNode | string | number;
}

/**
 * A clickable tab item
 */

export const Tab: React.RefForwardingComponent<
  React.Ref<HTMLButtonElement>,
  TabProps
> = React.forwardRef(
  (
    {
      onParentSelect,
      isActive,
      id,
      component: Component = "button",
      badge,
      onClick,
      children,
      ...other
    }: TabProps,
    forwarded: React.Ref<HTMLButtonElement>
  ) => {
    const theme = useTheme();
    const dark = theme.colors.mode === "dark";

    function getTextColor(isDark: boolean | undefined) {
      if (isDark) {
        return isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.65)";
      }

      return isActive ? theme.colors.text.selected : theme.colors.text.muted;
    }

    function getBadgeColors(isDark: boolean | undefined) {
      let background = "white";
      let color = "white";

      if (isDark) {
        background = isActive ? "white" : "rgba(255,255,255,0.65)";
        color = isActive
          ? theme.colors.text.selected
          : theme.colors.text.selected;
      } else {
        background = isActive
          ? theme.colors.text.selected
          : theme.colors.scales.gray[6];
        color = isActive ? "white" : theme.colors.text.selected;
      }

      return {
        background,
        color
      };
    }

    const mounted = React.useRef(false);
    const ref = React.useRef<any>(null);

    React.useEffect(() => {
      // don't autofocus if mounting
      if (!mounted.current) {
        mounted.current = true;
        return;
      }

      if (!isActive) {
        return;
      }

      if (ref.current) {
        ref.current.focus();
      }
    }, [isActive]);

    return (
      <Component
        onTouchStart={() => {
          // lame hack to get ios active styles working
        }}
        css={[
          buttonReset,
          {
            padding: `10px ${theme.spaces.md}`,
            [theme.mediaQueries.lg]: {
              padding: `10px ${theme.spaces.lg}`
            },
            cursor: "pointer",
            color: getTextColor(dark),
            "& span": {
              transition: "color 0.25s cubic-bezier(0.35,0,0.25,1)"
            },
            "& svg": {
              transition: "stroke 0.35s cubic-bezier(0.35,0,0.25,1)",
              stroke: getTextColor(dark) + " !important"
            },
            ":focus": {
              color: dark ? "white" : theme.colors.text.selected
            },
            ":active": {
              color: dark
                ? "rgba(255,255,255,0.4)"
                : alpha(theme.colors.text.selected, 0.4),
              "& svg": {
                stroke:
                  (dark
                    ? "rgba(255,255,255,0.3)"
                    : alpha(theme.colors.text.selected, 0.4)) + " !important"
              }
            }
          }
        ]}
        ref={(el: any) => {
          // typescript got me like "what?"
          if (forwarded) {
            const f = forwarded as any;
            f(el);
          }
          ref.current = el;
        }}
        role="tab"
        id={id + "-tab"}
        aria-controls={id}
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (onClick) onClick(e);
          if (onParentSelect) onParentSelect();
        }}
        {...other}
      >
        {typeof children === "string" ? (
          <Text
            wrap={false}
            component="span"
            variant="subtitle"
            css={{
              fontSize: theme.fontSizes[0],
              fontWeight: 600,
              color: "inherit",
              transition: "color 0.25s cubic-bezier(0.35,0,0.25,1)"
            }}
          >
            {children}
          </Text>
        ) : (
          children
        )}

        {/** Render a badge either from a string, or as a custom element */}
        {badge && (
          <div css={{ display: "inline", marginLeft: theme.spaces.sm }}>
            {typeof badge === "string" || typeof badge === "number" ? (
              <Badge css={getBadgeColors(dark)}>{badge}</Badge>
            ) : (
              badge
            )}
          </div>
        )}
      </Component>
    );
  }
);

Tab.displayName = "Tab";

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  badge: PropTypes.node
};

/**
 * A TabPanel should be used to wrap tab contents, unless those tabs
 * are anchors.
 */

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The id should correspond to the id given to the associated Tab */
  id: string;
}

export const TabPanel: React.FunctionComponent<TabPanelProps> = ({
  id,
  ...other
}) => (
  <div
    id={id}
    role="tabpanel"
    tabIndex={0}
    aria-labelledby={id + "-tab"}
    {...other}
  />
);

TabPanel.propTypes = {
  id: PropTypes.string.isRequired
};

export interface TabIconProps {
  icon: React.ReactNode;
  label: string;
  size?: IconSizes;
}

export const TabIcon: React.FunctionComponent<TabIconProps> = ({
  icon,
  label,
  size = "lg"
}) => {
  return (
    <div css={{ display: "flex", justifyContent: "center" }}>
      <IconWrapper size={size}>{icon}</IconWrapper>
      <VisuallyHidden>{label}</VisuallyHidden>
    </div>
  );
};

TabIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.number
};
