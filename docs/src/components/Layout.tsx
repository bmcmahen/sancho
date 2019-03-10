/** @jsx jsx */
import { jsx, Global } from "@emotion/core"
import * as React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import {
  Navbar,
  Toolbar,
  Text,
  theme,
  IconButton,
  SkipNavLink,
  SkipNavContent,
  responsiveBodyPadding,
  Tooltip,
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
              WebkitFontSmoothing: "antialiased",
              background: "white",
            },
          }}
        />
        <SkipNavLink />

        <div
          css={[
            {
              justifyContent: "space-between",
              padding: 0,
              display: "flex",
            },
          ]}
        >
          <div
            css={{
              display: "none",
              position: "sticky",
              top: "0",
              height: "100vh",
              [theme.breakpoints.lg]: {
                display: "block",
              },
            }}
          >
            <ComponentList />
          </div>

          <main
            css={[
              {
                flex: 1,
                minWidth: 0,
              },
              responsiveBodyPadding,
            ]}
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
    <SkipNavContent />
    <div
      css={{
        flex: 1,
        minWidth: 0,
        padding: `${theme.spaces.md} 0`,

        [theme.breakpoints.md]: {
          padding: `${theme.spaces.md} 0.75rem`,
        },
        [theme.breakpoints.lg]: {
          padding: `${theme.spaces.lg} 0.75rem`,
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
