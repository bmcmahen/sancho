import { configure, addDecorator } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../src";

// automatically import all files ending in *.stories.tsx
const req = require.context("../src", true, /.stories.tsx$/);
function loadStories() {
  return req.keys().forEach(filename => req(filename));
}

addDecorator(story => <ThemeProvider>{story()}</ThemeProvider>);

configure(loadStories, module);
