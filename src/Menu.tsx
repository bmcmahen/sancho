/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import { Text } from "./Text";
import color from "color";
import PropTypes from "prop-types";
import { RequestCloseContext } from "./Sheet";

const KeyCodes = {
  ArrowUp: 38,
  ArrowDown: 40,
  Home: 36,
  End: 35
};

type ChildrenType = React.ReactElement<MenuItemProps>;

interface MenuListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: Array<ChildrenType>;
  focusableChildren?: React.ComponentType<any>[];
}

export const MenuList: React.FunctionComponent<MenuListProps> = ({
  children,
  focusableChildren = [],
  ...other
}) => {
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
      tabIndex={-1}
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
          onMouseEnter: () => {
            if (i !== focusIndex) {
              setFocusIndex(i);
            }
          },
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
  /** A combination of MenuItem, MenuLabel, and MenuDivider children */
  children: PropTypes.node,
  /** Useful if you are providing your own MenuItem children */
  focusableChildren: PropTypes.arrayOf(PropTypes.elementType)
};

export interface MenuRenderProps extends React.HTMLAttributes<Element> {
  ref: React.RefObject<HTMLDivElement>;
}

interface MenuItemProps extends Partial<MenuItemPropsCloned> {}

interface MenuItemPropsCloned extends React.HTMLAttributes<Element> {
  focus: boolean;
  onFocus: () => void;
  onSelect: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  onKeyDown: (e: React.KeyboardEvent) => void;
  ref: React.RefObject<HTMLDivElement>;
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
        padding: `${theme.spaces.xs} ${theme.spaces.md}`,
        opacity: disabled ? 0.3 : 1,
        display: "block",
        textDecoration: "none",
        WebkitTapHighlightColor: "transparent",
        color: theme.colors.text.default,
        pointerEvents: disabled ? "none" : "initial",
        ":focus": {
          backgroundColor: theme.colors.background.tint1,
          outline: "none"
        },
        ":active": {
          backgroundColor: color(theme.colors.background.tint1)
            .darken(0.1)
            .string()
        }
      }}
      onFocus={onFocus}
      role={role}
      tabIndex={0}
      data-trigger-close={true}
      onClick={(e: React.MouseEvent) => {
        if (onClick) onClick(e);
        select();
      }}
      onKeyDown={(e: React.KeyboardEvent) => {
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
  /** Called when the menu item is selected. Generally use this instead of onClick. */
  onSelect: PropTypes.func,
  /** Provide a custom component. Eg., ReactRouter Link */
  component: PropTypes.string,
  /** Disable this menu item */
  disabled: PropTypes.bool,
  /** Pass in a string to use standard text styles. Otherwise, pass in any other node. */
  children: PropTypes.node
};

interface MenuDividerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MenuDivider(props: MenuDividerProps) {
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

interface MenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MenuLabel: React.FunctionComponent<MenuLabelProps> = props => {
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
  /** The name of the label */
  children: PropTypes.node
};
