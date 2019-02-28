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
        top: "64px",
      }}
    >
      {items.map(item => {
        const active = inView.indexOf(item.id) > -1
        return (
          <li
            css={{
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
            key={item.id}
          >
            <Link
              to={"#" + item.id}
              css={{
                textDecoration: "none",
              }}
            >
              <Text
                css={{
                  fontWeight: active ? 600 : 400,
                  color: active
                    ? theme.colors.text.default
                    : theme.colors.text.muted,
                  fontSize: theme.sizes[0],
                }}
              >
                {item.name}
              </Text>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
