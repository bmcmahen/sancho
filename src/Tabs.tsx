/** @jsx jsx */
import { jsx, SerializedStyles, css } from "@emotion/core";
import * as React from "react";
import { Text, variants } from "./Text";
import theme from "./Theme";
import { buttonReset } from "./Button";
import useWindowSize from "@rehooks/window-size";
import { useMeasure } from "./Collapse";
import { Icon } from "./Icons";
import VisuallyHidden from "@reach/visually-hidden";
import { IconName } from "@blueprintjs/icons";
import PropTypes from "prop-types";

/**
 * Tab container
 */

interface SliderPositions {
  right: number | null;
  left: number | null;
}

interface TabsProps {
  classes?: {
    slider?: SerializedStyles;
    root?: SerializedStyles;
    tablist?: SerializedStyles;
  };
  value: number;
  dark?: boolean;
  slider?: boolean;
  variant?: "default" | "evenly-spaced";
  onChange: (value: number) => void;
  children: React.ReactElement<TabProps>[];
}

export const Tabs: React.FunctionComponent<TabsProps> = ({
  children,
  variant = "default",
  dark = false,
  classes = {},
  slider: enableSlider = true,
  value,
  onChange,
  ...other
}) => {
  const tablist = React.useRef<HTMLDivElement>(null);
  const refs = React.useRef<Map<number, HTMLButtonElement | null>>(new Map());
  const [slider, setSlider] = React.useState<SliderPositions>({
    right: null,
    left: null
  });

  const size = useWindowSize();
  const { ref, bounds } = useMeasure();

  React.useEffect(() => {
    const target = refs.current!.get(value);
    const container = tablist.current!;

    if (target) {
      const cRect = container.getBoundingClientRect();
      const tRect = target.getBoundingClientRect();
      setSlider({
        left: tRect.left - cRect.left,
        right: cRect.right - tRect.right
      });
    }
  }, [value, refs, size, bounds]);

  return (
    <div
      css={{
        boxShadow: dark ? `0px 3px 2px ${theme.colors.scales.gray[3]}` : "none"
      }}
    >
      <div
        ref={ref}
        css={[
          {
            width: "100%",
            whiteSpace: "nowrap",
            overflowX: "scroll",
            maxWidth: "1200px",
            margin: "0 auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "::-webkit-scrollbar": {
              width: 0,
              height: 0
            }
          },
          classes.root
        ]}
        {...other}
      >
        <div
          role="tablist"
          ref={tablist}
          css={[
            {
              display: variant === "evenly-spaced" ? "flex" : "inline-block",
              position: "relative",
              verticalAlign: "bottom",
              "& button": {
                flex: variant === "evenly-spaced" ? "1" : undefined
              }
            },
            classes.tablist
          ]}
        >
          {React.Children.map(children, (child, i) => {
            return React.cloneElement(child, {
              isActive: i === value,
              ref: (el: HTMLButtonElement | null) => {
                refs.current!.set(i, el);
              },
              dark,
              id: child.props.id,
              onParentSelect: () => {
                onChange(i);
              }
            });
          })}
          {enableSlider && slider.left !== null && slider.right !== null && (
            <div
              style={{ left: slider.left + "px", right: slider.right + "px" }}
              css={[
                {
                  height: "3px",
                  bottom: 0,
                  position: "absolute",
                  background: dark ? "white" : theme.colors.text.selected,
                  transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
                },
                classes.slider
              ]}
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

  classes: PropTypes.shape({
    slider: PropTypes.any,
    root: PropTypes.any,
    tablist: PropTypes.any
  }),

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
  badge?: React.ReactNode;
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
    ref: React.Ref<HTMLButtonElement>
  ) => {
    function getTextColor() {
      if (dark) {
        return isActive ? "white" : "rgba(255,255,255,0.7)";
      }

      return isActive ? theme.colors.text.selected : theme.colors.text.muted;
    }

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
            transition: `background-color .35s cubic-bezier(0.35,0,0.25,1)`,
            color: getTextColor(),
            "& svg": {
              fill: getTextColor() + " !important"
            },
            ":focus": {
              color: dark ? "white" : theme.colors.text.selected
            }
          }
        ]}
        ref={ref}
        role="tab"
        id={id + "-tab"}
        aria-controls={id}
        aria-selected={isActive}
        tabIndex={0}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (onClick) onClick(e);
          if (onParentSelect) onParentSelect();
        }}
        {...other}
      >
        {typeof children === "string" ? (
          <Text
            noWrap
            component="span"
            css={{
              fontSize: theme.sizes[0],
              color: "inherit",
              fontWeight: 500,
              transition: "color 0.25s ease"
            }}
          >
            {children}
            {badge && (
              <div css={{ display: "inline", marginLeft: theme.spaces.sm }}>
                {badge}
              </div>
            )}
          </Text>
        ) : (
          children
        )}
      </Component>
    );
  }
);

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
}) => <div id={id} role="tabpanel" aria-labelledby={id + "-tab"} {...other} />;

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
