/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import theme from "../Theme";
import faker from "faker";
import { Embed } from "../Embed";
import { storiesOf } from "@storybook/react";

export const EmbedStories = storiesOf("Embed", module).add("basic", () => {
  return (
    <div css={{ maxWidth: "400px", border: "2px solid" }}>
      <Embed width={16} height={9}>
        <img src={faker.image.people(1600, 900)} alt="Some person" />
      </Embed>
      <div>I should not move around</div>
    </div>
  );
});
