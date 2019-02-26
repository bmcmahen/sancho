import React from "react"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import { MDXProvider } from "@mdx-js/tag"
import * as components from "../../../src"
import "./ExamplePreview.css"
import { Text } from "../../../src"

export function ComponentPreview({ children }) {
  const [code, setCode] = React.useState(children)

  function onChange(c) {
    setCode(c)
  }

  return (
    <LiveProvider
      scope={{
        ...components,
      }}
      mountStylesheet={false}
      code={code}
    >
      <LiveEditor className="language-" onChange={onChange} />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  )
}

export class ComponentMDXProvider extends React.Component {
  render() {
    return (
      <MDXProvider
        components={{
          code: ComponentPreview,
          p: ({ children }) => (
            <Text variant="body1" component="p">
              {children}
            </Text>
          ),
        }}
      >
        {this.props.children}
      </MDXProvider>
    )
  }
}
