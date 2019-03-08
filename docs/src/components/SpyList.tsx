/** @jsx jsx */
import { jsx } from "@emotion/core"
import * as React from "react"
import { theme, Text } from "../../../src"
import { getId } from "./ExamplePreview"

export interface Item {
  id: string
  name: string
}

interface SpyListProps {
  items: Item[]
}

export function SpyList({ items }: SpyListProps) {
  const [ids] = React.useState(() => items.map(item => item.id))

  return (
    <ul
      css={{
        padding: theme.spaces.lg,
        margin: 0,
        position: "sticky",
        flex: "0 0 200px",
        width: "200px",
        top: "64px",
      }}
    >
      {items.map((item, i) => {
        // const active = inView[inView.length - 1] === item.id
        const active = false // disable scroll spy for now
        const props = item.name === "Props" || item.name === "Props table"
        return (
          <li
            css={{
              listStyle: "none",
              margin: 0,
              padding: `${0} ${theme.spaces.lg}`,
            }}
            key={item.id}
          >
            <a
              href={"#" + getId(item.id)}
              css={{
                textDecoration: "none",
                display: "block",
              }}
            >
              <Text
                variant={i === 0 ? "uppercase" : "body"}
                css={{
                  display: "block",
                  lineHeight: "1.75",

                  paddingBottom: i === 0 ? theme.spaces.xs : 0,
                  marginBottom: i === 0 ? theme.spaces.xs : 0,
                  borderBottom:
                    i === 0
                      ? `1px solid ${theme.colors.border.muted}`
                      : undefined,
                  borderTop:
                    item.name === "Props" || item.name === "Props table"
                      ? `1px solid ${theme.colors.border.muted}`
                      : undefined,
                  paddingTop: props && theme.spaces.xs,
                  marginTop: props && theme.spaces.xs,
                  color: active
                    ? theme.colors.text.default
                    : theme.colors.text.muted,
                  fontSize: theme.sizes[0],
                }}
              >
                {item.name}
              </Text>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
