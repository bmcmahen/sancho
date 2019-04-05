/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { IconButton, CloseButton } from "../IconButton";
import { storiesOf } from "@storybook/react";
import { ButtonSize } from "../Button";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { FiActivity, FiMail, FiAirplay, FiMaximize } from "react-icons/fi";

export const IconButtonStories = storiesOf("IconButton", module)
  .add("basic", () => {
    return (
      <div
        css={{
          display: "flex",
          margin: "1rem",
          "& > *": {
            margin: "0.5rem"
          }
        }}
      >
        <IconButton icon={<FiActivity />} label="Activity" />
        {["xs", "sm", "md", "lg", "xl"].map(size => {
          return (
            <IconButton
              css={{ margin: "1rem" }}
              size={size as ButtonSize}
              icon={<FiActivity />}
              label="Menu"
            />
          );
        })}
      </div>
    );
  })
  .add("sizes", () => {
    return (
      <React.Fragment>
        {["xs", "sm", "md", "lg", "xl"].map(size => {
          return (
            <IconButton
              css={{ margin: "1rem" }}
              size={size as ButtonSize}
              icon={<FiMail />}
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
              icon={<FiAirplay />}
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
              icon={<FiMaximize />}
              label="Menu"
            />
          );
        })}

        <CloseButton />
      </React.Fragment>
    );
  });
