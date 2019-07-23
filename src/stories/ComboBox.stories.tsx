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
    "joe",
    "johnson",
    "cary"
  ]);
  const [query, setQuery] = React.useState("");

  const toRender = !query
    ? []
    : entries.filter(entry => entry.indexOf(query) > -1);

  return (
    <ComboBox
      onSelect={v => {
        setQuery(v);
      }}
    >
      <ComboBoxInput
        aria-label="Query users"
        value={query}
        component={InputBase}
        autocomplete
        onChange={e => setQuery(e.target.value)}
      />

      <ComboBoxList aria-label="Query users">
        {toRender.length ? (
          toRender.map(entry => {
            return (
              <ComboBoxOption value={entry} key={entry}>
                {entry}
              </ComboBoxOption>
            );
          })
        ) : (
          <div>
            {query && toRender.length === 0 ? (
              <span>No entries found.</span>
            ) : (
              <span>Try searching for some stuff</span>
            )}
          </div>
        )}
      </ComboBoxList>
    </ComboBox>
  );
}
