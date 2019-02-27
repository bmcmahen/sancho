import * as React from "react"
import { ComponentMDXProvider } from "./ExamplePreview"
import Layout, { Article } from "./layout"
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
        <Article>
          <ComponentMDXProvider>{this.props.children}</ComponentMDXProvider>
        </Article>
      </Layout>
    )
  }
}
