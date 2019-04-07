/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import PropTypes from "prop-types";
import { MenuLabel } from "./Menu";
import { useTheme } from "./Theme/Providers";
import { noOp } from "./misc/noop";

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A series of ListItem elements */
  children?: React.ReactNode;
}

export const List: React.FunctionComponent<ListProps> = ({
  children,
  ...other
}) => {
  return <nav {...other}>{children}</nav>;
};

List.propTypes = {
  children: PropTypes.node
};

interface ListItemProps extends React.HTMLAttributes<any> {
  component?: React.ReactType<any>;
  /** An icon or avatar to appear to the left of the text content */
  contentBefore?: React.ReactNode;
  /** an icon to appear to the right of the text content */
  contentAfter?: React.ReactNode;
  /** whether the list item is interactive (ie., can be clicked as a button) */
  interactive?: boolean;
  /** optional third row of content */
  children?: React.ReactNode;
  /** whether primary and secondary text should be wrapped */
  wrap?: boolean;
  /** The primary text content of the list item */
  primary: string | React.ReactNode;
  /** the secondary text content */
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
  const theme = useTheme();

  return (
    <Component
      className="ListItem"
      onTouchStart={noOp}
      css={[
        {
          display: "block",
          textDecoration: "none",
          outline: "none",
          padding: theme.spaces.md,
          background: "transparent",
          WebkitTapHighlightColor: "transparent",
          transition: "background 0.07s ease",
          [theme.mediaQueries.md]: {
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
              css={{ display: "block", fontSize: theme.fontSizes[0] }}
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
  primary: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  secondary: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  contentBefore: PropTypes.node,
  contentAfter: PropTypes.node,
  wrap: PropTypes.bool,
  children: PropTypes.node,
  interactive: PropTypes.bool
};

interface ListSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A title of the section */
  title: string;
  children?: React.ReactNode;
  /** whether the title should stick to the top of the scrollable content */
  sticky?: boolean;
}

export const ListSection: React.FunctionComponent<ListSectionProps> = ({
  title,
  children,
  sticky = true,
  ...other
}) => {
  const theme = useTheme();
  const bg = theme.colors.background.layer;
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
          backgroundColor: sticky ? bg : "transparent",
          padding: theme.spaces.sm,
          paddingLeft: theme.spaces.md,
          marginTop: theme.spaces.md,
          [theme.mediaQueries.md]: {
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
  title: PropTypes.string.isRequired,
  sticky: PropTypes.bool,
  children: PropTypes.node
};
