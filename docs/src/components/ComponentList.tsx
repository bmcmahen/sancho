/** @jsx jsx */
import { jsx } from "@emotion/core"
import * as React from "react"
import { Link } from "gatsby"
import { Text, theme, MenuList, MenuItem } from "../../../src"

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

export function ComponentList({  }: ComponentListProps) {
  return (
    <div
      css={{
        height: "100%",
        minWidth: "14rem",
        background: theme.colors.background.tint1,
      }}
    >
      <ul css={{ padding: `${theme.spaces.lg} 0`, margin: 0 }}>
        {components.map(name => {
          return (
            <li
              css={{
                listStyle: "none",
                paddingLeft: 0,
                marginBottom: 0,
              }}
              key={name}
            >
              <Link
                css={{
                  display: "block",
                  padding: `${theme.spaces.xs} ${theme.spaces.lg}`,
                  color: theme.colors.text.default,
                  textDecoration: "none",
                  background: "transparent",
                }}
                to={`/components/${name.toLowerCase()}`}
              >
                <Text
                  css={{
                    fontSize: theme.sizes[1],
                  }}
                >
                  {name}
                </Text>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
