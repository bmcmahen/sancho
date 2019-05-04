import { configure, addDecorator } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../src";
import "focus-visible";
import { ToggleDarkMode } from "../src/stories/ToggleDarkMode";

// automatically import all files ending in *.stories.tsx
const req = require.context("../src", true, /.stories.tsx$/);
function loadStories() {
  return req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  <ThemeProvider>
    <ToggleDarkMode>{story()}</ToggleDarkMode>
  </ThemeProvider>
));

configure(loadStories, module);
