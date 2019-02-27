/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Navbar, Toolbar, Text, theme, IconButton } from "../../../src"
import Header from "./header"
import "./layout.css"
import { ComponentList } from "./ComponentList"

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
        <Navbar
          css={{
            boxShadow: theme.shadows.sm,
            background: theme.colors.palette.blue.base,
          }}
        >
          <Toolbar>
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
          <main
            css={{
              overflow: "hidden",
              flex: 1,
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

export const Article = ({ children }) => (
  <div
    css={{
      margin: "0 auto",
      maxWidth: "650px",
      padding: `${theme.spaces.xl} ${theme.spaces.lg}`,
    }}
  >
    {children}
  </div>
)
