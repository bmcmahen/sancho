/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import { MDXProvider } from "@mdx-js/tag"
import * as components from "../../../src"
import "./ExamplePreview.css"
import {
  Text,
  Layer,
  theme,
  Link,
  NegativeMarginsContainer,
} from "../../../src"

export function ComponentPreview({ className, ...props }) {
  const isJSX = props.children.props.props.className === "language-jsx"

  if (props.children.props.props) {
    return (
      <div
        css={{
          marginTop: theme.spaces.sm,
          padding: theme.spaces.sm,
          background: theme.colors.background.tint1,
          borderRadius: theme.radii.md,
          marginLeft: "-0.5rem",
          marginRight: "-0.5rem",
          marginBottom: ` ${theme.spaces.md}`,
        }}
      >
        <LiveProvider
          scope={{
            ...components,
          }}
          mountStylesheet={false}
          code={props.children.props.children}
        >
          {isJSX && <LivePreview />}
          <LiveEditor className="language-" />
          {isJSX && <LiveError />}
        </LiveProvider>
      </div>
    )
  }

  return <pre className="language-jsx" {...props} />
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
          a: props => <Link {...props} />,
          h1: ({ children }) => <Text variant="h1">{children}</Text>,
          h2: ({ children }) => <Text variant="h2">{children}</Text>,
          h3: ({ children }) => (
            <Text css={{ marginTop: theme.spaces.lg }} variant="h3">
              {children}
            </Text>
          ),
          h4: ({ children }) => (
            <Text
              css={{
                marginBottom: theme.spaces.sm,
                marginTop: theme.spaces.lg,
              }}
              variant="h4"
            >
              {children}
            </Text>
          ),
          p: ({ children }) => <Text variant="paragraph">{children}</Text>,
        }}
      >
        {this.props.children}
      </MDXProvider>
    )
  }
}
