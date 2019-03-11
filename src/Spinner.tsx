/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";
import * as React from "react";
import VisuallyHidden from "@reach/visually-hidden";
import PropTypes from "prop-types";

const spin = keyframes`
  to { 
    transform: rotate(360deg); 
  }
`;

interface SpinnerProps {
  delay?: number;
}

// spinner css based on one provided by bootstrap
// https://getbootstrap.com/docs/4.3/components/spinners/

export const Spinner: React.FunctionComponent<SpinnerProps> = ({
  delay = 400,
  ...other
}) => {
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
      css={{
        opacity: show ? 1 : 0,
        display: "inline-block",
        transition: "opacity 0.4s cubic-bezier(0.35,0,0.25,1)"
      }}
    >
      <div
        role="status"
        css={css`
          opacity: ${show ? 1 : 0};
          display: inline-block;
          width: 1.5rem;
          height: 1.5rem;
          transition: opacity 0.3s ease;
          vertical-align: text-bottom;
          border: 0.2em solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          animation: ${spin} 0.75s linear infinite;
        `}
        {...other}
      >
        <VisuallyHidden>Loading...</VisuallyHidden>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  /** The delay (in ms) before the spinner will appear */
  delay: PropTypes.number
};
