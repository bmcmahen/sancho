/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import defaultTheme from "../Theme";
import { IconActivity, IconAirplay, IconAlertOctagon } from "../Icons";

export const Icon = storiesOf("Icon", module)
  .add("list", () => {
    return (
      <div
        css={{
          "& > *": {
            margin: "1rem"
          }
        }}
      >
        <IconActivity />
        <IconAirplay />
        <IconAlertOctagon size="xl" color="red" />
      </div>
    );
  })
  .add("sizes", () => {
    return ["xs", "sm", "md", "lg", "xl"].map(size => {
      return <IconAirplay size={size as any} />;
    });
  });
