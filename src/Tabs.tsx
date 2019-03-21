/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import theme from "./Theme";
import { buttonReset } from "./Button";
import { useMeasure } from "./Collapse";
import { Icon } from "./Icons";
import VisuallyHidden from "@reach/visually-hidden";
import { IconName } from "@blueprintjs/icons";
import PropTypes from "prop-types";
import { alpha } from "./Theme/colors";
import { useSpring, animated } from "react-spring";
import { usePrevious } from "./Hooks/previous";
import { Badge } from "./Badge";

/**
 * Ideas for improving accessibility:
 *
 * Utilize a 'Tabs' container:
 * This will provide a unique id using context to TabList and TabContent.
 * Both of these components go through children and assign
 * each one a unique id consistent with the index. ('random-tab-1', 'random-tab-content-1')
 */

/**
 * Tab container
 */

interface SliderPositions {
  right: number;
  left: number;
  value: number;
}

interface TabsProps {
  value: number;
  dark?: boolean;
  slider?: boolean;
  variant?: "default" | "evenly-spaced";
  onChange: (value: number) => void;
  children: React.ReactElement<TabProps>[] | React.ReactElement<TabProps>;
}

export const Tabs: React.FunctionComponent<TabsProps> = ({
  children,
  variant = "default",
  dark = false,
  slider: enableSlider = true,
  value,
  onChange,
  ...other
}) => {
  const tablist = React.useRef<HTMLDivElement>(null);
  const refs = React.useRef<Map<number, HTMLButtonElement | null>>(new Map());

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
      css={{
        boxShadow: dark ? `0px 3px 2px ${theme.colors.scales.gray[3]}` : "none"
      }}
      {...other}
    >
      <div
        className="Tabs__container"
        ref={ref}
        css={{
          width: "100%",
          whiteSpace: "nowrap",
          overflowX: "scroll",
          WebkitOverflowScrolling: "touch",
          maxWidth: "1200px",
          margin: "0 auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "::-webkit-scrollbar": {
            width: 0,
            height: 0
          }
        }}
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
              dark,
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
                height: "3px",
                borderTopRightRadius: "8px",
                borderTopLeftRadius: "8px",
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
  /** The currently selected index */
  value: PropTypes.number.isRequired,

  /** Change callback to control which tab is selected */
  onChange: PropTypes.func,

  /** Whether the tab is on a dark background */
  dark: PropTypes.bool,

  /** Toggle slider visibiliby */
  slider: PropTypes.bool,

  /** Whether tabs should be left-aligned or justified */
  variant: PropTypes.oneOf(["default", "evenly-spaced"]),

  /** Tab elements */
  children: PropTypes.node
};

/**
 * Individual tabs
 */

interface LocalTabProps {
  ref: React.Ref<HTMLButtonElement>;
  onParentSelect: () => void;
  isActive: boolean;
  dark: boolean;
  badge?: React.ReactNode | string | number;
}

interface TabProps
  extends Partial<LocalTabProps>,
    React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  id: string;
  component?: React.ReactType<any>;
  [key: string]: any;
}

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
      dark,
      children,
      ...other
    }: TabProps,
    forwarded: React.Ref<HTMLButtonElement>
  ) => {
    function getTextColor(isDark: boolean | undefined) {
      if (isDark) {
        return isActive ? "white" : "rgba(255,255,255,0.65)";
      }

      return isActive ? theme.colors.text.selected : theme.colors.text.muted;
    }

    function getBadgeBackground(isDark: boolean | undefined) {
      if (isDark) {
        return isActive ? "white" : "rgba(255,255,255,0.65)";
      }

      return isActive
        ? theme.colors.text.selected
        : theme.colors.scales.gray[6];
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
        css={[
          buttonReset,
          {
            padding: `10px ${theme.spaces.md}`,
            [theme.breakpoints.lg]: {
              padding: `10px ${theme.spaces.lg}`
            },
            cursor: "pointer",
            color: getTextColor(dark),
            "& span": {
              transition: "color 0.25s cubic-bezier(0.35,0,0.25,1)"
            },
            "& svg": {
              transition: "fill 0.35s cubic-bezier(0.35,0,0.25,1)",
              fill: getTextColor(dark) + " !important"
            },
            ":focus": {
              color: dark ? "white" : theme.colors.text.selected
            },
            ":active": {
              color: dark
                ? "rgba(255,255,255,0.4)"
                : alpha(theme.colors.text.selected, 0.4),
              "& svg": {
                fill:
                  (dark
                    ? "rgba(255,255,255,0.4)"
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
              fontSize: theme.sizes[1],
              [theme.breakpoints.sm]: {
                fontSize: theme.sizes[0]
              },
              letterSpacing: "0.25px",
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
              <Badge
                css={{
                  background: getBadgeBackground(dark),
                  color: getTextColor(!dark)
                }}
              >
                {badge}
              </Badge>
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
  /** The id of the tab to be shared with TabContent */
  id: PropTypes.string.isRequired,
  /** The text content of the tab */
  children: PropTypes.node,
  /** An optional badge */
  badge: PropTypes.node
};

/**
 * A TabPanel should be used to wrap tab contents, unless those tabs
 * are anchors.
 */

interface TabContentProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
}

export const TabPanel: React.FunctionComponent<TabContentProps> = ({
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
  /** The id should correspond to the id given to the associated Tab */
  id: PropTypes.string.isRequired
};

interface TabIconProps {
  icon: IconName;
  label: string;
  size?: number;
}

export const TabIcon: React.FunctionComponent<TabIconProps> = ({
  icon,
  label,
  size = 24
}) => {
  return (
    <React.Fragment>
      <Icon icon={icon} size={size} />
      <VisuallyHidden>{label}</VisuallyHidden>
    </React.Fragment>
  );
};

TabIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.number
};
