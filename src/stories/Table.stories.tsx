/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import theme from "../Theme";
import { storiesOf } from "@storybook/react";
import { Layer } from "../Layer";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  ExpandingRow
} from "../Table";
import { Text } from "../Text";
import { Button } from "../Button";
import { Toolbar } from "../Toolbar";

let id = 0;
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

export const TableExamples = storiesOf("Tables", module)
  .add("Minimum size with scroll", () => (
    <div css={{ padding: "48px" }}>
      <Layer elevation="xs" css={{ overflow: "hidden" }}>
        <div
          css={{
            borderBottom: `1px solid ${theme.colors.border.default}`,
            background: theme.colors.background.tint1,
            height: "150px",
            width: "100%"
          }}
        />
        <Table minWidth="800px">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat (g)</TableCell>
              <TableCell align="right">Carbs (g)</TableCell>
              <TableCell align="right">Protein (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Layer>
    </div>
  ))
  .add("Fixed layout", () => (
    <div
      css={{
        minHeight: "100vh",
        background: theme.colors.background.tint2,
        padding: "48px"
      }}
    >
      <Layer elevation="sm" css={{ overflow: "hidden" }}>
        <Toolbar
          css={{
            borderBottom: `1px solid ${theme.colors.border.default}`,
            background: theme.colors.background.tint1,
            justifyContent: "space-between"
          }}
        >
          <Text css={{ margin: 0 }} variant="h4">
            Ingredients
          </Text>

          <div>
            <Button intent="primary">Add ingredient</Button>
          </div>
        </Toolbar>
        <Table minWidth="700px" fixed={["200", "15%", "15%", "15%", "15%"]}>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat (g)</TableCell>
              <TableCell align="right">Carbs (g)</TableCell>
              <TableCell align="right">Protein (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell component="th" scope="row">
                With a really really really stupidly long name
              </TableCell>
              <TableCell align="right">10</TableCell>
              <TableCell align="right">30</TableCell>
              <TableCell align="right">49</TableCell>
              <TableCell align="right">122</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Toolbar
          compressed
          css={{
            background: theme.colors.background.tint1
          }}
        />
      </Layer>
    </div>
  ))
  .add("Expanding rows", () => (
    <div
      css={{
        minHeight: "100vh",
        background: theme.colors.background.tint2,
        padding: "48px"
      }}
    >
      <Layer elevation="sm">
        <Toolbar
          css={{
            borderTopRightRadius: theme.radii.lg,
            borderTopLeftRadius: theme.radii.lg,
            borderBottom: `1px solid ${theme.colors.border.default}`,
            background: theme.colors.background.tint1,
            justifyContent: "space-between"
          }}
        >
          <Text css={{ margin: 0 }} variant="h4">
            Ingredients
          </Text>

          <div>
            <Button intent="primary">Add ingredient</Button>
          </div>
        </Toolbar>
        <Table fixed={["200", "15%", "15%", "15%", "15%"]}>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat (g)</TableCell>
              <TableCell align="right">Carbs (g)</TableCell>
              <TableCell align="right">Protein (g)</TableCell>
            </TableRow>
          </TableHead>

          {rows.map(row => (
            <ExpandingRow
              content={close => {
                return (
                  <div
                    css={{
                      padding: theme.spaces.lg,
                      paddingTop: 0,
                      paddingBottom: 0
                    }}
                  >
                    <Text variant="body" css={{ fontSize: theme.sizes[0] }}>
                      Officia laborum deserunt adipisicing reprehenderit esse
                      elit exercitation consectetur ad non. Enim reprehenderit
                      mollit in commodo anim ex consequat magna laboris
                      adipisicing esse. Fugiat adipisicing ut consequat ea
                      cupidatat et excepteur sint excepteur cupidatat
                      reprehenderit minim. Labore reprehenderit sint enim cillum
                      exercitation ullamco nisi nostrud laboris ad magna magna
                      officia magna. Officia nisi eiusmod non ea do ullamco anim
                      fugiat proident commodo consectetur ut id. Ea cillum non
                      voluptate ullamco sunt dolore esse mollit.
                    </Text>
                    <div
                      css={{
                        display: "flex",
                        marginTop: "1rem",
                        justifyContent: "flex-end"
                      }}
                    >
                      <Button
                        variant="ghost"
                        css={{ marginRight: theme.spaces.sm }}
                        onClick={close}
                      >
                        Cancel
                      </Button>
                      <Button intent="primary">Save</Button>
                    </div>
                  </div>
                );
              }}
              key={row.id}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </ExpandingRow>
          ))}
        </Table>
        <Toolbar
          compressed
          css={{
            borderBottomRightRadius: theme.radii.lg,
            borderBottomLeftRadius: theme.radii.lg,

            background: theme.colors.background.tint1
          }}
        />
      </Layer>
    </div>
  ));
