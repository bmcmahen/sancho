/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { IconButton, CloseButton } from "../IconButton";
import { storiesOf } from "@storybook/react";
import { ButtonSize } from "../Button";
import { ToggleDarkMode } from "./ToggleDarkMode";
import {
  FiActivity,
  FiMail,
  FiAirplay,
  FiMaximize,
  FiFeather
} from "react-icons/fi";

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
  })
  .add("custom icon", () => (
    <React.Fragment>
      <IconButton
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-cloud-snow"
          >
            <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
            <line x1="8" y1="16" x2="8" y2="16" />
            <line x1="8" y1="20" x2="8" y2="20" />
            <line x1="12" y1="18" x2="12" y2="18" />
            <line x1="12" y1="22" x2="12" y2="22" />
            <line x1="16" y1="16" x2="16" y2="16" />
            <line x1="16" y1="20" x2="16" y2="20" />
          </svg>
        }
        size="md"
        label="Custom icon"
      />
      <IconButton
        variant="outline"
        css={{ margin: "1rem" }}
        icon={<FiFeather />}
        label="Menu"
      />
    </React.Fragment>
  ));
