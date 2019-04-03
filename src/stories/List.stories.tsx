/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Button } from "../Button";
import { List, ListItem, ListSection } from "../List";
import { storiesOf } from "@storybook/react";
import { Icon } from "../Icons";
import { Layer } from "../Layer";
import theme from "../Theme";
import faker from "faker";
import { Avatar } from "../Avatar";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { Divider } from "../Divider";

export const CollapseStories = storiesOf("List", module)
  .add("basic", () => {
    return (
      <div css={{ padding: "3rem" }}>
        <Layer elevation="sm" css={{ overflow: "hidden", width: "450px" }}>
          <div
            css={{
              height: "1.5rem"
            }}
          />
          <List>
            <ListSection title="Hello world">
              <ListItem
                contentBefore={
                  <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
                }
                primary="Ben McMahen"
                secondary="Minim do minim cupidatat veniam aliquip sunt exercitation enim nisi nulla."
                contentAfter={
                  <Icon color={theme.colors.text.muted} icon="chevron-right" />
                }
              />
              <ListItem
                contentBefore={
                  <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
                }
                primary="Joe Chen"
                secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
                contentAfter={
                  <Icon color={theme.colors.text.muted} icon="chevron-right" />
                }
              />
            </ListSection>
            <Divider muted />
            <ListSection title="Hello world">
              <ListItem
                contentBefore={
                  <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
                }
                primary="Joe Chen"
                secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
                contentAfter={
                  <Icon color={theme.colors.text.muted} icon="chevron-right" />
                }
              />
              <ListItem
                contentBefore={
                  <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
                }
                primary="Joe Chen"
                secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
                contentAfter={
                  <Icon color={theme.colors.text.muted} icon="chevron-right" />
                }
              />
            </ListSection>
          </List>
        </Layer>
      </div>
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
            contentBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Ben McMahen"
            wrap={false}
            secondary="Minim do minim cupidatat veniam aliquip sunt exercitation enim nisi nulla."
            contentAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
          <ListItem
            wrap={false}
            contentBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            contentAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
          <ListItem
            wrap={false}
            contentBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            contentAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
          <ListItem
            wrap={false}
            contentBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            contentAfter={
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
            contentBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Ben McMahen"
            wrap={false}
            secondary="Minim do minim cupidatat veniam aliquip sunt exercitation enim nisi nulla."
            contentAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
          <ListItem
            wrap={false}
            contentBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            contentAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
          <ListItem
            wrap={false}
            contentBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            contentAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
          <ListItem
            wrap={false}
            contentBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            contentAfter={
              <Icon color={theme.colors.text.muted} icon="chevron-right" />
            }
          />
        </List>
      </Layer>
    );
  })
  .add("Single label", () => (
    <List>
      <ListItem
        contentBefore={
          <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
        }
        primary="Ben McMahen"
        wrap={false}
        contentAfter={
          <Icon color={theme.colors.text.muted} icon="chevron-right" />
        }
      />
    </List>
  ));
