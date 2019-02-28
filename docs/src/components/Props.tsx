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
  Layer,
  theme,
  Toolbar,
  Text,
  NegativeMarginsContainer,
} from "../../../src"
import { Article } from "./layout.js"

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
        css={{
          background: theme.colors.background.tint2,
          marginTop: theme.spaces.xl,
        }}
      >
        <Article>
          <Text css={{ marginBottom: theme.spaces.lg }} variant="h2">
            Props
          </Text>
          {names.map(name => {
            const entry = table[getKey(name)]
            if (entry) {
              const { props } = entry
              return (
                <NegativeMarginsContainer>
                  <Toolbar
                    css={{
                      borderTopRightRadius: theme.radii.lg,
                      borderTopLeftRadius: theme.radii.lg,
                      borderBottom: `1px solid ${theme.colors.border.default}`,
                      background: theme.colors.background.tint1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text css={{ margin: 0 }} variant="h4">
                      {entry.displayName} props
                    </Text>
                  </Toolbar>
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
                  <Toolbar
                    compressed
                    css={{
                      borderBottomRightRadius: theme.radii.lg,
                      borderBottomLeftRadius: theme.radii.lg,

                      background: theme.colors.background.tint1,
                    }}
                  />
                </NegativeMarginsContainer>
              )
            }

            return null
          })}
        </Article>
      </div>
    </div>
  )
}

function getEnumString(val: any) {
  return val.map(option => option.value).join(" | ")
}
