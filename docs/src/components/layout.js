/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import {
  Navbar,
  Toolbar,
  Text,
  theme,
  IconButton,
  SkipNavLink,
  VisuallyHidden,
  SkipNavContent,
} from "../../../src"
import "./layout.css"
import { ComponentList } from "./ComponentList"
import { SpyList } from "./SpyList"
import { SideMenu } from "./SideMenu"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <SkipNavLink />

        <Navbar
          css={{
            boxShadow: theme.shadows.sm,
            background: theme.colors.palette.blue.base,
          }}
        >
          <Toolbar>
            <SideMenu />
            <Text css={{ margin: 0, color: "white" }} variant="h4">
              Sancho
            </Text>
            <div css={{ marginLeft: "auto" }}>
              <IconButton icon="github" variant="ghost" label="Github" />
            </div>
          </Toolbar>
        </Navbar>
        <div
          css={{
            justifyContent: "space-between",
            padding: 0,
            paddingTop: "64px",
            display: "flex",
          }}
        >
          <div
            css={{
              display: "none",
              position: "sticky",
              top: "64px",
              height: "calc(100vh - 64px)",
              [theme.breakpoints.lg]: {
                display: "block",
              },
            }}
          >
            <ComponentList />
          </div>
          <SkipNavContent />
          <main
            css={{
              flex: 1,
              minWidth: 0,
            }}
          >
            {children}
          </main>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

export const Article = ({ children, sidebar }) => (
  <div css={{ display: "flex" }}>
    <div
      css={{
        minWidth: 0,
        [theme.breakpoints.md]: {
          padding: `${theme.spaces.lg} ${theme.spaces.lg}`,
        },
      }}
    >
      {children}
    </div>
    {sidebar && (
      <div
        css={{
          display: "none",
          [theme.breakpoints.xl]: {
            display: "block",
          },
        }}
      >
        <SpyList items={sidebar} />
      </div>
    )}
  </div>
)
