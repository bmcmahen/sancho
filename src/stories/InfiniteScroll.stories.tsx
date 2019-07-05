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

function fetchdata() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
}

function Example() {
  const ref = React.useRef<any>(null);
  const [items, setItems] = React.useState(
    Array.from(new Array(10)).map(() => faker.name.firstName())
  );

  const [page, setPage] = React.useState(0);

  const [fetching] = useInfiniteScroll({
    container: ref,
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
    <ScrollView
      css={{
        border: "1px solid",
        height: "200px",
        width: "200px",
        overflow: "scroll"
      }}
      innerRef={ref}
    >
      {items.map(item => (
        <div css={{ height: "40px", border: "1px solid" }} key={item}>
          {item}
        </div>
      ))}
      {fetching && <div>Loading...</div>}
    </ScrollView>
  );
}

export const ThemeExamples = storiesOf("InfiniteScroll", module).add(
  "Basic usage",
  () => (
    <div css={{ padding: "1rem" }}>
      <Example />
    </div>
  )
);
