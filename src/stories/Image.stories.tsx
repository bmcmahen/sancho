/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import defaultTheme from "../Theme";
import { Image } from "../Image";
import * as React from "react";
import { Container } from "../Container";
import { Text } from "../Text";

const images = [
  "https://images.unsplash.com/photo-1563285851-d81750ac22fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
  "https://images.unsplash.com/flagged/photo-1563364167-87891bc85a8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80",
  "https://images.unsplash.com/photo-1563305135-51670e86b863?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1563335510-4b24f632a5fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
  "https://images.unsplash.com/photo-1563333576-c5c1ccec85fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
];

function ZoomedExample() {
  const [zoom, setZoom] = React.useState(null);

  return (
    <div css={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
      {images.map(src => (
        <Image
          key={src}
          css={{
            margin: "1rem",
            width: "300px",
            height: "auto"
          }}
          src={src}
          zoomed={src === zoom}
          onClick={() => setZoom(src)}
          onRequestClose={() => setZoom(null)}
        />
      ))}
    </div>
  );
}

export const ImageStory = storiesOf("Image", module).add("zooming", () => {
  return <ZoomedExample />;
});
