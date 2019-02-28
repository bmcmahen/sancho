/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { InputSize, InputGroup } from "../Form";
import { Button } from "../Button";
import theme from "../Theme";
import { Layer } from "../Layer";
import { Text } from "../Text";
import { storiesOf } from "@storybook/react";

export const FormStories = storiesOf("Forms", module)
  .add("different sizes", () => {
    const sizes: Array<InputSize> = ["sm", "md", "lg"];

    return (
      <div css={{ maxWidth: "400px", margin: "3rem" }}>
        {sizes.map(size => (
          <InputGroup
            key={size + size}
            size={size}
            name={size}
            autoComplete="off"
            placeholder="Ben McMahen"
            label={"Your name"}
            helpText="Sunt ullamco anim aliquip ut eiusmod ea eiusmod qui Lorem culpa cupidatat nisi duis."
            defaultValue=""
          />
        ))}
      </div>
    );
  })
  .add("input types", () => (
    <div
      css={{
        background: theme.colors.background.tint1,
        display: "flex",
        justifyContent: "center",
        paddingTop: theme.spaces.xl,
        paddingBottom: theme.spaces.xl
      }}
    >
      <Layer css={{ maxWidth: "400px", width: "100%" }} elevation={"lg"}>
        <div
          css={{
            borderTopLeftRadius: theme.radii.lg,
            borderTopRightRadius: theme.radii.lg,
            background: theme.colors.palette.blue.base,
            padding: theme.spaces.lg
          }}
        >
          <Text css={{ color: "white" }} variant="h3">
            Register
          </Text>
        </div>
        <form css={{ padding: theme.spaces.lg }}>
          <InputGroup
            name="email"
            label="Email address"
            type="email"
            placeholder="name@example.com"
          />
          <InputGroup
            name="textarea"
            label="Example textarea"
            textarea
            helpText="Please provide a brief description of yourself. This will go on your profile."
            placeholder="Some random placeholder"
          />
          <div css={{ textAlign: "right", marginTop: `${theme.spaces.md}` }}>
            <Button intent="primary">Submit</Button>
          </div>
        </form>
      </Layer>
    </div>
  ));
