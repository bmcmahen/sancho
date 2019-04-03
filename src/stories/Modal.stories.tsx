/** @jsx jsx */
import { jsx, css, SerializedStyles } from "@emotion/core";
import * as React from "react";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { Text } from "../Text";
import theme from "../Theme";
import { storiesOf } from "@storybook/react";
import { ToggleDarkMode } from "./ToggleDarkMode";

function Demo(props: { mobileFullscreen?: boolean }) {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setShow(true)}>Show</Button>

      <Modal
        isOpen={show}
        onRequestClose={() => setShow(false)}
        title="Hello world"
        {...props}
      >
        <div css={{ padding: "1.5rem" }}>
          <Text>
            Mollit fugiat ex irure tempor. Cillum non Lorem et enim anim est.
            Cillum adipisicing tempor adipisicing pariatur ex ut excepteur.
            Lorem Lorem minim deserunt est. Deserunt ea est ad reprehenderit
            fugiat dolor eiusmod exercitation. Consequat esse minim nulla
            commodo voluptate labore incididunt in deserunt ea exercitation enim
            commodo ad. Do Lorem voluptate nisi aliquip amet anim voluptate
            laborum.
          </Text>
          <div
            css={{
              marginTop: theme.spaces.lg,
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <Button variant="ghost">Cancel</Button>
            <Button css={{ marginLeft: theme.spaces.sm }} intent="primary">
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export const ModalStories = storiesOf("Modal", module)
  .add("Standard usage", () => {
    return <Demo />;
  })
  .add("Fullscreen mobile", () => {
    return <Demo mobileFullscreen />;
  });
