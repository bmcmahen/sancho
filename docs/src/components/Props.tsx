/** @jsx jsx */
import { jsx } from "@emotion/core"
import * as React from "react"
import table from "../pages/components/props.json"
import { theme, Text } from "../../../src"
import { anchorPadding } from "./ExamplePreview.jsx"

// pretty lame
function getKey(name: string) {
  return `../build/${name}.jsx`
}

interface PropsProps {
  names: string[]
}

export function Props({ names }: PropsProps) {
  return (
    <div>
      <div
        id="props"
        css={[
          {
            marginBottom: theme.spaces.xl,
          },
          anchorPadding,
        ]}
      >
        <Text
          css={{ marginBottom: theme.spaces.md, marginTop: theme.spaces.lg }}
          variant="h2"
        >
          Props
        </Text>
        {names.map(name => {
          const entries = table[getKey(name)]
          if (entries) {
            return entries.map(entry => {
              const { props } = entry

              if (!props) {
                return null
              }

              return (
                <div css={{ marginBottom: theme.spaces.lg }} key={name}>
                  <div>
                    <Text variant="h4">{entry.displayName}</Text>
                  </div>

                  {Object.keys(props).map(key => {
                    const row = props[key]
                    const type = row.type.name
                    const val = row.type.value
                    const { required, description } = row
                    return (
                      <div css={{ marginBottom: "1rem" }} key={key}>
                        <div>
                          <Text
                            css={{
                              fontWeight: 500,
                              marginRight: theme.spaces.sm,
                            }}
                          >
                            {key}
                            {required ? "*" : ""}
                          </Text>
                          <Text
                            css={{
                              fontSize: "small",
                              background: theme.colors.background.tint1,
                              padding: "3px",
                              borderRadius: theme.radii.sm,
                            }}
                          >
                            {type}

                            {type === "enum" ? " " + getEnumString(val) : ""}
                          </Text>
                        </div>
                        <div>
                          <Text muted>{description}</Text>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })
          }

          return null
        })}
      </div>
    </div>
  )
}

function getEnumString(val: any) {
  return val.map(option => option.value).join(" | ")
}
