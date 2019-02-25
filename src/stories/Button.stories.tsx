/** @jsx jsx */
import { jsx, css, SerializedStyles } from "@emotion/core";
import * as React from "react";
import { Button, ButtonType, ButtonSize } from "../Button";
import { storiesOf } from "@storybook/react";

export const ButtonStories = storiesOf("Button", module).add("basic", () => {
  const sizes: Array<ButtonSize> = ["xs", "sm", "md", "lg", "xl"];

  const appearance: Array<ButtonType> = ["default", "primary", "ghost"];

  return (
    <div>
      {appearance.map(appearance => (
        <div>
          {sizes.map(size => (
            <div key={size} style={{ padding: "0.5rem" }}>
              <Button
                key={size + appearance}
                size={size}
                css={{ textTransform: "capitalize" }}
                variant={appearance}
                onClick={() => alert("hello there")}
              >
                {appearance}
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
});
