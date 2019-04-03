/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { LayerElevations, Layer, LayerLoading } from "../Layer";
import { storiesOf } from "@storybook/react";
import theme from "../Theme";
import { Button } from "../Button";
import { DarkMode } from "../Theme/Providers";
import { Text } from "../Text";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { Tooltip } from "../Tooltip";
import { Popover } from "../Popover";
import { Placement } from "popper.js";
import { MenuList, MenuItem, MenuDivider } from "../Menu";

export const LayerStories = storiesOf("Layer", module)
  .add("Elevation options", () => {
    const elevations: Array<LayerElevations> = ["xs", "sm", "md", "lg"];

    return (
      <div>
        {elevations.map(e => (
          <Layer
            css={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "400px",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "2rem"
            }}
            elevation={e}
          >
            <Tooltip content="This is some tooltip content">
              <Button variant="outline">Hello world. Hover me!!</Button>
            </Tooltip>
            {["auto"].map(placement => (
              <div
                css={{ marginTop: "1rem", textAlign: "center" }}
                key={placement}
              >
                <Popover
                  placement={placement as Placement}
                  content={
                    <MenuList>
                      <MenuItem onSelect={() => alert("Hello 1")}>
                        I will trigger an alert
                      </MenuItem>
                      <MenuItem component="a" href="/bacon">
                        I'm a link
                      </MenuItem>

                      <MenuDivider />
                      <MenuItem>Item three</MenuItem>
                    </MenuList>
                  }
                >
                  <Button>{placement}</Button>
                </Popover>
              </div>
            ))}
          </Layer>
        ))}
      </div>
    );
  })
  .add("Loading", () => {
    return <Loading />;
  })
  .add("Dark", () => {
    return (
      <DarkMode>
        <Layer
          css={{
            padding: "2rem",
            width: "400px",
            height: "200px",
            marginBottom: "2rem"
          }}
          elevation={"md"}
        >
          <Text>Hello world. This is dark mode.</Text>
          <LayerLoading label="Loading in the dark" loading={true} />
        </Layer>
      </DarkMode>
    );
  });

function Loading() {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [loading]);

  return (
    <div
      css={{
        background: theme.colors.background.tint2,
        padding: "3rem"
      }}
    >
      <Layer
        css={{
          width: "400px",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Button onClick={() => setLoading(true)}>Trigger loading</Button>
        <LayerLoading loading={loading} />
      </Layer>
    </div>
  );
}
