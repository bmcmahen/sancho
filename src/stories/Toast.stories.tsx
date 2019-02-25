/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Button } from "../Button";
import Toast from "../Toast";
import { storiesOf } from "@storybook/react";

export const ToastStories = storiesOf("Toast", module).add("basic", () => {
  return (
    <div css={{ maxWidth: "400px", margin: "3rem" }}>
      <Button
        onClick={() => {
          Toast({
            duration: null,
            title: "Hello world",
            subtitle:
              "Excepteur exercitation eu duis reprehenderit irure sint laboris labore id id aute nulla commodo."
          });
        }}
      >
        Show toast
      </Button>
    </div>
  );
});
