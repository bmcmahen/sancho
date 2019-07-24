/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Avatar, AvatarSizes } from "../Avatar";
import faker from "faker";
import { storiesOf } from "@storybook/react";
import {
  ComboBox,
  ComboBoxInput,
  ComboBoxList,
  ComboBoxOption
} from "../ComboBox";
import { Input, InputBase } from "../Form";
import { Text } from "../Text";

export const ComboBoxStories = storiesOf("ComboBox", module).add(
  "basic",
  () => {
    return <Example />;
  }
);

function Example() {
  const [entries, setEntries] = React.useState([
    "ben",
    "mcmahen",
    "mcmahen2",
    "mcmahen3",
    "mcjohn",
    "mcjoe",
    "allthe micc",
    "joe",
    "johnson",
    "cary"
  ]);
  const [query, setQuery] = React.useState("");

  const toRender = !query
    ? []
    : entries.filter(entry => entry.indexOf(query) > -1);

  return (
    <div css={{ margin: "3rem auto", width: "30rem" }}>
      <ComboBox
        query={query}
        onQueryChange={v => {
          setQuery(v);
        }}
        onSelect={v => {
          setQuery(v);
        }}
      >
        <ComboBoxInput
          aria-label="Query users"
          placeholder="Search for users"
          component={InputBase}
          autocomplete
        />

        <ComboBoxList aria-label="Query users">
          {toRender.length ? (
            toRender.map(entry => {
              return <ComboBoxOption value={entry} key={entry} />;
            })
          ) : (
            <div>
              <Text
                muted
                css={{ display: "block", padding: "0.25rem 0.75rem" }}
              >
                {query && toRender.length === 0 ? (
                  <span>No entries found.</span>
                ) : (
                  <span>Try searching for users by email or name.</span>
                )}
              </Text>
            </div>
          )}
        </ComboBoxList>
      </ComboBox>
    </div>
  );
}
