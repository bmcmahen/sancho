/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { Text } from "../Text";
import { Link } from "../Link";
import { usePositioner } from "../Hooks/use-positioner";

function Example() {
  const { target, popover, arrow } = usePositioner();

  return (
    <div>
      <button ref={target.ref}>Attach to me</button>
      <div
        ref={popover.ref}
        style={popover.style}
        css={{
          width: "300px",
          height: "300px",
          background: "red"
        }}
      >
        <div>hi</div>{" "}
        <div css={{ width: "5px" }} style={arrow.style} ref={arrow.ref} />
      </div>
    </div>
  );
}

export const PositionsExample = storiesOf("Positions", module).add(
  "Basic",
  () => <Example />
);
