/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Popover } from "../Popover";
import { Button } from "../Button";
import { Tooltip } from "../Tooltip";
import { storiesOf } from "@storybook/react";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { IconButton } from "../IconButton";
import { IconArrowRight } from "../Icons";
import { DarkMode } from "../Theme/Providers";

export const TooltipStories = storiesOf("Tooltip", module)
  .add("basic", () => {
    return (
      <div css={{ padding: "100px" }}>
        <Tooltip content="This is some tooltip content">
          <Button>Hello world. Hover me!!</Button>
        </Tooltip>
      </div>
    );
  })
  .add("hover effects remain", () => {
    return (
      <div css={{ padding: "100px" }}>
        <Tooltip content="This is some tooltip content">
          <IconButton variant="ghost" label="hello" icon={<IconArrowRight />} />
        </Tooltip>
      </div>
    );
  })
  .add("works with dark mode wrapper", () => {
    return (
      <div css={{ padding: "100px" }}>
        <Tooltip content="This is some tooltip content">
          <DarkMode>
            <IconButton
              variant="ghost"
              label="hello"
              icon={<IconArrowRight />}
            />
          </DarkMode>
        </Tooltip>
      </div>
    );
  })
  .add("delay show / hide", () => {
    return (
      <div css={{ padding: "100px" }}>
        <Tooltip
          delayIn={1000}
          delayOut={800}
          content="This is some tooltip content"
        >
          <Button>Hello world. Hover me!!</Button>
        </Tooltip>
      </div>
    );
  });
