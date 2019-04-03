/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Avatar, AvatarSizes } from "../Avatar";
import faker from "faker";
import { storiesOf } from "@storybook/react";
import { ToggleDarkMode } from "./ToggleDarkMode";

export const AvatarStories = storiesOf("Avatar", module).add("basic", () => {
  const names = new Array(10).fill(null).map(a => faker.name.findName());
  const sizes: AvatarSizes[] = ["xs", "sm", "md", "lg", "xl"];

  return (
    <div>
      {sizes.map(size => (
        <div css={{ display: "flex" }}>
          {names.map(name => (
            <Avatar
              size={size}
              name={name}
              css={{ margin: "0.25rem" }}
              key={name}
            />
          ))}
        </div>
      ))}

      {sizes.map(size => (
        <div css={{ display: "flex" }}>
          {names.map(name => (
            <Avatar
              size={size}
              name={name}
              src={faker.image.avatar()}
              css={{ margin: "0.25rem" }}
              key={name}
            />
          ))}
        </div>
      ))}
    </div>
  );
});
