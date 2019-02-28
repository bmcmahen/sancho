/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import React from "react"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import { MDXProvider } from "@mdx-js/tag"
import * as components from "../../../src"
import "./ExamplePreview.css"
import { Text, theme, Link } from "../../../src"

export const anchorPadding = css`
  &::before {
    height: 86px;
    content: "";
    display: block;
    margin-top: -86px;
  }
`

/**
 * Render a component sample with React-Live
 * @param {*} param0
 */

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

export function getId(children) {
  if (typeof children === "string") {
    return encodeURI(children.toLowerCase())
  }

  return null
}

/**
 * Use these components to render MDX entities
 */

const MDXComponents = {
  code: ({ children }) => (
    <code css={{ background: theme.colors.background.tint2 }}>{children}</code>
  ),
  pre: ComponentPreview,
  a: props => <Link {...props} />,
  h1: ({ children }) => (
    <Text id={getId(children)} css={anchorPadding} variant="h1">
      {children}
    </Text>
  ),
  h2: ({ children }) => (
    <Text id={getId(children)} css={anchorPadding} variant="h2">
      {children}
    </Text>
  ),
  h3: ({ children }) => (
    <Text
      id={getId(children)}
      css={[{ marginTop: theme.spaces.lg }, anchorPadding]}
      variant="h3"
    >
      {children}
    </Text>
  ),
  h4: ({ children }) => (
    <Text
      id={getId(children)}
      css={[
        {
          marginBottom: theme.spaces.sm,
          marginTop: theme.spaces.lg,
        },
        anchorPadding,
      ]}
      variant="h4"
    >
      {children}
    </Text>
  ),
  p: ({ children }) => (
    <Text css={{ maxWidth: "45rem" }} variant="paragraph">
      {children}
    </Text>
  ),
}

/**
 * MDX Provider
 */

export class ComponentMDXProvider extends React.Component {
  render() {
    return (
      <MDXProvider components={MDXComponents}>
        {this.props.children}
      </MDXProvider>
    )
  }
}
