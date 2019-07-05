/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { Skeleton } from "../Skeleton";
import { Text } from "../Text";
import { List, ListItem } from "../List";
import { Avatar } from "../Avatar";
import faker from "faker";

export const ThemeExamples = storiesOf("Skeleton", module)
  .add("Basic usage", () => (
    <div css={{ padding: "1rem" }}>
      <Text variant="display3">
        <Skeleton />
      </Text>
    </div>
  ))
  .add("ListItem loading", () => (
    <List>
      <ListItem
        contentBefore={
          <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
        }
        primary="Ben McMahen"
        secondary="Minim do minim cupidatat veniam aliquip sunt exercitation enim nisi nulla."
      />
      <ListItem
        contentBefore={
          <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
        }
        primary="Joe Chen"
        secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
      />
      <ListItem
        interactive={false}
        aria-live="polite"
        aria-busy="true"
        primary={<Skeleton css={{ width: "100px" }} />}
        secondary={<Skeleton />}
        contentBefore={
          <Skeleton
            css={{ width: "3.27rem", height: "3.27rem", borderRadius: "50%" }}
          />
        }
      />
    </List>
  ));
