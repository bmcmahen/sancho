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

  const toRender = entries.filter(entry => entry.indexOf(query) > -1);

  console.log(toRender);

  return (
    <ComboBox
      onSelect={v => {
        console.log("selected cb", v);
      }}
    >
      <ComboBoxInput
        aria-label="Query users"
        value={query}
        component={InputBase}
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
            {query && entries.length === 0 ? (
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
