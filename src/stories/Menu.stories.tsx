/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { MenuList, MenuItem, MenuDivider } from "../Menu";
import { storiesOf } from "@storybook/react";

export const MenuStories = storiesOf("MenuList", module).add(
  "keyboard controls",
  () => {
    return (
      <div>
        <MenuList>
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
          <MenuItem>Hello world number 2</MenuItem>
          <MenuItem>Hello world number 2</MenuItem>
        </MenuList>
      </div>
    );
  }
);
