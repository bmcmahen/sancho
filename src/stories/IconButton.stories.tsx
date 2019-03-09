/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { IconButton } from "../IconButton";
import { storiesOf } from "@storybook/react";
import { ButtonSize } from "../Button";

export const IconButtonStories = storiesOf("IconButton", module)
  .add("basic", () => {
    return <IconButton icon="add" label="Add" />;
  })
  .add("sizes", () => {
    return (
      <React.Fragment>
        {["xs", "sm", "md", "lg", "xl"].map(size => {
          return (
            <IconButton
              css={{ margin: "1rem" }}
              size={size as ButtonSize}
              icon={"menu"}
              label="Menu"
            />
          );
        })}
      </React.Fragment>
    );
  });
