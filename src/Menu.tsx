/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import PropTypes from "prop-types";
import { RequestCloseContext } from "./Sheet";
import { useTheme } from "./Theme/Providers";

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
      tabIndex={0}
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
        outline: "none",
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
  onSelect: () => void;
  /** Disable this menu item */
  disabled?: boolean;
  /** Pass in a string to use standard text styles. Otherwise, pass in any other node. */
  children: React.ReactNode;
  onKeyDown: (e: React.KeyboardEvent) => void;
  ref: React.RefObject<HTMLDivElement>;
  /** Provide a custom component. Eg., ReactRouter Link */
  component?: React.ReactType<any>;
  [key: string]: any;
}

export const MenuItem: React.FunctionComponent<MenuItemProps> = ({
  focus,
  onFocus,
  onKeyDown,
  onSelect,
  onClick,
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

  React.useEffect(() => {
    if (focus && localRef.current) {
      localRef.current.focus();
    }
  }, [focus, localRef]);

  const isLink = Component === "a" || other.href || other.to;

  function select() {
    if (onSelect) {
      onSelect();
    }

    closeParent();
  }

  return (
    <Component
      css={{
        cursor: "pointer",
        padding: `calc(${theme.spaces.sm} + 0.25rem) calc(${
          theme.spaces.md
        } + 0.25rem)`,
        [theme.breakpoints.sm]: {
          padding: `${theme.spaces.sm} ${theme.spaces.md}`
        },
        opacity: disabled ? 0.3 : 1,
        display: "block",
        textDecoration: "none",
        WebkitTapHighlightColor: "transparent",
        color: theme.colors.text.default,
        pointerEvents: disabled ? "none" : "initial",
        "@media (hover: hover)": {
          ":hover": {
            background: dark
              ? theme.colors.background.tint2
              : theme.colors.background.tint1
          }
        },
        ":focus": {
          backgroundColor: theme.colors.background.tint1,
          outline: "none"
        },
        ":active": {
          backgroundColor: theme.colors.background.tint2
        },
        [theme.breakpoints.md]: {
          padding: `${theme.spaces.xs} ${theme.spaces.md}`
        }
      }}
      // onFocus={onFocus}
      role={role}
      tabIndex={0}
      data-trigger-close={true}
      onClick={(e: React.MouseEvent) => {
        if (onClick) onClick(e);
        select();
      }}
      onKeyDown={(e: React.KeyboardEvent) => {
        e.stopPropagation();
        if (onKeyDown) onKeyDown(e);
        if (e.key === "Enter") {
          if (!isLink) {
            e.preventDefault();
          }
          select();
        }
      }}
      ref={localRef}
      {...other}
    >
      {typeof children === "string" ? (
        <Text css={{ color: "inherit" }}>{children}</Text>
      ) : (
        children
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
        padding: `${theme.spaces.xs} ${theme.spaces.md}`,
        paddingTop: theme.spaces.md
      }}
      {...props}
    />
  );
};

MenuLabel.propTypes = {
  children: PropTypes.node
};
