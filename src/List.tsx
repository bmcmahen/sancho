/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import theme from "./Theme";

export interface ListProps {}

export const List: React.FunctionComponent<ListProps> = ({
  children,
  ...other
}) => {
  return <nav {...other}>{children}</nav>;
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
