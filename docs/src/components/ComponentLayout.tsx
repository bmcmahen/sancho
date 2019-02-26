import * as React from "react"
import { ComponentMDXProvider } from "./ExamplePreview"

interface ComponentLayoutProps {
  children: React.ReactNode
}

export default class ComponentLayout extends React.Component<
  ComponentLayoutProps
> {
  render() {
    return (
      <div>
        <ComponentMDXProvider>{this.props.children}</ComponentMDXProvider>
      </div>
    )
  }
}
