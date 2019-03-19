/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import theme from "./Theme";
import PropTypes from "prop-types";
import { MenuLabel } from "./Menu";

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const List: React.FunctionComponent<ListProps> = ({
  children,
  ...other
}) => {
  return <nav {...other}>{children}</nav>;
};

List.propTypes = {
  /** A series of ListItem elements */
  children: PropTypes.node
};

interface ListItemProps extends React.HTMLAttributes<any> {
  component?: React.ReactType<any>;
  contentBefore?: React.ReactNode;
  contentAfter?: React.ReactNode;
  interactive?: boolean;
  children?: React.ReactNode;
  wrap?: boolean;
  primary: string | React.ReactNode;
  secondary?: string | React.ReactNode;
  [key: string]: any; // back hack to permit things like to='/page'
}

export const ListItem: React.FunctionComponent<ListItemProps> = ({
  primary,
  secondary,
  contentBefore,
  interactive = true,
  children,
  wrap = true,
  contentAfter,
  component: Component = "div",
  ...other
}) => {
  const interactiveProps = interactive
    ? {
        role: "button",
        tabIndex: 0
      }
    : {};

  return (
    <Component
      className="ListItem"
      css={[
        {
          display: "block",
          textDecoration: "none",
          outline: "none",
          padding: theme.spaces.md,
          background: "transparent",
          borderBottom: "1px solid",
          borderColor: theme.colors.border.muted,
          WebkitTapHighlightColor: "transparent",
          transition: "background 0.07s ease",
          [theme.breakpoints.md]: {
            paddingLeft: theme.spaces.lg,
            paddingRight: theme.spaces.lg
          },
          ":last-child": {
            borderBottom: "none"
          }
        },
        interactive && {
          cursor: "pointer",
          ":active": {
            background: theme.colors.background.tint1
          },
          ":focus": {
            background: theme.colors.background.tint1
          },
          ["@media (hover: hover)"]: {
            ":hover": {
              background: theme.colors.background.tint1
            },
            ":active": {
              background: theme.colors.background.tint2
            }
          }
        }
      ]}
      {...interactiveProps}
      {...other}
    >
      <div
        className="ListItem__container"
        css={{ display: "flex", alignItems: "center" }}
      >
        {contentBefore && (
          <div
            className="ListItem__content-before"
            css={{ marginRight: theme.spaces.md }}
          >
            {contentBefore}
          </div>
        )}

        <div
          className="ListItem__content"
          css={{ flex: 1, overflow: "hidden" }}
        >
          <Text
            className="ListItem__primary"
            wrap={wrap}
            variant="body"
            css={{ display: "block", fontWeight: 500 }}
          >
            {primary}
          </Text>
          {secondary && (
            <Text
              className="ListItem__secondary"
              wrap={wrap}
              css={{ display: "block", fontSize: theme.sizes[0] }}
              variant="body"
              muted
            >
              {secondary}
            </Text>
          )}
          {children}
        </div>
        {contentAfter && (
          <div
            className="ListItem__content-after"
            css={{ flex: "0 0 auto", marginLeft: theme.spaces.md }}
          >
            {contentAfter}
          </div>
        )}
      </div>
    </Component>
  );
};

ListItem.propTypes = {
  /** The primary text content of the list item */
  primary: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /** the secondary text content */
  secondary: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** An icon or avatar to appear to the left of the text content */
  contentBefore: PropTypes.node,
  /** an icon to appear to the right of the text content */
  contentAfter: PropTypes.node,
  /** whether primary and secondary text should be wrapped */
  wrap: PropTypes.bool,
  /** optional third row of content */
  children: PropTypes.node,
  /** whether the list item is interactive (ie., can be clicked as a button) */
  interactive: PropTypes.bool
};

interface ListSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children?: React.ReactNode;
  sticky?: boolean;
}

export const ListSection: React.FunctionComponent<ListSectionProps> = ({
  title,
  children,
  sticky = true,
  ...other
}) => {
  return (
    <div
      css={{
        ":first-child > *": {
          borderTop: "none"
        }
      }}
    >
      <MenuLabel
        css={{
          position: sticky ? "sticky" : "static",
          top: 0,
          backgroundColor: sticky ? "white" : "transparent",
          borderTop: `1px solid ${theme.colors.border.muted}`,
          borderBottom: `1px solid ${theme.colors.border.muted}`,
          padding: theme.spaces.sm,
          [theme.breakpoints.md]: {
            paddingLeft: theme.spaces.lg,
            paddingRight: theme.spaces.lg
          }
        }}
        {...other}
      >
        {title}
      </MenuLabel>
      {children}
    </div>
  );
};

ListSection.propTypes = {
  /** A title of the section */
  title: PropTypes.string.isRequired,
  /** whether the title should stick to the top of the scrollable content */
  sticky: PropTypes.bool,
  children: PropTypes.node
};
