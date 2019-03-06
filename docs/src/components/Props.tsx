/** @jsx jsx */
import { jsx } from "@emotion/core"
import * as React from "react"
import table from "../pages/components/props.json"
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  theme,
  Text,
  Layer,
  Container,
} from "../../../src"
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
          css={{ marginBottom: theme.spaces.md, marginTop: theme.spaces.xl }}
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
                <React.Fragment key={name}>
                  <Layer
                    css={{ marginBottom: "1.5rem", overflow: "hidden" }}
                    elevation="xs"
                  >
                    <div css={{ margin: theme.spaces.md }}>
                      <Text variant="h4">{entry.displayName}</Text>
                    </div>
                    <Table fixed={["100px", "200px", "80%"]} minWidth="650px">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Description</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.keys(props).map(key => {
                          const row = props[key]
                          const type = row.type.name
                          const val = row.type.value
                          const { required, description } = row
                          return (
                            <TableRow key={key}>
                              <TableCell component="th" scope="row">
                                {key}
                                {required ? "*" : ""}
                              </TableCell>
                              <TableCell>
                                {type}
                                {type === "enum"
                                  ? " " + getEnumString(val)
                                  : ""}
                              </TableCell>
                              <TableCell>{description}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </Layer>
                </React.Fragment>
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
