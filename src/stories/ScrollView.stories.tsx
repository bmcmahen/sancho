/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import defaultTheme from "../Theme";
import { IconActivity, IconAirplay, IconAlertOctagon } from "../Icons";
import { useState, useRef } from "react";
import { GestureView } from "../GestureView";
import { ScrollView, ScrollViewHandles } from "../ScrollView";
import * as React from "react";

export const ScrollViewStories = storiesOf("ScrollView", module)
  .add("within gesture", () => {
    return <Example />;
  })
  .add("overflowY", () => <Direction />)
  .add("animated scroll", () => <AnimatedScroll />);

function Example() {
  const [index, setIndex] = useState(0);
  return (
    <div css={{ width: "200px" }}>
      <GestureView
        css={{ height: "400px " }}
        value={index}
        onRequestChange={i => setIndex(i)}
      >
        <div css={{ flex: 1, background: "green" }}>
          <ScrollView overflowX>
            <div css={{ width: "300px", background: "yellow" }}>
              this scrolls i guess expe Aute fugiat esse nulla enim esse
              reprehenderit do.
            </div>
          </ScrollView>
        </div>

        <div css={{ flex: 1, background: "red" }} />
      </GestureView>
    </div>
  );
}

function Direction() {
  const [index, setIndex] = useState(0);
  return (
    <div css={{ width: "200px" }}>
      <GestureView
        css={{ height: "400px " }}
        value={index}
        onRequestChange={i => setIndex(i)}
      >
        <div css={{ flex: 1, background: "green" }}>
          <ScrollView overflowY css={{ height: "200px" }}>
            <div css={{ height: "400px", background: "yellow" }}>
              this scrolls i guess expe Aute fugiat esse nulla enim esse
              reprehenderit do.
            </div>
          </ScrollView>
        </div>

        <div css={{ flex: 1, background: "red" }} />
      </GestureView>
    </div>
  );
}

function AnimatedScroll() {
  const ref = useRef<ScrollViewHandles>(null);

  function scroll() {
    console.log(ref);
    ref.current!.scrollTo(undefined, 400);
  }

  return (
    <ScrollView css={{ height: "300px" }} overflowY ref={ref}>
      <div css={{ height: "600px" }}>
        some scroll content
        <button onClick={scroll}>scroll to 300</button>
      </div>
      <React.Fragment>
        <button onClick={() => ref.current!.scrollTo(undefined, 0)}>
          scroll to 0
        </button>
      </React.Fragment>
    </ScrollView>
  );
}
