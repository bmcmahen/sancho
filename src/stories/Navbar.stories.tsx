/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Navbar } from "../Navbar";
import { Text } from "../Text";
import { Button } from "../Button";
import theme from "../Theme";
import { Layer } from "../Layer";
import { storiesOf } from "@storybook/react";
import { Toolbar } from "../Toolbar";

export const NavbarStories = storiesOf("Navbar", module).add(
  "elevations",
  () => {
    return (
      <div
        css={{
          paddingTop: "55px",
          height: "100vh",
          background: theme.colors.background.tint1
        }}
      >
        <Navbar
          css={{
            color: theme.colors.text.default
          }}
        >
          <Toolbar>
            <Text variant="h4" css={{ color: "inherit" }}>
              Subtitles
            </Text>
            <div css={{ flex: "1" }} />
            <Button
              size="md"
              css={{ marginRight: theme.spaces.sm }}
              variant="ghost"
            >
              Sign up
            </Button>
            <Button size="md" variant="primary">
              Login
            </Button>
          </Toolbar>
        </Navbar>

        <Layer elevation={"sm"} css={{ margin: "3rem", height: "300px" }}>
          Hello world
        </Layer>
      </div>
    );
  }
);
