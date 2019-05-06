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
    return <EvenlySpaced />;
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

function EvenlySpaced() {
  const [value, setValue] = React.useState(0);

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        background: theme.colors.background.tint2
      }}
    >
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
        <DarkMode>
          <div
            css={{
              boxSizing: "border-box",
              width: "100%",
              overflow: "hidden"
            }}
          >
            <div
              css={{
                background: theme.colors.palette.blue.base
              }}
            >
              <Container>
                <Text
                  variant="h5"
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
                onChange={i => setValue(i)}
              >
                <Tab id="hello">Contacts</Tab>
                <Tab id="cool">Inbox</Tab>
                <Tab id="tables">Notifications</Tab>
                <Tab id="players">Settings</Tab>
              </Tabs>
            </div>
            <GestureView
              css={{ maxHeight: "400px" }}
              value={value}
              onRequestChange={i => setValue(i)}
            >
              <TabPanel id="hello" css={{ flex: 1 }}>
                <LightMode>
                  <ExampleList />
                </LightMode>
              </TabPanel>
              <TabPanel id="cool" css={{ flex: 1, padding: "24px" }}>
                Some breaking news
              </TabPanel>
              <TabPanel id="tables" css={{ flex: 1, padding: "24px" }}>
                Some breaking news
              </TabPanel>
              <TabPanel id="players" css={{ flex: 1, padding: "24px" }}>
                Some player info
              </TabPanel>
            </GestureView>
          </div>
        </DarkMode>
      </Layer>
    </div>
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
