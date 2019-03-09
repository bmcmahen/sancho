/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Button } from "../Button";
import { List, ListItem } from "../List";
import { storiesOf } from "@storybook/react";
import { Icon } from "../Icons";
import { Layer } from "../Layer";
import theme from "../Theme";
import faker from "faker";
import { Avatar } from "../Avatar";

export const CollapseStories = storiesOf("List", module)
  .add("basic", () => {
    return (
      <Layer css={{ overflow: "hidden", width: "450px" }}>
        <div
          css={{
            height: "1.5rem",
            borderBottom: "1px solid",
            borderBottomColor: theme.colors.border.muted
          }}
        />
        <List>
          <ListItem
            iconBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Ben McMahen"
            secondary="Minim do minim cupidatat veniam aliquip sunt exercitation enim nisi nulla."
            iconAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
          <ListItem
            iconBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            iconAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
          <ListItem
            iconBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            iconAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
          <ListItem
            iconBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            iconAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
        </List>
      </Layer>
    );
  })
  .add("no wrap", () => {
    return (
      <Layer css={{ overflow: "hidden", width: "450px" }}>
        <div
          css={{
            height: "1.5rem",
            borderBottom: "1px solid",
            borderBottomColor: theme.colors.border.muted
          }}
        />
        <List>
          <ListItem
            iconBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Ben McMahen"
            wrap={false}
            secondary="Minim do minim cupidatat veniam aliquip sunt exercitation enim nisi nulla."
            iconAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
          <ListItem
            wrap={false}
            iconBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            iconAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
          <ListItem
            wrap={false}
            iconBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            iconAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
          <ListItem
            wrap={false}
            iconBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            iconAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
        </List>
      </Layer>
    );
  })
  .add("support links", () => {
    return (
      <Layer css={{ overflow: "hidden", width: "450px" }}>
        <div
          css={{
            height: "1.5rem",
            borderBottom: "1px solid",
            borderBottomColor: theme.colors.border.muted
          }}
        />
        <List>
          <ListItem
            component="a"
            href="/"
            iconBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Ben McMahen"
            wrap={false}
            secondary="Minim do minim cupidatat veniam aliquip sunt exercitation enim nisi nulla."
            iconAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
          <ListItem
            wrap={false}
            iconBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            iconAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
          <ListItem
            wrap={false}
            iconBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            iconAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
          <ListItem
            wrap={false}
            iconBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            iconAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
        </List>
      </Layer>
    );
  });
