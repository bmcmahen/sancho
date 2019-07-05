/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { useState } from "react";
import * as React from "react";
import { Button } from "../Button";
import { AlertDialog } from "../AlertDialog";

function Example() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Button onPress={() => setShow(true)}>Delete</Button>

      <AlertDialog
        isOpen={show}
        confirmLabel="Delete"
        subtitle="This action cannot be undone. Proceed with caution."
        title={"Are you sure you want to delete this?"}
        onConfirm={() => {
          window.alert("DELETE");
        }}
        onClose={() => {
          setShow(false);
        }}
      />
    </div>
  );
}

export const ThemeExamples = storiesOf("AlertDialog", module).add(
  "Basic usage",
  () => <Example />
);
