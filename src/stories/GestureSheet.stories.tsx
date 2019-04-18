/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { GestureSheet, SheetPositions } from "../GestureSheet";
import { Button } from "../Button";

export const SheetExamples = storiesOf("GestureSheet", module).add(
  "Different positions",
  () => {
    const positions: SheetPositions[] = ["top", "left", "right", "bottom"];

    const examples = positions.map(position => {
      return (
        <React.Fragment key={position}>
          <Example position={position} label={position}>
            <div css={{ minHeight: "300px" }}>
              Helloooo world! what is up?
              <button>one</button>
              <button>two</button>
              <button>tjree</button>
              <button>four</button>
            </div>
          </Example>
        </React.Fragment>
      );
    });

    return (
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          "& > *": {
            margin: "1rem",
            width: "200px"
          }
        }}
      >
        {examples}
      </div>
    );
  }
);

const Example = ({
  label = "show",
  position = "left",
  children
}: {
  position?: SheetPositions;
  label?: string;
  children: React.ReactNode;
}) => {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setShow(true)}>{label}</Button>
      <GestureSheet
        onRequestClose={() => {
          console.log("close");
          setShow(false);
        }}
        isOpen={show}
        position={position}
      >
        {children}
      </GestureSheet>
    </div>
  );
};
