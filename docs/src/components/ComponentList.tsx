/** @jsx jsx */
import { jsx } from "@emotion/core"
import * as React from "react"
import { Link } from "gatsby"
import {
  Text,
  theme,
  MenuLabel,
  Link as StyleLink,
  Divider,
  RequestCloseContext,
} from "../../../src"

interface ComponentListProps {}

const padding = `${theme.spaces.xs} ${theme.spaces.lg}`

function MenuLink({ to, children }) {
  const closeParent = React.useContext(RequestCloseContext)

  return (
    <li
      css={{
        listStyle: "none",
        paddingLeft: 0,
        marginBottom: 0,
      }}
    >
      <Link
        data-trigger-close
        onClick={() => {
          closeParent()
        }}
        getProps={options => {
          const activeStyle = {
            fontWeight: 500,
            background: theme.colors.background.tint2,
            color: theme.colors.text.default,
          }

          if (options.isCurrent) {
            return {
              style: activeStyle,
            }
          }

          if (options.location.hash && to.indexOf(options.location.hash) > -1) {
            return {
              style: activeStyle,
            }
          }
          return {}
        }}
        activeStyle={{
          fontWeight: 500,
          background: theme.colors.background.tint2,
          color: theme.colors.text.default,
        }}
        css={{
          display: "block",
          padding,
          textDecoration: "none",
          color: theme.colors.text.muted,
          WebkitTapHighlightColor: "transparent",
          ":active": {
            background: theme.colors.background.tint2,
          },
          ":focus": {
            background: theme.colors.background.tint2,
          },
          outline: "none",
          ["@media (hover: hover)"]: {
            ":hover": {
              background: theme.colors.background.tint2,
            },
          },
        }}
        to={to}
      >
        <Text
          css={{
            fontWeight: "inherit",
            color: "inherit",
            fontSize: theme.sizes[1],
            [theme.breakpoints.lg]: {
              fontSize: theme.sizes[0],
            },
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
  { title: "Installation", path: "/#installation" },
  { title: "Styling and emotion", path: "/#styling%20and%20emotion" },
  { title: "Theme", path: "/#theme" },
]

const components = [
  { title: "Alert", path: "/components/alert/" },
  { title: "Avatar", path: "/components/avatar/" },
  { title: "Badge", path: "/components/badge/" },
  { title: "Breadcrumbs", path: "/components/breadcrumb/" },
  { title: "Button", path: "/components/button/" },
  { title: "Collapse", path: "/components/collapse/" },
  { title: "Container", path: "/components/container/" },
  { title: "Divider", path: "/components/divider/" },
  { title: "Form", path: "/components/form/" },
  { title: "IconButton", path: "/components/icon-button/" },
  { title: "Icon", path: "/components/icon/" },
  { title: "Layer", path: "/components/layer/" },
  { title: "Link", path: "/components/link/" },
  { title: "List", path: "/components/list/" },
  { title: "Menu", path: "/components/menu/" },
  { title: "Modal", path: "/components/modal/" },
  { title: "Navbar", path: "/components/navbar/" },
  { title: "Overlay", path: "/components/overlay/" },
  { title: "Popover", path: "/components/popover/" },
  { title: "Portal", path: "/components/portal/" },
  { title: "Positioner", path: "/components/positions/" },
  { title: "Sheet", path: "/components/sheet/" },
  { title: "SkipNav", path: "/components/skipnav/" },
  { title: "Spinner", path: "/components/spinner/" },
  { title: "Table", path: "/components/table/" },
  { title: "Tabs", path: "/components/tabs/" },
  { title: "Text", path: "/components/text/" },
  { title: "Toast", path: "/components/toast/" },
  { title: "Toolbar", path: "/components/toolbar/" },
  { title: "Tooltip", path: "/components/tooltip/" },
  { title: "VisuallyHidden", path: "/components/visually-hidden/" },
]

export function ComponentList(_props: ComponentListProps) {
  const [search, setSearch] = React.useState("")
  const [componentList, setComponentList] = React.useState(components)
  const [aboutList, setAboutList] = React.useState(about)
  const closeParent = React.useContext(RequestCloseContext)

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
        width: "14rem",
        background: theme.colors.background.tint1,
      }}
    >
      <div
        css={{
          height: "64px",
          borderBottom: "1px solid",
          borderColor: theme.colors.border.default,
          display: "flex",
          alignItems: "center",
          paddingLeft: theme.spaces.lg,
        }}
      >
        <Link
          onClick={() => closeParent()}
          css={{
            textDecoration: "none",
            alignItems: "center",
            display: "flex",
          }}
          to="/"
        >
          <img
            css={{
              width: "30px",
              height: "30px",
              marginRight: theme.spaces.sm,
            }}
            src={require("../images/donkey.svg")}
          />
          <Text
            css={{ color: theme.colors.text.default }}
            gutter={false}
            variant="h5"
          >
            Sancho UI
          </Text>
        </Link>
      </div>
      <div
        css={{
          flex: 1,
          overflowY: "scroll",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <ListGroup label="Getting started">
          {aboutList.map(entry => (
            <MenuLink to={entry.path} key={entry.path}>
              {entry.title}
            </MenuLink>
          ))}
        </ListGroup>
        <Divider />
        <ListGroup label="Components">
          {componentList.map(entry => (
            <MenuLink key={entry.path} to={entry.path}>
              {entry.title}
            </MenuLink>
          ))}
        </ListGroup>
        <Divider />
        <Text
          muted
          css={{
            display: "block",
            fontSize: theme.sizes[0],
            padding: `${theme.spaces.lg}`,
            paddingTop: 0,
          }}
        >
          Built with ☕ by <br />
          <StyleLink href="http://benmcmahen.com">Ben McMahen</StyleLink>
        </Text>
      </div>
    </div>
  )
}
