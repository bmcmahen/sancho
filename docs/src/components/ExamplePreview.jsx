/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import { MDXProvider } from "@mdx-js/tag"
import * as components from "../../../src"
import "./ExamplePreview.css"
import { Text, Layer, theme } from "../../../src"

export function ComponentPreview({ className, ...props }) {
  if (
    props.children.props.props &&
    props.children.props.props.className === "language-jsx"
  ) {
    return (
      <div
        css={{
          marginTop: theme.spaces.sm,
          padding: theme.spaces.sm,
          background: theme.colors.background.tint1,
          borderRadius: theme.radii.md,
          marginBottom: ` ${theme.spaces.lg}`,
        }}
      >
        <LiveProvider
          scope={{
            ...components,
          }}
          mountStylesheet={false}
          code={props.children.props.children}
        >
          <LivePreview />
          <LiveEditor className="language-" />
          <LiveError />
        </LiveProvider>
      </div>
    )
  }

  return <pre className="language-" {...props} />
}

export class ComponentMDXProvider extends React.Component {
  render() {
    return (
      <MDXProvider
        components={{
          code: ({ children }) => (
            <code css={{ background: theme.colors.background.tint2 }}>
              {children}
            </code>
          ),
          pre: ComponentPreview,
          h1: ({ children }) => <Text variant="h1">{children}</Text>,
          h2: ({ children }) => <Text variant="h2">{children}</Text>,
          h3: ({ children }) => <Text variant="h3">{children}</Text>,
          h4: ({ children }) => (
            <Text css={{ marginTop: theme.spaces.lg }} variant="h4">
              {children}
            </Text>
          ),
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
