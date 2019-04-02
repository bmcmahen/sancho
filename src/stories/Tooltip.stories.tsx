/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Popover } from "../Popover";
import { Button } from "../Button";
import { Tooltip } from "../Tooltip";
import { storiesOf } from "@storybook/react";
import { ToggleDarkMode } from "./ToggleDarkMode";

export const TooltipStories = storiesOf("Tooltip", module).add("basic", () => {
  return (
    <ToggleDarkMode>
      <div css={{ padding: "300px" }}>
        <Tooltip content="This is some tooltip content">
          <Button>Hello world. Hover me!!</Button>
        </Tooltip>
      </div>
    </ToggleDarkMode>
  );
});
