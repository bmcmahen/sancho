/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { GestureSheet, SheetPositions } from "../GestureSheet";
import { Button } from "../Button";

export const SheetExamples = storiesOf("GestureSheet", module).add(
  "Different positions",
  () => {
    return <Example>Hello world this is some wider text right here</Example>;
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
        onRequestClose={() => setShow(false)}
        isOpen={show}
        position={position}
      >
        {children}
      </GestureSheet>
    </div>
  );
};
