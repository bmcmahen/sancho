/** @jsx jsx */
import { jsx, css, SerializedStyles } from "@emotion/core";
import * as React from "react";
import { Button, ButtonIntent, ButtonVariant, ButtonSize } from "../Button";
import { storiesOf } from "@storybook/react";
import theme from "../Theme";
import { DarkMode, useTheme, LightMode } from "../Theme/Providers";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export const ButtonStories = storiesOf("Button", module)
  .add("variants", () => {
    const sizes: Array<ButtonSize> = ["xs", "sm", "md", "lg", "xl"];

    const appearance: Array<ButtonVariant> = ["default", "ghost", "outline"];
    const intents: Array<ButtonIntent> = [
      "none",
      "primary",
      "success",
      "danger",
      "warning"
    ];

    return (
      <div>
        {appearance.map(appearance => (
          <div key={appearance}>
            {sizes.map(size => (
              <div key={size} style={{ padding: "0.5rem" }}>
                {intents.map(intent => (
                  <Button
                    key={size + appearance}
                    size={size}
                    css={{ marginRight: "1rem", textTransform: "capitalize" }}
                    variant={appearance}
                    intent={intent}
                    onClick={() => alert("hello there")}
                  >
                    {intent}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  })

  .add("disabled", () => {
    const variants: Array<ButtonVariant> = ["default", "ghost", "outline"];
    const intents: Array<ButtonIntent> = [
      "none",
      "primary",
      "success",
      "danger",
      "warning"
    ];

    return (
      <div>
        {variants.map(variant => {
          return (
            <div key={variant}>
              {intents.map(intent => (
                <Button
                  key={intent}
                  css={{ margin: "1rem" }}
                  intent={intent}
                  disabled
                  variant={variant}
                >
                  {intent}
                </Button>
              ))}
            </div>
          );
        })}
      </div>
    );
  })
  .add("with icons", () => (
    <ToggleDarkMode>
      <div
        css={{
          "& > *": {
            margin: theme.spaces.md
          }
        }}
      >
        <Button iconBefore={<FiArrowLeft />}>Icon before</Button>
        <Button iconAfter={<FiArrowRight />}>Icon after</Button>
        <Button iconBefore={<FiArrowLeft />} iconAfter={<FiArrowRight />}>
          Icon before and after
        </Button>
        <Button iconAfter={<FiArrowRight />} intent="primary">
          Icon after
        </Button>
        <Button iconAfter={<FiArrowRight />} intent="primary" variant="outline">
          Icon after
        </Button>
        <Button iconAfter={<FiArrowRight />} intent="primary" variant="ghost">
          Icon after
        </Button>
        {["xs", "sm", "md", "lg", "xl"].map(size => {
          return (
            <Button
              size={size as ButtonSize}
              iconAfter={<FiArrowRight />}
              intent="primary"
              variant="outline"
            >
              Icon after
            </Button>
          );
        })}
      </div>
    </ToggleDarkMode>
  ))
  .add("block", () => {
    return (
      <div
        css={{
          margin: "1rem",
          "& > *": {
            maxWidth: "300px",
            marginTop: theme.spaces.md
          }
        }}
      >
        <Button block>Hello</Button>
        <Button block iconBefore={<FiArrowRight />}>
          with icon before
        </Button>
        <Button block iconAfter={<FiArrowRight />}>
          With icon after
        </Button>
        <Button
          block
          iconBefore={<FiArrowRight />}
          iconAfter={<FiArrowRight />}
        >
          Two icons
        </Button>
      </div>
    );
  })
  .add("contrast checks", () => {
    return <ContrastExample />;
  });

function ContrastExample() {
  const theme = useTheme();
  return (
    <DarkMode>
      <div
        css={{
          padding: "2rem",
          background: theme.colors.intent.none.base,
          "& > *": { margin: "1rem" }
        }}
      >
        <Button>Hello world</Button>
        <Button intent="primary">Primary</Button>
        <Button intent="success">Success</Button>
        <Button intent="warning">Warning</Button>
        <Button intent="danger">Warning</Button>
      </div>
      <div
        css={{
          padding: "2rem",
          background: theme.colors.background.tint2,
          "& > *": { margin: "1rem" }
        }}
      >
        <Button>Hello world</Button>
        <Button intent="primary">Primary</Button>
        <Button intent="success">Success</Button>
        <Button intent="warning">Warning</Button>
        <Button intent="danger">Warning</Button>
      </div>

      <div
        css={{
          padding: "2rem",
          background: theme.colors.intent.primary.dark,
          "& > *": { margin: "1rem" }
        }}
      >
        <Button>Hello world</Button>
        <Button intent="primary">Primary</Button>
        <Button intent="success">Success</Button>
        <Button intent="warning">Warning</Button>
        <Button intent="danger">Warning</Button>
      </div>
    </DarkMode>
  );
}
