/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Tabs, Tab, TabPanel, TabIcon } from "../Tabs";
import theme from "../Theme";
import { Text } from "../Text";
import { Container } from "../Container";
import { Badge } from "../Badge";
import { storiesOf } from "@storybook/react";
import { Layer } from "../Layer";
import { Button } from "../Button";
import { DarkMode, useTheme, LightMode } from "../Theme/Providers";
import { IconActivity, IconAlertCircle, IconAlignLeft } from "../Icons";
import { GestureView } from "../GestureView";
import { ExampleList } from "./List.stories";
import { StateType } from "pan-responder-hook";

const Example = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  return (
    <div
      css={{
        maxWidth: "100vw",
        paddingTop: theme.spaces.xl,
        background: theme.colors.background.tint1
      }}
    >
      <Tabs value={value} onChange={i => setValue(i)}>
        <Tab id="course">Course events</Tab>
        <Tab id="settings">Settings</Tab>
        <Tab id="templates">Templates</Tab>
        <Tab id="courses">Courses</Tab>
        <Tab id="members">Team members</Tab>
      </Tabs>
    </div>
  );
};

export const TabsExamples = storiesOf("Tabs", module)
  .add("Basic usage", () => <Example />)

  .add("Evenly spaced", () => {
    return <ParentSwipe />;
  })
  .add("Toggle display example", () => {
    return <ToggleDisplayExample />;
  })
  .add("Icons", () => {
    return <IconExample />;
  });

function IconExample() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        background: theme.colors.background.tint2,
        padding: "0.5rem"
      }}
    >
      <Layer
        elevation="sm"
        css={{
          maxWidth: "400px",
          maxHeight: "500px",
          width: "100%",
          display: "block",
          boxSizing: "border-box",
          overflow: "hidden"
        }}
      >
        <div
          css={{
            background: theme.colors.background.tint1,
            boxSizing: "border-box",
            width: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "200px"
          }}
        >
          <div
            css={{
              flex: 1
            }}
          />
          <div>
            <Tabs
              variant="evenly-spaced"
              slider={false}
              css={{ background: theme.colors.background.default }}
              value={value}
              onChange={i => setValue(i)}
            >
              <Tab id="hello">
                <TabIcon icon={<IconActivity />} label="Chat" />
              </Tab>
              <Tab id="cool">
                <TabIcon icon={<IconAlertCircle />} label="Annotation" />
              </Tab>
              <Tab id="tables">
                <TabIcon icon={<IconAlignLeft />} label="Application" />
              </Tab>
              <Tab id="players">
                <TabIcon icon={<IconActivity />} label="Build" />
              </Tab>
              <Tab id="dsf">
                <TabIcon icon={<IconActivity />} label="Chart" />
              </Tab>
            </Tabs>
          </div>
        </div>
      </Layer>
    </div>
  );
}

function EvenlySpaced({ onRequestChange, value, onTerminationRequest }: any) {
  return (
    <Layer
      elevation="sm"
      css={{
        background: "white",
        maxWidth: "600px",
        width: "100%",
        display: "block",
        borderRadius: 0,
        boxSizing: "border-box",
        overflow: "hidden"
      }}
    >
      <div
        css={{
          boxSizing: "border-box",
          width: "100%",
          overflow: "hidden"
        }}
      >
        <DarkMode>
          <div
            css={{
              position: "relative",
              zIndex: theme.zIndices.sticky,
              background: theme.colors.palette.blue.base
            }}
          >
            <Container>
              <Text
                variant="h5"
                gutter={false}
                css={{
                  textAlign: "center",
                  padding: theme.spaces.md
                }}
              >
                Messenger
              </Text>
            </Container>
            <Tabs
              variant="evenly-spaced"
              value={value}
              onChange={onRequestChange}
            >
              <Tab id="hello">Contacts</Tab>
              <Tab id="cool">Inbox</Tab>
              <Tab id="tables">Notifications</Tab>
              <Tab id="players">Settings</Tab>
            </Tabs>
          </div>
        </DarkMode>
        <GestureView
          css={{ maxHeight: "400px" }}
          value={value}
          onTerminationRequest={onTerminationRequest}
          onRequestChange={onRequestChange}
        >
          <TabPanel id="hello" css={{ flex: 1 }}>
            <ExampleList />
          </TabPanel>
          <TabPanel id="cool" css={{ flex: 1, padding: "24px" }}>
            Inbox content
          </TabPanel>
          <TabPanel id="tables" css={{ flex: 1, padding: "24px" }}>
            Notification list
          </TabPanel>
          <TabPanel id="players" css={{ flex: 1, padding: "24px" }}>
            Settings tab content
          </TabPanel>
        </GestureView>
      </div>
    </Layer>
  );
}

function ToggleDisplayExample() {
  const [show, setShow] = React.useState(true);

  return (
    <div>
      <Button onClick={() => setShow(!show)}>Toggle</Button>
      <div css={{ display: show ? "block" : "none" }}>
        <EvenlySpaced />
      </div>
    </div>
  );
}

function ParentSwipe() {
  const [parentIndex, setParentIndex] = React.useState(1);
  const [childIndex, setChildIndex] = React.useState(0);

  function onParentTerminationRequest({ delta }: StateType) {
    if (childIndex !== 0) {
      return true;
    }

    const [x] = delta;

    if (x < 0) {
      return true;
    }

    return false;
  }

  function onChildTerminationRequest({ delta }: StateType) {
    if (childIndex > 0) {
      return false;
    }

    const [x] = delta;

    if (x < 0) {
      return false;
    }

    return true;
  }

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        background: theme.colors.background.tint2
      }}
    >
      <GestureView
        onTerminationRequest={onParentTerminationRequest}
        value={parentIndex}
        onRequestChange={i => setParentIndex(i)}
      >
        <div
          css={{
            backgroundImage: `url(https://images.unsplash.com/photo-1556861460-7d38b2955d05?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80)`,
            backgroundSize: "cover",
            flex: 1
          }}
        />
        <EvenlySpaced
          value={childIndex}
          onRequestChange={(i: number) => setChildIndex(i)}
          onTerminationRequest={onChildTerminationRequest}
        />
      </GestureView>
    </div>
  );
}
