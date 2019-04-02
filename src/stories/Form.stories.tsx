/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { InputSize, InputGroup, Select, Input, TextArea, Check } from "../Form";
import { Button } from "../Button";
import theme from "../Theme";
import { Layer } from "../Layer";
import { Text } from "../Text";
import { storiesOf } from "@storybook/react";
import { ToggleDarkMode } from "./ToggleDarkMode";

export const FormStories = storiesOf("Forms", module).add("input types", () => (
  <ToggleDarkMode>
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        paddingTop: theme.spaces.xl,
        paddingBottom: theme.spaces.xl
      }}
    >
      <Layer css={{ maxWidth: "400px", width: "100%" }} elevation={"lg"}>
        <form css={{ padding: theme.spaces.lg }}>
          <InputGroup error="Required field" label="Email address">
            <Input placeholder="ben.mcmahen@gmail.com" />
          </InputGroup>

          <InputGroup label="Gender">
            <Select>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Select>
          </InputGroup>

          <InputGroup label="Gender">
            <div>
              <Check label="Male" checked />
              <Check label="Female" />
              <Check label="Other" />
            </div>
          </InputGroup>

          <InputGroup
            label="Example textarea"
            helpText="Please provide a brief description of yourself. This will go on your profile."
          >
            <TextArea placeholder="Something about me" />
          </InputGroup>
          <div css={{ textAlign: "right", marginTop: `${theme.spaces.md}` }}>
            <Button intent="primary">Submit</Button>
          </div>
        </form>
      </Layer>
    </div>
  </ToggleDarkMode>
));
