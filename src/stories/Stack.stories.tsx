/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { Text } from "../Text";
import { Link } from "../Link";
import * as faker from "faker";
import { useTheme } from "../Theme/Providers";
import * as React from "react";
import { Stack, StackTitle, StackItem, Layer } from "../index";
import { ScrollView } from "../ScrollView";
import { List, ListItem } from "../List";
import { IconChevronRight, IconPlus } from "../Icons";
import { IconButton } from "../IconButton";
import { Avatar } from "../Avatar";

function getUser() {
  faker.seed(0);

  return {
    name: faker.name.firstName() + " " + faker.name.lastName(),
    uid: faker.random.uuid(),
    description: faker.lorem.sentence()
  };
}

function ListDetail() {
  const theme = useTheme();
  const [index, setIndex] = React.useState(0);
  const [items, setItems] = React.useState(
    Array.from(new Array(10)).map(() => getUser())
  );

  function next() {
    setIndex(index + 1);
  }

  function onChange(i: number) {
    setIndex(i);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "2rem"
      }}
    >
      <div
        style={{
          border: `1px solid ${theme.colors.border.default}`,
          height: "500px",
          width: "400px",
          overflow: "hidden"
        }}
      >
        <Stack
          navHeight={60}
          style={{
            height: "100%",
            width: "100%"
          }}
          items={[
            {
              title: <StackTitle title="Contacts" />,
              content: (
                <StackItem>
                  <ScrollView css={{ flex: 1 }} overflowY>
                    <List>
                      <ListItem
                        onPress={() => setIndex(index + 1)}
                        primary="All"
                        contentAfter={
                          <IconChevronRight color={theme.colors.text.muted} />
                        }
                      />
                      <ListItem
                        onPress={() => setIndex(index + 1)}
                        primary="Family"
                        contentAfter={
                          <IconChevronRight color={theme.colors.text.muted} />
                        }
                      />
                      <ListItem
                        onPress={() => setIndex(index + 1)}
                        primary="Friends"
                        contentAfter={
                          <IconChevronRight color={theme.colors.text.muted} />
                        }
                      />
                    </List>
                  </ScrollView>
                </StackItem>
              )
            },
            {
              title: (
                <StackTitle
                  title="Family"
                  contentAfter={
                    <IconButton
                      variant="ghost"
                      label="Add"
                      icon={<IconPlus />}
                    />
                  }
                />
              ),
              content: (
                <StackItem>
                  <div
                    style={{
                      flexDirection: "column",
                      display: "flex",
                      height: "100%"
                    }}
                  >
                    <ScrollView css={{ flex: 1, height: "100%" }} overflowY>
                      <List>
                        {items.map(item => (
                          <ListItem
                            key={item.uid}
                            onPress={() => setIndex(index + 1)}
                            contentBefore={<Avatar name={item.name} />}
                            primary={item.name}
                            secondary={item.description}
                            contentAfter={
                              <IconChevronRight
                                color={theme.colors.text.muted}
                              />
                            }
                          />
                        ))}
                      </List>
                    </ScrollView>
                  </div>
                </StackItem>
              )
            },
            {
              title: <StackTitle title="I'm in a tree!" />,
              content: (
                <StackItem>
                  <div
                    style={{
                      flexDirection: "column",
                      display: "flex",
                      height: "100%",
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1562519776-b232435b73c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80)",
                      backgroundSize: "cover"
                    }}
                  />
                </StackItem>
              )
            }
          ]}
          onIndexChange={onChange}
          index={index}
        />
      </div>
    </div>
  );
}

export const ThemeExamples = storiesOf("Stack", module)
  .add("Drilldown nav", () => <ListDetail />)
  .add("Without header", () => <WithoutHeader />);

function WithoutHeader() {
  const [index, setIndex] = React.useState(0);
  return (
    <Stack
      index={index}
      disableNav
      css={{ height: "400px", width: "400px" }}
      items={[
        {
          title: null,
          content: (
            <StackItem
              onClick={() => setIndex(index + 1)}
              css={{
                backgroundImage: `url(https://images.unsplash.com/photo-1556909114-44e3e70034e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)`,
                backgroundSize: "cover"
              }}
            />
          )
        },
        {
          title: null,
          content: (
            <StackItem
              css={{
                backgroundImage: `url(https://images.unsplash.com/photo-1558980664-10e7170b5df9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80)`,
                backgroundSize: "cover"
              }}
            />
          )
        },
        {
          title: null,
          content: (
            <StackItem
              css={{
                backgroundImage: `url(https://images.unsplash.com/photo-1562619398-e7a474328df3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)`,
                backgroundSize: "cover"
              }}
            />
          )
        }
      ]}
      onIndexChange={i => setIndex(i)}
    />
  );
}
