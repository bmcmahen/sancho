/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Button } from "../Button";
import { Collapse, useCollapse } from "../Collapse";
import { storiesOf } from "@storybook/react";

const Example = () => {
  const state = useCollapse(false);
  const [more, showMore] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      showMore(5 + more);
    }, 2000);

    return () => clearTimeout(timer);
  }, [more]);

  return (
    <div>
      <Button {...state.buttonProps}>Click to reveal!</Button>
      <Collapse {...state.collapseProps}>
        <div>This is some crazy content</div>
        <div>This is some crazy content</div>
        <div>This is some crazy content</div>
        {new Array(more).fill(null).map((a, i) => (
          <div key={i}>Item number {i}</div>
        ))}
      </Collapse>
    </div>
  );
};

export const CollapseStories = storiesOf("Collapse", module)
  .add("basic", () => {
    return (
      <div>
        <Example />
      </div>
    );
  })
  .add("mounted on open", () => (
    <div>
      <Collapse id="hi" show>
        <div>This is some crazy content</div>
        <div>This is some crazy content</div>
        <div>This is some crazy content</div>
        {new Array(0).fill(null).map((a, i) => (
          <div key={i}>Item number {i}</div>
        ))}
      </Collapse>
    </div>
  ));
