/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { usePanResponder } from "../Hooks/use-pan-responder";

function Child() {
  const [active, setActive] = React.useState();
  const bind = usePanResponder(
    {
      onStartShouldSet: () => true,
      onGrant: () => setActive(true),
      onRelease: () => setActive(false),
      onTerminate: () => setActive(false)
    },
    "child"
  );

  return (
    <div
      {...bind}
      css={{
        width: "100px",
        height: "100px",
        background: active ? "#ddd" : "#eee"
      }}
    >
      Child
    </div>
  );
}

function Parent() {
  const [active, setActive] = React.useState();
  const bind = usePanResponder(
    {
      onStartShouldSet: () => true,
      onGrant: state => {
        console.log(state);
        setActive(true);
      },
      onRelease: () => setActive(false),
      onMoveShouldSet: () => true,
      onTerminate: () => setActive(false)
    },
    "parent"
  );

  return (
    <div
      css={{
        width: "200px",
        height: "200px",
        border: active ? "2px solid blue" : "2px solid black"
      }}
      {...bind}
    >
      <Child />
    </div>
  );
}

export const PanResponder = storiesOf("PanResponder", module).add(
  "delegation",
  () => {
    return (
      <div
        css={{
          "& > *": {
            margin: "1rem"
          }
        }}
      >
        <Parent />
      </div>
    );
  }
);
