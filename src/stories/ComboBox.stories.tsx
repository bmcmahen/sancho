/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Avatar, AvatarSizes } from "../Avatar";
import faker from "faker";
import { storiesOf } from "@storybook/react";
import { ComboBox, ComboBoxInput, ComboBoxList } from "../ComboBox";
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
      <ComboBoxList>Helloooo</ComboBoxList>
    </ComboBox>
  );
}
