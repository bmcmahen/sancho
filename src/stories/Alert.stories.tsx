/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Alert, AlertIntentions } from "../Alert";
import theme from "../Theme";
import { storiesOf } from "@storybook/react";
import { ToggleDarkMode } from "./ToggleDarkMode";

const appearances: Array<AlertIntentions> = [
  "info",
  "success",
  "danger",
  "question",
  "warning"
];

export const AlertStories = storiesOf("Alert", module).add(
  "color variants",
  () => (
    <ToggleDarkMode>
      {appearances.map(key => (
        <Alert
          css={{
            margin: theme.spaces.lg
          }}
          key={key}
          intent={key}
          title={"This is a " + key + " alert"}
          subtitle={
            "Culpa laborum nostrud dolore id duis adipisicing aliqua pariatur veniam. Ad Lorem dolor voluptate reprehenderit ullamco in incididunt eiusmod consectetur cupidatat occaecat incididunt."
          }
        />
      ))}

      <Alert
        css={{
          margin: theme.spaces.lg
        }}
        title={"This is an alert with a close button"}
        subtitle={
          "Culpa laborum nostrud dolore id duis adipisicing aliqua pariatur veniam. Ad Lorem dolor voluptate reprehenderit ullamco in incididunt eiusmod consectetur cupidatat occaecat incididunt."
        }
        onRequestClose={() => {
          console.log("close");
        }}
      />
    </ToggleDarkMode>
  )
);
