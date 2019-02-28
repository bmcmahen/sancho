/** @jsx jsx */
import { jsx } from "@emotion/core"
import * as React from "react"
import { IconButton, theme, Sheet } from "../../../src"
import { ComponentList } from "./ComponentList"

interface SideMenuProps {}

export function SideMenu({  }: SideMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <React.Fragment>
      <IconButton
        label="Show menu"
        icon="menu"
        variant="ghost"
        color="white"
        onClick={() => setIsOpen(true)}
        css={{
          marginRight: theme.spaces.sm,
          [theme.breakpoints.lg]: {
            display: "none",
          },
        }}
      />
      <Sheet
        position="left"
        isOpen={isOpen}
        css={{
          [theme.breakpoints.lg]: {
            display: "none",
          },
        }}
        onRequestClose={() => setIsOpen(false)}
      >
        <ComponentList />
      </Sheet>
    </React.Fragment>
  )
}
