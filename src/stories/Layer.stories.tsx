/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { LayerElevations, Layer, LayerLoading } from "../Layer";
import { storiesOf } from "@storybook/react";
import theme from "../Theme";
import { Button } from "../Button";

export const LayerStories = storiesOf("Layer", module)
  .add("Elevation options", () => {
    const elevations: Array<LayerElevations> = ["xs", "sm", "md", "lg"];

    return (
      <div>
        {elevations.map(e => (
          <Layer
            css={{ width: "400px", height: "200px", marginBottom: "2rem" }}
            elevation={e}
          >
            <div />
          </Layer>
        ))}
      </div>
    );
  })
  .add("Loading", () => {
    return <Loading />;
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
