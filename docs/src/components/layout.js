/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Navbar, Toolbar, Text, theme } from "../../../src"
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
            background: theme.colors.palette.blue.base,
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Text css={{ color: "white" }} variant="h5">
              Pants UI
            </Text>
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
              position: "sticky",
              top: "64px",
              height: "calc(100vh - 64px)",
            }}
          >
            <ComponentList />
          </div>
          <main
            css={{
              flex: 1,
            }}
          >
            <div
              css={{
                margin: "0 auto",
                maxWidth: "650px",
                padding: theme.spaces.lg,
              }}
            >
              {children}
            </div>
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
