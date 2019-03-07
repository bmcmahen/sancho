/** @jsx jsx */
import { jsx, css, SerializedStyles } from "@emotion/core";
import * as React from "react";
import { Button, ButtonIntent, ButtonVariant, ButtonSize } from "../Button";
import { storiesOf } from "@storybook/react";

export const ButtonStories = storiesOf("Button", module).add("basic", () => {
  const sizes: Array<ButtonSize> = ["xs", "sm", "md", "lg", "xl"];

  const appearance: Array<ButtonVariant> = ["default", "ghost", "outline"];
  const intents: Array<ButtonIntent> = [
    "none",
    "primary",
    "success",
    "danger",
    "warning"
  ];

  return (
    <div>
      {appearance.map(appearance => (
        <div key={appearance}>
          {sizes.map(size => (
            <div key={size} style={{ padding: "0.5rem" }}>
              {intents.map(intent => (
                <Button
                  key={size + appearance}
                  size={size}
                  css={{ marginRight: "1rem", textTransform: "capitalize" }}
                  variant={appearance}
                  intent={intent}
                  onClick={() => alert("hello there")}
                >
                  {intent}
                </Button>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
});
