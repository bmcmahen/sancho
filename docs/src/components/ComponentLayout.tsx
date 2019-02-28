import * as React from "react"
import { ComponentMDXProvider } from "./ExamplePreview"
import Layout from "./Layout"

interface ComponentLayoutProps {
  children: React.ReactNode
}

export default class ComponentLayout extends React.Component<
  ComponentLayoutProps
> {
  render() {
    return (
      <Layout>
        <ComponentMDXProvider>{this.props.children}</ComponentMDXProvider>
      </Layout>
    )
  }
}
