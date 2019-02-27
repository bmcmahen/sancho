import * as React from "react"
import { ComponentMDXProvider } from "./ExamplePreview"
import Layout from "./layout"
import { theme, Container } from "../../../src"

interface ComponentLayoutProps {
  children: React.ReactNode
}

export default class ComponentLayout extends React.Component<
  ComponentLayoutProps
> {
  render() {
    return (
      <Layout>
        <Container>
          <div
            css={{
              maxWidth: "650px",
              margin: "0 auto",
              marginTop: theme.spaces.md,
              [theme.breakpoints.lg]: {
                marginTop: theme.spaces.xl,
              },
            }}
          >
            <ComponentMDXProvider>{this.props.children}</ComponentMDXProvider>
          </div>
        </Container>
      </Layout>
    )
  }
}
