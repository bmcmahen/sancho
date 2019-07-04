/** @jsx jsx */
import { jsx, Global, css } from "@emotion/core";
import * as React from "react";
import toaster, { Position } from "toasted-notes";
import { Alert, AlertIntentions } from "./Alert";
import { Theme } from "./Theme";
import { useTheme, ThemeProvider } from "./Theme/Providers";

const toastStyles = css`
  .Toaster__message-wrapper {
    padding: 8px;
    text-align: left;
  }
`;

interface RenderArgs {
  id: string;
  onClose: () => void;
}

interface Toast {
  position?: keyof typeof Position;
  duration?: number | null;
  title?: string;
  subtitle?: string;
  theme?: Theme;
  intent?: AlertIntentions;
  render?: (options: RenderArgs) => React.ReactNode;
}

/**
 * We export toast as a hook because it allows us to consume
 * the current theme context that it's in and pass that
 * onto our render function
 */

export function useToast() {
  const theme = useTheme();

  function notify({
    position,
    duration,
    render,
    title,
    subtitle,
    intent
  }: Toast) {
    const options = {
      position,
      duration
    };

    if (render) {
      return toaster.notify(
        ({ onClose, id }) => (
          <React.Fragment>
            <Global styles={toastStyles} />
            <ThemeProvider theme={theme}>
              {render({ onClose, id })}
            </ThemeProvider>
          </React.Fragment>
        ),
        options
      );
    }

    toaster.notify(
      ({ onClose, id }) => (
        <React.Fragment>
          <Global styles={toastStyles} />
          <ThemeProvider theme={theme}>
            <Alert
              id={String(id)}
              title={title}
              component="div"
              elevation={"md"}
              subtitle={subtitle}
              intent={intent}
              onRequestClose={onClose}
            />
          </ThemeProvider>
        </React.Fragment>
      ),
      options
    );
  }

  return notify;
}
