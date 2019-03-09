/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import theme from "./Theme";
import PropTypes from "prop-types";

export interface ListProps {}

export const List: React.FunctionComponent<ListProps> = ({
  children,
  ...other
}) => {
  return <nav {...other}>{children}</nav>;
};

List.propTypes = {
  /** A series of ListItem elements */
  children: PropTypes.element
};

interface ListItemProps extends React.HTMLAttributes<any> {
  component?: React.ReactType<any>;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  wrap?: boolean;
  primary: string | React.ReactNode;
  secondary?: string | React.ReactNode;
  [key: string]: any; // back hack to permit things like to='/page'
}

export const ListItem: React.FunctionComponent<ListItemProps> = ({
  primary,
  secondary,
  iconBefore,
  wrap = true,
  iconAfter,
  component: Component = "div",
  ...other
}) => {
  return (
    <Component
      css={{
        display: "block",
        textDecoration: "none",
        outline: "none",
        padding: theme.spaces.md,
        cursor: "pointer",
        background: "transparent",
        borderBottom: "1px solid",
        borderColor: theme.colors.border.muted,
        transition: "background 0.07s ease",
        ":last": {
          borderBottom: "none"
        },
        ":active": {
          background: theme.colors.background.tint1
        },
        ":focus": {
          background: theme.colors.background.tint1
        }
      }}
      role="button"
      tabIndex={0}
      {...other}
    >
      <div css={{ display: "flex", alignItems: "center" }}>
        {iconBefore && (
          <div css={{ marginRight: theme.spaces.md }}>{iconBefore}</div>
        )}

        <div css={{ flex: 1, overflow: "hidden" }}>
          <Text
            wrap={wrap}
            variant="body"
            css={{ display: "block", fontWeight: 500 }}
          >
            {primary}
          </Text>
          {secondary && (
            <Text wrap={wrap} css={{ display: "block" }} variant="body" muted>
              {secondary}
            </Text>
          )}
        </div>
        {iconAfter && (
          <div css={{ flex: "0 0 auto", marginLeft: theme.spaces.md }}>
            {iconAfter}
          </div>
        )}
      </div>
    </Component>
  );
};

ListItem.propTypes = {
  /** The primary text content of the list item */
  primary: PropTypes.oneOf([PropTypes.string, PropTypes.node]).isRequired,
  /** the secondary text content */
  secondary: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
  /** An icon or avatar to appear to the left of the text content */
  iconBefore: PropTypes.node,
  /** an icon to appear to the right of the text content */
  iconAfter: PropTypes.node,
  /** whether primary and secondary text should be wrapped */
  wrap: PropTypes.bool
};
