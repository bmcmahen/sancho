/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { IconButton } from "../IconButton";
import { storiesOf } from "@storybook/react";
import { ButtonSize } from "../Button";
import { ToggleDarkMode } from "./ToggleDarkMode";

export const IconButtonStories = storiesOf("IconButton", module)
  .add("basic", () => {
    return <IconButton icon="add" label="Add" />;
  })
  .add("sizes", () => {
    return (
      <ToggleDarkMode>
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
          {["xs", "sm", "md", "lg", "xl"].map(size => {
            return (
              <IconButton
                variant="ghost"
                css={{ margin: "1rem" }}
                size={size as ButtonSize}
                icon={"menu"}
                label="Menu"
              />
            );
          })}
          {["xs", "sm", "md", "lg", "xl"].map(size => {
            return (
              <IconButton
                variant="outline"
                css={{ margin: "1rem" }}
                size={size as ButtonSize}
                icon={"menu"}
                label="Menu"
              />
            );
          })}
        </React.Fragment>
      </ToggleDarkMode>
    );
  });
