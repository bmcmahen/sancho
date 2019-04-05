/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "./Theme/Providers";

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
  const theme = useTheme();

  return (
    <Component
      className="Link"
      css={{
        textDecoration: "none",
        "@media (hover:hover)": {
          ":hover": {
            textDecoration: "underline"
          }
        },
        color:
          theme.colors.mode === "dark"
            ? theme.colors.palette.blue.light
            : theme.colors.palette.blue.base
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
