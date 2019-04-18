/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { GestureSheet, SheetPositions } from "../GestureSheet";
import { Button } from "../Button";

export const SheetExamples = storiesOf("GestureSheet", module).add(
  "Different positions",
  () => {
    return (
      <Example position="left">
        <div css={{ height: "300px" }}>
          Hello world this is some wider text right here
        </div>
      </Example>
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
