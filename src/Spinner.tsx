/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";
import * as React from "react";
import VisuallyHidden from "@reach/visually-hidden";

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

export function Spinner({ delay = 400, ...other }: SpinnerProps) {
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
  );
}
