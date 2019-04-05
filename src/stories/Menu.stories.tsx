/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { MenuList, MenuItem, MenuDivider, MenuLabel } from "../Menu";
import { storiesOf } from "@storybook/react";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { Text } from "../Text";
import { Icon } from "../Icon";
import { FiAirplay } from "react-icons/fi";

export const MenuStories = storiesOf("MenuList", module).add(
  "keyboard controls",
  () => {
    return (
      <MenuList css={{ maxWidth: "340px" }}>
        <MenuItem>Hello world number 1</MenuItem>
        <MenuItem>Hello world number 2</MenuItem>
        <MenuItem disabled>Hello world number 2</MenuItem>
        <MenuItem
          onSelect={() => {
            alert("selected!");
          }}
        >
          try selecting me
        </MenuItem>
        <MenuItem>Hello world number 2</MenuItem>
        <MenuDivider />
        <MenuLabel>Some label</MenuLabel>
        <MenuItem contentAfter="⌘R">Hello world number 2</MenuItem>
        <MenuItem
          contentAfter={
            <Icon>
              <FiAirplay />
            </Icon>
          }
        >
          Hello world number 2
        </MenuItem>
      </MenuList>
    );
  }
);
