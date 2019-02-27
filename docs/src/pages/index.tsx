import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import { theme, Text, Container, Button } from "../../../src"

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
      css={{ minWidth: "900px", display: "block", transform: "rotate(180deg)" }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1442 125"
    >
      <path
        fill="#fff"
        d="M1442 9c-152.5 0-158.66 78.4-514.29 26.08C659 5 489 124.09 333.63 124.09 212 124.09 184.23 49 0 49V0h1442z"
      />
    </svg>
  </div>
)

const IndexPage = () => (
  <Layout>
    <SEO
      title="Home"
      keywords={[`pants`, `design system`, `components`, `react`]}
    />
    <div
      css={{
        background: "white",
        borderBottom: `1px solid ${theme.colors.border.default}`,
        padding: `${theme.spaces.xl} 0`,
      }}
    >
      <Container>
        <Text css={{ marginBottom: theme.spaces.md }} variant="display3">
          Pants UI
        </Text>
        <Text css={{ maxWidth: "34rem" }} variant="lead">
          In laboris aliqua voluptate adipisicing sunt mollit quis voluptate eu
          laborum amet reprehenderit.
        </Text>
        <div css={{ marginTop: theme.spaces.md }}>
          <Button intent="success" size="md">
            Learn more
          </Button>
          <Button css={{ marginLeft: theme.spaces.sm }} size="md">
            View on Github
          </Button>
        </div>
      </Container>
    </div>
  </Layout>
)

export default IndexPage
