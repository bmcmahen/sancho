/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import defaultTheme from "../Theme";
import { Image } from "../Image";
import * as React from "react";

const src =
  "https://images.unsplash.com/photo-1563377176922-062e6ae09ceb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80";

function ZoomedExample() {
  const [zoom, setZoom] = React.useState(false);

  return (
    <div>
      <Image
        css={{ width: "300px", height: "auto" }}
        src={src}
        zoomed={zoom}
        onClick={() => setZoom(!zoom)}
      />
    </div>
  );
}

export const ImageStory = storiesOf("Image", module).add("zooming", () => {
  return <ZoomedExample />;
});
