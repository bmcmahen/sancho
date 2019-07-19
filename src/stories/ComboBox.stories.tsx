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
  const [query, setQuery] = React.useState("");

  return (
    <ComboBox>
      <ComboBoxInput
        aria-label="Query users"
        value={query}
        component={InputBase}
        onChange={e => setQuery(e.target.value)}
      />

      <ComboBoxList aria-label="Query users">
        {query ? (
          <React.Fragment>
            <ComboBoxOption value="Ben">Ben</ComboBoxOption>
            <ComboBoxOption value="McMahen">McMahen</ComboBoxOption>
          </React.Fragment>
        ) : (
          <div>Try searching for some stuff</div>
        )}
      </ComboBoxList>
    </ComboBox>
  );
}
