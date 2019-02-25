/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { IconButton } from "../IconButton";
import { storiesOf } from "@storybook/react";

export const IconButtonStories = storiesOf("IconButton", module).add(
  "basic",
  () => {
    return <IconButton icon="add" label="Add" />;
  }
);
