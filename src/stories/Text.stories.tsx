/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { Text } from "../Text";
import { Link } from "../Link";

export const ThemeExamples = storiesOf("Text", module).add(
  "Basic usage",
  () => (
    <div css={{ padding: "1rem" }}>
      <Text variant="paragraph">
        Deserunt dolore consequat labore aute{" "}
        <Link href="#">est excepteur sit ut esse laboris</Link> amet eiusmod.
        Tempor est officia cillum culpa velit. Esse do magna nostrud sunt minim
        ullamco id cillum ex. Officia cillum tempor adipisicing officia
        excepteur enim nostrud. Veniam Lorem ad minim est veniam duis. Magna
        Lorem commodo commodo amet non sint sunt aliquip voluptate.
      </Text>
    </div>
  )
);
