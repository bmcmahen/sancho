/** @jsx jsx */
import { jsx } from "@emotion/core"
import * as React from "react"
import { Link } from "gatsby"
import { Text, theme, MenuLabel, MenuDivider, InputBase } from "../../../src"

interface ComponentListProps {}

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

const about = [
  { title: "Install", path: "/#install" },
  { title: "Styling", path: "/#styling" },
]

const components = [
  { title: "Alert", path: "/components/alert" },
  { title: "Button", path: "/components/button" },
]

export function ComponentList(_props: ComponentListProps) {
  const [search, setSearch] = React.useState("")
  const [componentList, setComponentList] = React.useState(components)
  const [aboutList, setAboutList] = React.useState(about)

  React.useEffect(() => {
    if (!search) {
      setComponentList(components)
      setAboutList(about)
    } else {
      setComponentList(
        components.filter(
          item => item.title.toLowerCase().indexOf(search.toLowerCase()) > -1
        )
      )

      setAboutList(
        about.filter(
          item => item.title.toLowerCase().indexOf(search.toLowerCase()) > -1
        )
      )
    }
  }, [search])

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
      <form onSubmit={e => e.preventDefault()}>
        <InputBase
          type="search"
          placeholder="Search..."
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setSearch(e.currentTarget.value)
          }
          value={search}
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
      </form>

      <div
        css={{
          flex: 1,
          overflowY: "scroll",
          "webkit-overflow-scrolling": "touch",
        }}
      >
        <ListGroup label="Getting started">
          {aboutList.map(entry => (
            <MenuLink to={entry.path} key={entry.path}>
              {entry.title}
            </MenuLink>
          ))}
        </ListGroup>
        <MenuDivider />
        <ListGroup label="Components">
          {componentList.map(entry => (
            <MenuLink key={entry.path} to={entry.path}>
              {entry.title}
            </MenuLink>
          ))}
        </ListGroup>
      </div>
    </div>
  )
}
