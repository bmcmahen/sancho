/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import { Text } from "./Text";

interface BreadcrumbProps extends React.OlHTMLAttributes<HTMLOListElement> {
  children: React.ReactElement<BreadcrumbItemProps>[];
}

export function Breadcrumb({ children }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol
        css={{
          listStyle: "none",
          flexWrap: "wrap",
          display: "inline-flex",
          margin: 0,
          padding: `${theme.spaces.sm} ${theme.spaces.md}`,
          background: "white",
          borderRadius: theme.radii.sm
        }}
      >
        {React.Children.map(children, (child, i) => {
          return React.cloneElement(child, {
            "aria-current":
              i === React.Children.count(children) - 1 ? "page" : undefined
          });
        })}
      </ol>
    </nav>
  );
}

interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

export function BreadcrumbItem({ children, ...other }: BreadcrumbItemProps) {
  const current = other["aria-current"];
  return (
    <li
      css={{
        display: "flex",
        alignItems: "center"
      }}
      {...other}
    >
      <Text component="div" variant="body">
        {children}
      </Text>
      {!current && <BreadCrumbDivider />}
    </li>
  );
}

const BreadCrumbDivider = ({ inverted = false }: { inverted?: Boolean }) => (
  <div
    aria-hidden
    css={{
      margin: `0 ${theme.spaces.sm}`,
      color: !inverted ? theme.colors.text.muted : "white"
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-chevron-right"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </div>
);
