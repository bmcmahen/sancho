/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import { Text } from "./Text";
import PropTypes, { string } from "prop-types";

interface BreadcrumbsProps extends React.OlHTMLAttributes<HTMLOListElement> {
  size?: "md" | "lg";
  children:
    | React.ReactElement<BreadcrumbItemProps>
    | React.ReactElement<BreadcrumbItemProps>[];
  overflowX?: number;
}

export const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps> = ({
  children,
  size = "md",
  overflowX,
  ...other
}) => {
  return (
    <nav
      className="Breadcrumbs"
      aria-label="breadcrumb"
      css={{
        maxWidth: "100%",
        overflow: overflowX ? "scroll" : "hidden",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        borderRadius: theme.radii.sm,
        msOverflowStyle: "none",
        "::-webkit-scrollbar": {
          width: 0,
          height: 0
        }
      }}
    >
      <ol
        className="Breadcrumbs__list"
        css={{
          listStyle: "none",
          whiteSpace: "nowrap",
          display: "inline-flex",
          boxSizing: "border-box",
          overflow: "hidden",
          maxWidth: overflowX ? undefined : "100%",
          margin: 0,
          padding: `${theme.spaces.sm} ${theme.spaces.md}`,
          borderRadius: theme.radii.md
        }}
        {...other}
      >
        {React.Children.map(children, (child, i) => {
          if (!React.isValidElement(child)) {
            return child;
          }

          return React.cloneElement(child as any, {
            size,
            "aria-current":
              i === validChildrenCount(children) - 1 ? "page" : undefined
          });
        })}
      </ol>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  /** A list of BreadcrumbItem children */
  children: PropTypes.node
};

function validChildrenCount(children: any) {
  return React.Children.toArray(children).filter(child =>
    React.isValidElement(child)
  ).length;
}

interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  inverted?: boolean;
  size?: "md" | "lg";
}

export const BreadcrumbItem: React.FunctionComponent<BreadcrumbItemProps> = ({
  children,
  inverted,
  size = "md",
  ...other
}) => {
  const current = other["aria-current"];
  return (
    <li
      className="BreadcrumbItem"
      css={{
        flex: "0 1 auto",
        overflow: "hidden",
        display: "flex",
        alignItems: "center"
      }}
      {...other}
    >
      <Text
        className="BreadcrumbItem__text"
        wrap={false}
        css={{
          color: inverted ? "rgba(255,255,255,0.8)" : undefined
        }}
        component="div"
        variant={size === "md" ? "body" : "h5"}
        gutter={false}
      >
        {children}
      </Text>
      {!current && <BreadcrumbDivider inverted={inverted} />}
    </li>
  );
};

BreadcrumbItem.propTypes = {
  children: PropTypes.node
};

const BreadcrumbDivider: React.FunctionComponent<{ inverted?: boolean }> = ({
  inverted = false
}) => (
  <div
    className="BreadcrumbDivider"
    aria-hidden
    css={{
      flex: "0 0 auto",
      margin: `0 ${theme.spaces.sm}`,
      color: !inverted ? theme.colors.text.muted : "rgba(255,255,255,0.8)"
    }}
  >
    <svg
      className="BreadcrumbDivider__icon"
      css={{ marginTop: "2px" }}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </div>
);

BreadcrumbDivider.propTypes = {
  inverted: PropTypes.bool
};
