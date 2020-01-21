/** @jsx jsx */
import { useState } from 'react';
import { jsx } from "@emotion/core";
import { MenuList, MenuItem, MenuDivider, MenuLabel } from "../Menu";
import { Button } from "../Button";
import { storiesOf } from "@storybook/react";
import { IconAirplay, IconUser, IconAlertCircle, IconDelete } from "../Icons";

export const MenuStories = storiesOf("MenuList", module)
  .add("keyboard controls", () => {
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
        <MenuItem contentAfter={<IconAirplay />}>Hello world number 2</MenuItem>
      </MenuList>
    );
  })
  .add("with icons", () => {
    return (
      <MenuList css={{ maxWidth: "400px", width: "100%" }}>
        <MenuItem contentBefore={<IconUser />}>Share</MenuItem>
        <MenuItem contentBefore={<IconAlertCircle />}>Alert</MenuItem>
        <MenuDivider />
        <MenuLabel>Danger actions</MenuLabel>
        <MenuItem contentAfter="⌘R" contentBefore={<IconDelete />}>
          Delete with an extrodinarily long title
        </MenuItem>
        <MenuItem contentAfter="⌘R">
          Delete with an extrodinarily long title
        </MenuItem>
        <MenuItem>
          Delete with an extrodinarily long title that still overflows
        </MenuItem>
      </MenuList>
    );
  })
  .add("Conditional items", () => {
    return <ConditionalMenuList />;
  });

  const ConditionalMenuList = () => {
    const [showItem, setShowItem] = useState(false);

    return (
      <div>
        <Button onClick={() => setShowItem(!showItem)}>Toggle list item appearance</Button>
        <MenuList css={{ maxWidth: "340px" }}>
          <MenuItem>Stable list item</MenuItem>
          {showItem && <MenuItem>Toggled list item</MenuItem>}
        </MenuList>
      </div>
    )
  }
