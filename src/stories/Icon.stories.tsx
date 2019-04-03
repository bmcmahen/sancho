/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { Icon } from "../Icons";

export const ThemeExamples = storiesOf("Icons", module).add(
  "Color usage",
  () => (
    <div css={{ padding: "1rem" }}>
      <Icon icon="paragraph" title="Some title" />
    </div>
  )
);
