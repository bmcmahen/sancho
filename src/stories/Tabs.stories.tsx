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
import { TabContent } from "../TabContent";
import { Icon } from "../Icons";
import { Button } from "../Button";

const Example = () => {
  const [value, setValue] = React.useState(0);

  return (
    <div
      css={{
        paddingTop: theme.spaces.xl,
        // borderBottom: "1px solid ",
        // borderColor: theme.colors.border.default,
        background: theme.colors.background.tint1
      }}
    >
      <Tabs value={value} onChange={i => setValue(i)}>
        <Tab id="course" onClick={() => alert("clicked!")}>
          Course events
        </Tab>
        <Tab id="settings" badge={<Badge>1</Badge>}>
          Settings
        </Tab>
        <Tab id="templates">Templates</Tab>
        <Tab id="courses">Courses</Tab>
        <Tab id="members">Team members</Tab>
      </Tabs>
    </div>
  );
};

export const TabsExamples = storiesOf("Tabs", module)
  .add("Light background", () => <Example />)

  .add("Evenly spaced", () => {
    return <EvenlySpaced />;
  })
  .add("Toggle display example", () => {
    return <ToggleDisplayExample />;
  })
  .add("Icons", () => {
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
            >
              hello
            </div>
            <div
              css={{
                background: theme.colors.palette.blue.base
              }}
            >
              <Tabs
                variant="evenly-spaced"
                dark
                slider={false}
                value={0}
                onChange={i => console.log(i)}
              >
                <Tab id="hello">
                  <TabIcon icon="chat" label="Chat" />
                </Tab>
                <Tab id="cool">
                  <TabIcon icon="annotation" label="Annotation" />
                </Tab>
                <Tab id="tables">
                  <TabIcon icon="application" label="Application" />
                </Tab>
                <Tab id="players">
                  <TabIcon icon="build" label="Build" />
                </Tab>
                <Tab id="dsf">
                  <TabIcon icon="chart" label="Chart" />
                </Tab>
              </Tabs>
            </div>
          </div>
        </Layer>
      </div>
    );
  });

function EvenlySpaced() {
  const [value, setValue] = React.useState(0);

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
          maxWidth: "600px",
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
            height: "200px"
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
                  color: "white",
                  textAlign: "center",
                  padding: theme.spaces.md
                }}
              >
                NHL Hockey
              </Text>
            </Container>
            <Tabs
              variant="evenly-spaced"
              dark
              value={value}
              onChange={i => setValue(i)}
            >
              <Tab badge={7} id="hello">
                Games
              </Tab>
              <Tab id="cool">News</Tab>
              <Tab id="tables">Tables</Tab>
              <Tab id="players">Players</Tab>
            </Tabs>
          </div>
          <TabContent value={value} onChange={i => setValue(i)}>
            <TabPanel id="hello" css={{ padding: "24px" }}>
              What's up?
            </TabPanel>
            <TabPanel id="cool" css={{ padding: "24px" }}>
              Some breaking news
            </TabPanel>
            <TabPanel id="tables" css={{ padding: "24px" }}>
              Some breaking news
            </TabPanel>
            <TabPanel id="players" css={{ padding: "24px" }}>
              Some player info
            </TabPanel>
          </TabContent>
        </div>
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
