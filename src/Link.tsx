/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import PropTypes from "prop-types";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** The content of the link */
  children: React.ReactNode;
  /** Use a custom component. E.g., ReactRouter Link */
  component?: React.ReactType<any>;
  [key: string]: any; // back hack to permit things like to='/page'
}

/**
 * A styled anchor element
 */
export const Link: React.FunctionComponent<LinkProps> = ({
  children,
  component: Component = "a",
  ...other
}) => {
  return (
    <Component
      css={{
        textDecoration: "none",
        color: theme.colors.palette.blue.base
      }}
      {...other}
    >
      {children}
    </Component>
  );
};

Link.propTypes = {
  component: PropTypes.any,
  children: PropTypes.node
};
