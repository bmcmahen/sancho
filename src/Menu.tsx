/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import PropTypes from "prop-types";
import { RequestCloseContext } from "./Sheet";
import { useTheme } from "./Theme/Providers";
import { noOp } from "./misc/noop";
import { useTouchable, OnPressFunction } from "./Hooks/use-touchable";
import { mergeRefs } from "./Hooks/merge-refs";

const KeyCodes = {
  ArrowUp: 38,
  ArrowDown: 40,
  Home: 36,
  End: 35
};

type ChildrenType = React.ReactElement<MenuItemProps>;

export interface MenuListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A combination of MenuItem, MenuLabel, and MenuDivider children */
  children: ChildrenType | Array<ChildrenType>;
  /** Useful if you are providing your own MenuItem children */
  focusableChildren?: React.ComponentType<any>[];
}

export const MenuList: React.FunctionComponent<MenuListProps> = ({
  children,
  focusableChildren = [],
  ...other
}) => {
  const theme = useTheme();
  const disabled = new Map();
  const [focusIndex, setFocusIndex] = React.useState<number | null>(null);
  const kids = React.Children.toArray(children);

  const focusComponents = [MenuItem, ...focusableChildren];
  const focusableItems = kids.filter(
    kid =>
      React.isValidElement(kid) &&
      focusComponents.indexOf(kid.type as React.ComponentType) > -1
  );

  const lastIndex = focusableItems.length - 1;
  const firstIndex = 0;

  return (
    <div
      role="menu"
      onKeyDown={(e: React.KeyboardEvent) => {
        if (
          e.keyCode === KeyCodes.ArrowDown ||
          (e.keyCode === KeyCodes.ArrowUp && focusIndex === null)
        ) {
          e.preventDefault();
          setFocusIndex(0);
        }
      }}
      css={{
        minWidth: "200px",
        display: "block",
        padding: `${theme.spaces.sm} 0`
      }}
      {...other}
    >
      {kids.map(kid => {
        if (!React.isValidElement(kid)) {
          return null;
        }

        const i = focusableItems.indexOf(kid);

        if (i < 0) {
          return kid;
        }

        const k = kid as React.ReactElement<any>;

        disabled.set(i, k.props.disabled);

        function focusDown(current: number) {
          const next = current + 1 > lastIndex ? firstIndex : current + 1;
          if (disabled.get(next)) {
            focusDown(next);
          } else {
            setFocusIndex(next);
          }
        }

        function focusUp(current: number) {
          const next = current - 1 < firstIndex ? lastIndex : current - 1;
          if (disabled.get(next)) {
            focusUp(next);
          } else {
            setFocusIndex(next);
          }
        }

        const index = focusIndex || 0;

        return React.cloneElement(k, {
          focus: i === focusIndex,
          onFocus: () => {
            if (i !== focusIndex) {
              setFocusIndex(i);
            }
          },
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.keyCode === KeyCodes.ArrowDown) {
              e.preventDefault();
              focusDown(index);
            } else if (e.keyCode === KeyCodes.ArrowUp) {
              e.preventDefault();
              focusUp(index);
            } else if (e.keyCode === KeyCodes.Home) {
              e.preventDefault();
              setFocusIndex(firstIndex);
            } else if (e.keyCode === KeyCodes.End) {
              e.preventDefault();
              setFocusIndex(lastIndex);
            }
          }
        });
      })}
    </div>
  );
};

MenuList.propTypes = {
  children: PropTypes.node,
  focusableChildren: PropTypes.arrayOf(PropTypes.elementType)
};

export interface MenuRenderProps extends React.HTMLAttributes<Element> {
  ref: React.RefObject<HTMLDivElement>;
}

interface MenuItemProps extends Partial<MenuItemPropsCloned> {}

interface MenuItemPropsCloned extends React.HTMLAttributes<Element> {
  focus: boolean;
  onFocus: () => void;
  /** Called when the menu item is selected. Generally use this instead of onClick. */
  onPress?: OnPressFunction;
  /** Disable this menu item */
  disabled?: boolean;
  /** Pass in a string to use standard text styles. Otherwise, pass in any other node. */
  children: React.ReactNode;
  onKeyDown: (e: React.KeyboardEvent) => void;
  ref: React.RefObject<HTMLDivElement>;
  /** Provide a custom component. Eg., ReactRouter Link */
  component?: React.ReactType<any>;
  /** optional content to appear to the right of the menu text */
  contentAfter?: React.ReactNode;
  /** optional content to appear to the left of the menu text */
  contentBefore?: React.ReactNode;
  [key: string]: any;
}

export const MenuItem: React.FunctionComponent<MenuItemProps> = ({
  focus,
  onFocus,
  onKeyDown,
  contentBefore,
  contentAfter,
  onPress = noOp,
  component: Component = "div",
  role = "menuitem",
  children,
  disabled,
  ...other
}) => {
  const theme = useTheme();
  const dark = theme.colors.mode === "dark";
  const localRef = React.useRef<HTMLDivElement>(null);
  const closeParent = React.useContext(RequestCloseContext);
  const isLink = Component === "a" || other.href || other.to;

  const {
    bind: {
      ref: bindTouchableRef,
      onKeyDown: touchOnKeyDown,
      ...bindTouchableCallbacks
    },
    hover,
    active
  } = useTouchable({
    onPress: select,
    disabled,
    behavior: isLink ? "link" : "button"
  });

  React.useEffect(() => {
    if (focus && localRef.current) {
      localRef.current.focus();
    }
  }, [focus, localRef]);

  function select() {
    onPress();
    closeParent();
  }

  return (
    <Component
      {...bindTouchableCallbacks}
      onTouchStart={noOp}
      css={[
        {
          cursor: "pointer",
          padding: `calc(${theme.spaces.sm} + 0.25rem) calc(${
            theme.spaces.md
          } + 0.25rem)`,
          [theme.mediaQueries.sm]: {
            padding: `${theme.spaces.sm} ${theme.spaces.md}`
          },
          opacity: disabled ? 0.3 : 1,
          display: "flex",
          textDecoration: "none",
          transition: "background-color 0.1s ease",
          WebkitTapHighlightColor: "transparent",
          color: theme.colors.text.default,
          alignItems: "center",
          ":focus": {
            outline: theme.outline
          },
          ":focus:not([data-focus-visible-added])": {
            outline: "none"
          },
          [theme.mediaQueries.md]: {
            padding: `${theme.spaces.xs} ${theme.spaces.md}`
          }
        },
        hover && {
          background: dark
            ? theme.colors.background.tint2
            : theme.colors.background.tint1
        },
        active && {
          background: theme.colors.background.tint2
        }
      ]}
      role={role}
      tabIndex={disabled ? -1 : 0}
      data-trigger-close={true}
      onKeyDown={(e: React.KeyboardEvent) => {
        e.stopPropagation();
        touchOnKeyDown(e);
        if (onKeyDown) onKeyDown(e);
      }}
      ref={mergeRefs(localRef, bindTouchableRef)}
      {...other}
    >
      {contentBefore}
      {typeof children === "string" ? (
        <Text
          wrap={false}
          css={{
            paddingLeft: contentBefore ? theme.spaces.md : 0,
            paddingRight: contentAfter ? theme.spaces.md : 0,
            flex: 1,
            color: "inherit"
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
      {typeof contentAfter === "string" ? (
        <Text muted>{contentAfter}</Text>
      ) : (
        contentAfter
      )}
    </Component>
  );
};

MenuItem.propTypes = {
  onSelect: PropTypes.func,
  component: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node
};

interface MenuDividerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MenuDivider(props: MenuDividerProps) {
  const theme = useTheme();
  return (
    <div
      css={{
        height: 0,
        margin: `${theme.spaces.sm} 0`,
        overflow: "hidden",
        borderTop: "1px solid",
        borderColor: theme.colors.border.muted
      }}
      {...props}
    />
  );
}

interface MenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The name of the label */
  children?: React.ReactNode;
}

export const MenuLabel: React.FunctionComponent<MenuLabelProps> = props => {
  const theme = useTheme();
  return (
    <Text
      variant="uppercase"
      css={{
        padding: `${theme.spaces.xs} ${theme.spaces.md}`
      }}
      {...props}
    />
  );
};

MenuLabel.propTypes = {
  children: PropTypes.node
};
