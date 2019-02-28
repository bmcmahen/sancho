/** @jsx jsx */
import { jsx } from "@emotion/core"
import * as React from "react"
import { useScrollSpy } from "../../../src/Hooks/scroll-spy"
import { Link } from "gatsby"
import { theme, Text } from "../../../src"

export interface Item {
  id: string
  name: string
}

interface SpyListProps {
  items: Item[]
}

export function SpyList({ items }: SpyListProps) {
  const [ids] = React.useState(() => items.map(item => item.id))
  const { inView } = useScrollSpy(ids)

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
      {items.map(item => {
        const active = inView[inView.length - 1] === item.id
        return (
          <li
            css={{
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
            key={item.id}
          >
            <a
              href={"#" + item.id}
              css={{
                textDecoration: "none",
              }}
            >
              <Text
                css={{
                  display: "inline-block",
                  lineHeight: "1.75",
                  fontWeight: active ? 600 : 400,
                  padding: `${0} ${theme.spaces.lg}`,
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
