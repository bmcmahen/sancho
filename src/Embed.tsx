/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";

interface EmbedProps extends React.HTMLAttributes<Element> {
  width: number;
  height: number;
}

export function getEmbedStyles(width: number, height: number) {
  const percentage = (height / width) * 100;
  return css`
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    & > * {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
    ::before {
      display: block;
      content: "";
      padding-top: ${percentage}%;
    }
  `;
}

export function Embed({ width = 4, height = 3, ...other }: EmbedProps) {
  return <div css={getEmbedStyles(width, height)} {...other} />;
}
