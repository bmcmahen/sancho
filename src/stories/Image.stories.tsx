/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import defaultTheme from "../Theme";
import { Image } from "../Image";
import * as React from "react";
import { Container } from "../Container";
import { Text } from "../Text";

const src =
  "https://images.unsplash.com/photo-1563285851-d81750ac22fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80";

function ZoomedExample() {
  const [zoom, setZoom] = React.useState(false);

  return (
    <div css={{ padding: "2rem" }}>
      <Container css={{ maxWidth: "650px" }}>
        <Text variant="h2">Nulla magna commodo deserunt ad.</Text>
        <Text variant="lead">
          Exercitation exercitation officia ea eu enim laborum eiusmod fugiat
          aute Lorem reprehenderit nulla officia.
        </Text>
        <Text css={{ marginTop: "1rem" }} variant="paragraph">
          cut excepteur velit adipisicing. Ea officia do ullamco commodo esse
          consectetur elit enim elit elit et. Aute aliqua quis minim tempor id
          commodo magna.
        </Text>

        <div css={{ marginRight: "1rem", marginLeft: 0, float: "left" }}>
          <Image
            caption={"Duis cupidatat ea do aliqua nostrud incididunt fugiat."}
            css={{
              width: "300px",
              height: "auto"
            }}
            src={src}
            zoomed={zoom}
            onClick={() => setZoom(!zoom)}
            onRequestClose={() => setZoom(false)}
          />
        </div>
        <Text variant="paragraph">
          Ipsum elit duis minim sint adipisicing reprehenderit aliqua ut
          excepteur velit adipisicing. Ea officia do ullamco commodo esse
          consectetur elit enim elit elit et. Aute aliqua quis minim tempor id
          commodo magna.
        </Text>
        <Text variant="paragraph">
          Lorem aliqua laboris excepteur ut proident velit et pariatur commodo.
          Consectetur minim aliquip tempor ullamco eu. Sint ullamco nulla et
          magna officia ullamco proident sunt in dolore do ea nostrud nostrud.
          Velit qui et aute voluptate. Sint aute Lorem minim ea dolore minim
          aute commodo ex.
        </Text>
        <Text variant="paragraph">
          Ipsum elit duis minim sint adipisicing reprehenderit aliqua ut
          excepteur velit adipisicing. Ea officia do ullamco commodo esse
          consectetur elit enim elit elit et. Aute aliqua quis minim tempor id
          commodo magna. Minim laborum eu veniam exercitation fugiat veniam
          voluptate dolore officia labore nostrud. Duis magna mollit proident
          elit ullamco. Laborum ea ipsum pariatur elit id quis do ut Lorem
          eiusmod. Consectetur amet commodo occaecat adipisicing ex est ad
          deserunt minim deserunt culpa adipisicing nulla.
        </Text>
        <Text variant="paragraph">
          Lorem aliqua laboris excepteur ut proident velit et pariatur commodo.
          Consectetur minim aliquip tempor ullamco eu. Sint ullamco nulla et
          magna officia ullamco proident sunt in dolore do ea nostrud nostrud.
          Velit qui et aute voluptate. Sint aute Lorem minim ea dolore minim
          aute commodo ex.
        </Text>
      </Container>
    </div>
  );
}

export const ImageStory = storiesOf("Image", module).add("zooming", () => {
  return <ZoomedExample />;
});
