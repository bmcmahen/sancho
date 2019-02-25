/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";
import * as React from "react";
import VisuallyHidden from "@reach/visually-hidden";

const spin = keyframes`
  to { 
    transform: rotate(360deg); 
  }
`;

interface SpinnerProps {}

// spinner css based on one provided by bootstrap
// https://getbootstrap.com/docs/4.3/components/spinners/

export function Spinner({  }: SpinnerProps) {
  return (
    <div
      role="status"
      css={css`
        display: inline-block;
        width: 2rem;
        height: 2rem;
        vertical-align: text-bottom;
        border: 0.25em solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: ${spin} 0.75s linear infinite;
      `}
    >
      <VisuallyHidden>Loading...</VisuallyHidden>
    </div>
  );
}
