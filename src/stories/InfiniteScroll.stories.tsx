/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Text } from "../Text";
import { Link } from "../Link";
import { useInfiniteScroll } from "../Hooks/use-infinite-scroll";
import { useRef } from "react";
import * as faker from "faker";
import { ScrollView } from "../ScrollView";
import { List, ListItem } from "../List";
import { Skeleton } from "../Skeleton";
import { Avatar } from "../Avatar";
import { Layer } from "../Layer";
import { IconChevronRight } from "../Icons";
import { useTheme } from "../Theme/Providers";

function fetchdata() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 800);
  });
}

function getUser() {
  faker.seed(0);

  return {
    name: faker.name.firstName() + " " + faker.name.lastName(),
    uid: faker.random.uuid(),
    description: faker.lorem.sentence()
  };
}

function Example() {
  const theme = useTheme();
  const ref = React.useRef<any>(null);
  const [items, setItems] = React.useState(
    Array.from(new Array(10)).map(() => getUser())
  );

  const [page, setPage] = React.useState(0);

  const [fetching] = useInfiniteScroll({
    container: ref,
    hasMore: page < 4,
    onFetch: () => {
      return fetchdata().then(() => {
        setItems([...items, ...Array.from(new Array(10)).map(() => getUser())]);
        setPage(page + 1);
      });
    }
  });

  return (
    <Layer
      css={{
        width: "400px",
        overflow: "hidden"
      }}
    >
      <ScrollView
        css={{
          height: "280px"
        }}
        overflowY
        innerRef={ref}
      >
        <List>
          {items.map(item => (
            <ListItem
              key={item.uid}
              contentBefore={<Avatar name={item.name} />}
              primary={item.name}
              secondary={item.description}
              contentAfter={
                <IconChevronRight color={theme.colors.text.muted} />
              }
            />
          ))}
          {fetching && (
            <ListItem
              interactive={false}
              aria-live="polite"
              aria-busy="true"
              primary={<Skeleton animated css={{ width: "100px" }} />}
              secondary={<Skeleton animated />}
              contentBefore={
                <Skeleton
                  animated
                  css={{
                    width: "3.27rem",
                    height: "3.27rem",
                    borderRadius: "50%"
                  }}
                />
              }
            />
          )}
        </List>
      </ScrollView>
    </Layer>
  );
}

function WindowExample() {
  const [items, setItems] = React.useState(
    Array.from(new Array(10)).map(() => faker.name.firstName())
  );

  const [page, setPage] = React.useState(0);

  const [fetching] = useInfiniteScroll({
    hasMore: page < 4,
    onFetch: () => {
      return fetchdata().then(() => {
        setItems([
          ...items,
          ...Array.from(new Array(10)).map(() => faker.name.firstName())
        ]);
        setPage(page + 1);
      });
    }
  });

  return (
    <div>
      {items.map(item => (
        <div css={{ height: "40px", border: "1px solid" }} key={item}>
          {item}
        </div>
      ))}
      {fetching && <div>Loading...</div>}
    </div>
  );
}

export const ThemeExamples = storiesOf("InfiniteScroll", module)
  .add("Basic usage", () => (
    <div css={{ padding: "1rem" }}>
      <Example />
    </div>
  ))
  .add("Window scroll", () => <WindowExample />);
