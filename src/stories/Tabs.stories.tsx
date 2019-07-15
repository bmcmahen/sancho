/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import * as React from "react";
import { Tabs, Tab, TabPanel, TabIcon } from "../Tabs";
import theme from "../Theme";
import { Text } from "../Text";
import { Container } from "../Container";
import { storiesOf } from "@storybook/react";
import { Layer } from "../Layer";
import { Button } from "../Button";
import { DarkMode, useTheme, LightMode } from "../Theme/Providers";
import {
  IconActivity,
  IconAlertCircle,
  IconAlignLeft,
  IconArrowRight,
  IconArrowLeft,
  IconSettings,
  IconUser,
  IconPackage,
  IconMapPin,
  IconArrowUp
} from "../Icons";
import { GestureView, Pager } from "../Pager";
import { ExampleList } from "./List.stories";
import { StateType } from "react-gesture-responder";
import { IconButton } from "../IconButton";
import { ResponsivePopover } from "../Popover";
import { MenuList, MenuItem, MenuDivider } from "../Menu";

const Example = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  return (
    <div
      css={{
        maxWidth: "100vw",

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

function EvenlySpaced({
  onRequestParentChange,
  onRequestChange,
  value,
  onTerminationRequest
}: any) {
  return (
    <Layer
      elevation="sm"
      css={{
        background: "white",

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
            <Container
              css={{
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center"
              }}
            >
              <IconButton
                variant="ghost"
                icon={<IconArrowLeft />}
                onPress={() => onRequestParentChange(0)}
                label="Go back"
              />
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
              <LightMode>
                <ResponsivePopover
                  content={
                    <MenuList>
                      <MenuItem
                        contentBefore={<IconUser />}
                        onSelect={() => alert("Hello 1")}
                      >
                        Drink coffee
                      </MenuItem>
                      <MenuItem contentBefore={<IconPackage />}>
                        Eat pancakes
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem contentBefore={<IconMapPin />}>
                        Make pizza
                      </MenuItem>
                      <MenuItem contentBefore={<IconActivity />}>
                        Dance my heart out
                      </MenuItem>
                      <MenuItem contentBefore={<IconArrowUp />}>
                        Anything you ask
                      </MenuItem>
                    </MenuList>
                  }
                >
                  <DarkMode>
                    <IconButton
                      variant="ghost"
                      icon={<IconSettings />}
                      label="Show settings"
                    />
                  </DarkMode>
                </ResponsivePopover>
              </LightMode>
            </Container>
            <Tabs value={value} onChange={onRequestChange}>
              <Tab id="hello">Contacts</Tab>
              <Tab id="cool">Inbox</Tab>
              <Tab id="tables">Notifications</Tab>
              <Tab id="players">Settings</Tab>
              <Tab id="groups">Groups</Tab>
              <Tab id="family">Family</Tab>
            </Tabs>
          </div>
        </DarkMode>
        <Pager
          css={{ maxHeight: "500px" }}
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
          <TabPanel id="groups" css={{ flex: 1, padding: "24px" }}>
            Settings tab content
          </TabPanel>
          <TabPanel id="family" css={{ flex: 1, padding: "24px" }}>
            Settings tab content
          </TabPanel>
        </Pager>
      </div>
    </Layer>
  );
}

function ParentSwipe() {
  const [parentIndex, setParentIndex] = React.useState(0);
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
      <Global
        styles={{
          body: {
            background: theme.colors.background.tint2
          }
        }}
      />
      <div
        css={{
          borderRadius: 0,
          maxWidth: "100vw",
          overflow: "hidden",
          [theme.mediaQueries.sm]: {
            maxWidth: "450px",
            borderRadius: theme.radii.lg
          }
        }}
      >
        <Pager
          onTerminationRequest={onParentTerminationRequest}
          value={parentIndex}
          onRequestChange={i => setParentIndex(i)}
        >
          <div
            css={{
              background: theme.colors.palette.green.base,
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <DarkMode>
              <Text
                css={{
                  display: "flex",
                  height: "300px",
                  alignItems: "center"
                }}
              >
                <Button
                  variant="ghost"
                  onPress={() => setParentIndex(1)}
                  iconAfter={<IconArrowRight />}
                >
                  View next
                </Button>
              </Text>
            </DarkMode>
          </div>
          <EvenlySpaced
            value={childIndex}
            onRequestParentChange={(i: number) => setParentIndex(i)}
            onRequestChange={(i: number) => setChildIndex(i)}
            onTerminationRequest={onChildTerminationRequest}
          />
        </Pager>
      </div>
    </div>
  );
}
