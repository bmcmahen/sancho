import * as React from "react"
import { Link } from "gatsby"
import Layout, { Article } from "../components/layout"
import SEO from "./SEO"
import { graphql } from "gatsby"
import { theme, Text, Container, Button, Divider } from "../../../src"
import { ComponentMDXProvider } from "./ExamplePreview"
import { Nav } from "./Nav"

const Wave = () => (
  <div
    css={{
      position: "absolute",
      bottom: "-1px",
      width: "100%",
      overflow: "hidden",
    }}
  >
    <svg
      id="stamp"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="100%"
      height="100"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      css={{
        transform: "rotate(180deg)",
        fill: "white",
        display: "block",
        minWidth: "2000px",
      }}
    >
      <path
        d="M0 0 Q 2.5 40 5 0 
						 Q 7.5 40 10 0
						 Q 12.5 40 15 0
						 Q 17.5 40 20 0
						 Q 22.5 40 25 0
						 Q 27.5 40 30 0
						 Q 32.5 40 35 0
						 Q 37.5 40 40 0
						 Q 42.5 40 45 0
						 Q 47.5 40 50 0 
						 Q 52.5 40 55 0
						 Q 57.5 40 60 0
						 Q 62.5 40 65 0
						 Q 67.5 40 70 0
						 Q 72.5 40 75 0
						 Q 77.5 40 80 0
						 Q 82.5 40 85 0
						 Q 87.5 40 90 0
						 Q 92.5 40 95 0
						 Q 97.5 40 100 0 Z"
      />
    </svg>
  </div>
)

export const Hero = ({ children }) => (
  <React.Fragment>
    <Nav />
    <div
      css={{
        padding: `${theme.spaces.lg} 0`,
        borderBottom: `1px solid ${theme.colors.border.muted}`,
      }}
    >
      <Container>
        <div
          css={{
            textAlign: "center",
            padding: `${theme.spaces.lg} 0`,

            [theme.breakpoints.md]: {
              textAlign: "left",
              padding: `${theme.spaces.lg} 0.75rem`,
            },
          }}
        >
          <Text variant="display2">Sancho UI</Text>
          <Text
            css={{
              maxWidth: "38rem",
              margin: "0 auto",

              marginBottom: theme.spaces.lg,
              [theme.breakpoints.md]: {
                marginLeft: 0,
              },
            }}
            variant="lead"
          >
            Sancho is a design system built with React, Typescript and Emotion.
            It's designed to be responsive, accessible, and flexible.
          </Text>
          <Button
            variant="outline"
            component="a"
            size="lg"
            href="http://github.com/bmcmahen/sancho"
          >
            View on Github
          </Button>
        </div>
      </Container>
    </div>
    <Container>
      <Article
        sidebar={[
          { id: "Sancho", name: "Sancho" },
          { id: "Installation", name: "Installation" },
          { id: "Styling and Themes", name: "Styling and Themes" },
          { id: "Prior art", name: "Prior art" },
          { id: "About", name: "About" },
        ]}
      >
        <ComponentMDXProvider>{children}</ComponentMDXProvider>
      </Article>
    </Container>
  </React.Fragment>
)
