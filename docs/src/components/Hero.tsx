import * as React from "react"
import { Link } from "gatsby"
import Layout, { Article } from "../components/layout"
import SEO from "./SEO"
import { graphql } from "gatsby"
import { theme, Text, Container, Button } from "../../../src"
import { ComponentMDXProvider } from "./ExamplePreview"

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
    <div
      css={{
        position: "relative",
        background: `linear-gradient(to right, #185a9d, #43cea2)`,
        // background: theme.colors.palette.neutral.dark,
        padding: `4.5rem 0`,
        paddingBottom: "5.5rem",
        marginBottom: theme.spaces.lg,
      }}
    >
      <Container>
        <Article>
          <Text
            css={{ color: "white", marginBottom: theme.spaces.md }}
            variant="display2"
          >
            Sancho UI
          </Text>
          <Text css={{ color: "white", maxWidth: "38rem" }} variant="lead">
            Sancho is a design system built with React, Typescript and Emotion.
            It's designed to be responsive, accessible, and beautiful.
          </Text>
          <Button
            css={{
              marginTop: theme.spaces.lg,
              borderColor: "white",
              color: "white",
            }}
            component="a"
            variant="outline"
            size="lg"
            href="https://github.com/bmcmahen/sancho"
          >
            View on Github
          </Button>
        </Article>
      </Container>
      <Wave />
    </div>
    <Container>
      <Article>
        <ComponentMDXProvider>{children}</ComponentMDXProvider>
      </Article>
    </Container>
  </React.Fragment>
)
