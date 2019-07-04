/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";
import * as React from "react";
import VisuallyHidden from "@reach/visually-hidden";
import PropTypes from "prop-types";
import { Text } from "./Text";
import { useTheme } from "./Theme/Providers";

const spin = keyframes`
  to { 
    transform: rotate(360deg); 
  }
`;

const sizeStyles = {
  xs: css({ width: "0.5rem", height: "0.5rem" }),
  sm: css({ width: "0.75rem", height: "0.75rem" }),
  md: css({ width: "1rem", height: "1rem" }),
  lg: css({ width: "1.25rem", height: "1.25rem" }),
  xl: css({ width: "1.5rem", height: "1.5rem" })
};

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The delay (in ms) before the spinner will appear */
  delay?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Attempt to center the spinner in the parent element */
  center?: boolean;
  /** Use an optional label */
  label?: string;
}

// spinner css based on one provided by bootstrap
// https://getbootstrap.com/docs/4.3/components/spinners/

export const Spinner: React.FunctionComponent<SpinnerProps> = ({
  delay = 400,
  size = "md",
  center,
  label,
  ...other
}) => {
  const theme = useTheme();
  const [show, setShow] = React.useState(delay === 0 ? true : false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    <div
      className="Spinner"
      css={[
        {
          opacity: show ? 1 : 0,
          display: "inline-block",
          transition: "opacity 0.4s cubic-bezier(0.35,0,0.25,1)"
        },
        center && {
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center"
        }
      ]}
      {...other}
    >
      <div
        className="Spinner__container"
        role="status"
        css={{
          color: theme.colors.text.default,
          textAlign: "center",
          display: "inline-block"
        }}
      >
        <div
          className="Spinner__spinner"
          css={[
            css`
              display: inline-block;
              vertical-align: text-bottom;
              border: 0.15em solid currentColor;
              border-right-color: transparent;
              border-radius: 50%;
              animation: ${spin} 0.75s linear infinite;
            `,
            sizeStyles[size]
          ]}
        />
        {label ? (
          <Text
            className="Spinner__label"
            wrap={false}
            css={{ display: "block", marginTop: theme.spaces.sm }}
            variant="subtitle"
          >
            {label}
          </Text>
        ) : (
          <VisuallyHidden>{"Loading"}</VisuallyHidden>
        )}
      </div>
    </div>
  );
};

Spinner.propTypes = {
  delay: PropTypes.number,
  center: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"])
};
