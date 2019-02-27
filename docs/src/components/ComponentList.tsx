/** @jsx jsx */
import { jsx } from "@emotion/core"
import * as React from "react"
import { Link } from "gatsby"
import {
  Text,
  theme,
  MenuList,
  MenuItem,
  MenuLabel,
  MenuDivider,
  InputBase,
} from "../../../src"

interface ComponentListProps {}

const components = [
  "Alert",
  "Avatar",
  "Breadcrumb",
  "Button",
  "Collapse",
  "Embed",
  "Forms",
  "IconButton",
  "Layer",
  "MenuList",
  "Modal",
  "Navbar",
  "Popover",
  "Sheet",
  "Tables",
  "Tabs",
  "Toast",
  "Tooltip",
]

const padding = `${theme.spaces.xs} ${theme.spaces.lg}`

function MenuLink({ to, children }) {
  return (
    <li
      css={{
        listStyle: "none",
        paddingLeft: 0,
        marginBottom: 0,
      }}
    >
      <Link
        activeStyle={{
          background: theme.colors.background.tint2,
        }}
        css={{
          display: "block",
          padding,
          textDecoration: "none",
          background: "transparent",
          outline: "none",
          ":hover": {
            background: theme.colors.background.tint2,
          },
          ":focus": {
            background: theme.colors.background.tint2,
          },
        }}
        to={to}
      >
        <Text
          css={{
            color: theme.colors.text.muted,
            fontSize: theme.sizes[0],
          }}
        >
          {children}
        </Text>
      </Link>
    </li>
  )
}

function Label({ children }) {
  return <MenuLabel css={{ padding }}>{children}</MenuLabel>
}

function ListGroup({ label, children }) {
  return (
    <div css={{ margin: `${theme.spaces.md} 0` }}>
      <Label>{label}</Label>
      <ul css={{ padding: 0, margin: 0 }}>{children}</ul>
    </div>
  )
}

export function ComponentList(_props: ComponentListProps) {
  return (
    <div
      css={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        minWidth: "14rem",
        background: theme.colors.background.tint1,
      }}
    >
      <InputBase
        placeholder="Search..."
        css={{
          boxShadow: "none",
          borderRadius: 0,
          background: "none",
          border: `1px solid transparent`,
          borderBottom: `1px solid ${theme.colors.border.muted}`,
          padding: theme.spaces.lg,
          height: "64px",
          ":focus": {
            borderColor: theme.colors.palette.blue.light,
            boxShadow: "none",
            // background: theme.colors.background.tint2,
          },
        }}
      />

      <div
        css={{
          flex: 1,
          overflowY: "scroll",
          "webkit-overflow-scrolling": "touch",
        }}
      >
        <ListGroup label="Getting started">
          <MenuLink to="/install">Installation</MenuLink>
          <MenuLink to="/style">Styling</MenuLink>
        </ListGroup>
        <MenuDivider />
        <ListGroup label="Components">
          {components.map(name => (
            <MenuLink to={`/components/${name.toLowerCase()}`}>{name}</MenuLink>
          ))}
        </ListGroup>
      </div>
    </div>
  )
}
