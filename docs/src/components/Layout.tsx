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
        <Navbar
          css={{
            boxShadow: theme.shadows.sm,
            background: theme.colors.palette.blue.base,
          }}
        >
          <Toolbar>
            <SideMenu />
            <Link
              to="/"
              css={{
                textDecoration: "none",
              }}
            >
              <Text css={{ margin: 0, color: "white" }} variant="h4">
                {data.site.siteMetadata.title}
              </Text>
            </Link>
            <Tooltip content="View on Github">
              <IconButton
                css={{ marginLeft: "auto" }}
                variant="ghost"
                component="a"
                href="https://github.com/bmcmahen/sancho"
                color="white"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                }
                label="View on github"
              />
            </Tooltip>
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
        flex: 1,
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
