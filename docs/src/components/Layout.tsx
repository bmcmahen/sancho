/** @jsx jsx */
import { jsx, Global } from "@emotion/core"
import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import {
  Navbar,
  Toolbar,
  Text,
  theme,
  IconButton,
  SkipNavLink,
  SkipNavContent,
  responsiveBodyPadding,
} from "../../../src"
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
      <React.Fragment>
        <Global
          styles={{
            html: {
              fontFamily: "sans-serif",
              textSizeAdjust: "100%",
            },
            body: {
              margin: 0,
              "-webkit-font-smoothing": "antialiased",
              "-moz-osx-font-smoothing": "grayscale",
              background: "white",
            },
          }}
        />
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
              {data.site.siteMetadata.title}
            </Text>
          </Toolbar>
        </Navbar>
        <div
          css={[
            {
              justifyContent: "space-between",
              padding: 0,
              display: "flex",
            },
            responsiveBodyPadding,
          ]}
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
      </React.Fragment>
    )}
  />
)

export default Layout

interface ArticleProps {
  sidebar?: any
  children?: React.ReactNode
}

export const Article = ({ children, sidebar }: ArticleProps) => (
  <div css={{ display: "flex" }}>
    <div
      css={{
        minWidth: 0,
        padding: `${theme.spaces.md} 0`,
        [theme.breakpoints.md]: {
          padding: `${theme.spaces.md} ${theme.spaces.md}`,
        },
        [theme.breakpoints.lg]: {
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
