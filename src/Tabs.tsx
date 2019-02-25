/** @jsx jsx */
import { jsx, SerializedStyles, css } from "@emotion/core";
import * as React from "react";
import { Text, variants } from "./Text";
import theme from "./Theme";
import { buttonReset } from "./Button";
import useWindowSize from "@rehooks/window-size";
import { useMeasure } from "./Collapse";

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
  variant?: "default" | "evenly-spaced";
  onChange: (value: number) => void;
  children: React.ReactElement<TabProps>[];
}

export function Tabs({
  children,
  variant = "default",
  dark = false,
  classes = {},
  value,
  onChange,
  ...other
}: TabsProps) {
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
        boxShadow: dark
          ? `0px 3px 2px ${theme.colors.scales.neutral.N3}`
          : "none"
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
              overflowX: "hidden",
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
              onParentSelect: () => {
                onChange(i);
              }
            });
          })}
          {slider.left !== null && slider.right !== null && (
            <div
              style={{ left: slider.left + "px", right: slider.right + "px" }}
              css={[
                {
                  height: "3px",
                  bottom: 0,
                  // marginRight: `calc(${theme.spaces.sm} - 4px)`,
                  // marginLeft: `calc(${theme.spaces.sm} - 4px)`,
                  // [theme.breakpoints.lg]: {
                  //   marginRight: `calc(${theme.spaces.md} - 4px)`,
                  //   marginLeft: `calc(${theme.spaces.md} - 4px)`
                  // },
                  position: "absolute",
                  // borderTopRightRadius: theme.radii.sm,
                  // borderTopLeftRadius: theme.radii.sm,
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
}

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

export const Tab = React.forwardRef(
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
            variant="subtitle2"
            component="span"
            css={{
              color: "inherit"
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

interface TabContentProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
}

export const TabPanel = ({ id, ...other }: TabContentProps) => (
  <div id={id} role="tabpanel" aria-labelledby={id + "-tab"} {...other} />
);
