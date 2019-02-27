import * as React from "react"
import { ComponentMDXProvider } from "./ExamplePreview"
import Layout from "./layout"
import { theme } from "../../../src"

interface ComponentLayoutProps {
  children: React.ReactNode
}

export default class ComponentLayout extends React.Component<
  ComponentLayoutProps
> {
  render() {
    return (
      <Layout>
        <div
          css={{
            maxWidth: "650px",
            margin: "0 auto",
            marginTop: theme.spaces.xl,
          }}
        >
          <ComponentMDXProvider>{this.props.children}</ComponentMDXProvider>
        </div>
      </Layout>
    )
  }
}
