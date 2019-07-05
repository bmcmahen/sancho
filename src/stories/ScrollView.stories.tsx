/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import defaultTheme from "../Theme";
import { IconActivity, IconAirplay, IconAlertOctagon } from "../Icons";
import { useState, useRef } from "react";
import { GestureView } from "../GestureView";
import { ScrollView, ScrollViewHandles } from "../ScrollView";
import * as React from "react";
import { Layer } from "../Layer";
import { Toolbar } from "../Toolbar";
import { Text } from "../Text";
import { Tabs, Tab } from "../Tabs";
import { List, ListItem } from "../List";
import { Avatar } from "../Avatar";
import { Badge } from "../Badge";
import * as faker from "faker";

export const ScrollViewStories = storiesOf("ScrollView", module)
  .add("within gesture", () => {
    return <Example />;
  })
  .add("overflowY", () => <Direction />)
  .add("animated scroll", () => <AnimatedScroll />)
  .add("tabs example", () => <TabsExample />);

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

function TabsExample() {
  const [tab, setTab] = useState(0);

  return (
    <Layer className="List-example">
      <Toolbar className="List-toolbar">
        <Text gutter={false} variant="h6">
          My Chat App
        </Text>
      </Toolbar>

      <Tabs variant="evenly-spaced" onChange={i => setTab(i)} value={tab}>
        <Tab id={"family"}>Family</Tab>
        <Tab id="work">Work</Tab>
        <Tab id="fav">Favorites</Tab>
        <Tab id="groups">Groups</Tab>
      </Tabs>

      <div>
        <List>
          <ListItem
            contentBefore={
              <Avatar name={"Lynn Apple"} src={faker.image.avatar()} />
            }
            primary="Lynn Apple"
            wrap={false}
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            contentAfter={<Badge>1</Badge>}
          />
          <ListItem
            contentBefore={
              <Avatar name={"Mary Joe"} src={faker.image.avatar()} />
            }
            primary="Mary Joe"
            wrap={false}
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            contentAfter={<Badge>4</Badge>}
          />
        </List>
      </div>
    </Layer>
  );
}
