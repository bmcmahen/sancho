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
} from "../../../src"
import { anchorPadding } from "./ExamplePreview.jsx"

// pretty lame
function getKey(name: string) {
  return `../build/${name}.js`
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
          const entry = table[getKey(name)]
          if (entry) {
            const { props } = entry
            return (
              <React.Fragment key={name}>
                <Table minWidth="650px">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody css={{ background: "white" }}>
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
                            {type === "enum" ? " " + getEnumString(val) : ""}
                          </TableCell>
                          <TableCell>{description}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </React.Fragment>
            )
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
