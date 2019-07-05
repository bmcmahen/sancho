/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Button } from "../Button";
import { storiesOf } from "@storybook/react";
import { useToast } from "../Toast";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { useConfirmation } from "../Confirmation";

function Example() {
  const toast = useToast();
  return (
    <Button
      onClick={() => {
        toast({
          duration: null,
          title: "Hello world",
          subtitle:
            "Excepteur exercitation eu duis reprehenderit irure sint laboris labore id id aute nulla commodo."
        });
      }}
    >
      Show toast
    </Button>
  );
}

function Confirmation() {
  const confirm = useConfirmation();

  return (
    <Button
      onClick={() => {
        confirm({
          onCancel: () => {
            console.log("cancel");
          },
          onConfirm: () => {
            window.alert("DELETE!");
          },
          title: "Are you sure about that?",
          subtitle: "This action cannot be undone, so be careful!."
        });
      }}
    >
      Show toast
    </Button>
  );
}

export const ToastStories = storiesOf("Toast", module)
  .add("basic", () => {
    return (
      <div css={{ PADDING: "3REM" }}>
        <Example />
      </div>
    );
  })
  .add("confirmation", () => (
    <div css={{ PADDING: "3REM" }}>
      <Confirmation />
    </div>
  ));
