/** @jsx jsx */
import { jsx, Global, css } from "@emotion/core";
import * as React from "react";
import toaster, { Position } from "toasted-notes";
import { Alert, AlertIntentions } from "./Alert";

const toastStyles = css`
  .Toaster__manager-top {
    max-width: 560px;
    margin: 0 auto;
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 5500;
    pointer-events: none;
  }

  .Toaster__manager-top-left {
    max-width: 560px;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 5500;
    pointer-events: none;
  }

  .Toaster__manager-top-right {
    max-width: 560px;
    top: 0;
    right: 0;
    position: fixed;
    z-index: 5500;
    pointer-events: none;
  }

  .Toaster__manager-bottom-left {
    max-width: 560px;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 5500;
    pointer-events: none;
  }

  .Toaster__manager-bottom {
    max-width: 560px;
    margin: 0 auto;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 5500;
    pointer-events: none;
  }

  .Toaster__manager-bottom-right {
    max-width: 560px;
    bottom: 0;
    right: 0;
    position: fixed;
    z-index: 5500;
    pointer-events: none;
  }

  .Toaster__message {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .Toaster__manager-bottom-right .Toaster__message,
  .Toaster__manager-top-right .Toaster__message {
    align-items: flex-end;
  }

  .Toaster__manager-bottom-left .Toaster__message,
  .Toaster__manager-top-left .Toaster__message {
    align-items: flex-start;
  }

  .Toaster__message-wrapper {
    padding: 8px;
  }
`;

interface renderArgs {
  id: string;
  onClose: () => void;
}

interface Toast {
  position?: keyof typeof Position;
  duration?: number | null;
  title?: string;
  subtitle?: string;
  intent?: AlertIntentions;
  render?: (options: renderArgs) => React.ReactNode;
}

/**
 * toast is exported as a singleton which can be called with
 * various options. By default, it renders an Alert component.
 */

export const toast = ({
  position,
  duration,
  render,
  title,
  subtitle,
  intent
}: Toast) => {
  const options = {
    position,
    duration
  };

  if (render) {
    return toaster.notify(
      ({ onClose, id }) => (
        <React.Fragment>
          <Global styles={toastStyles} />
          {render({ onClose, id })}
        </React.Fragment>
      ),
      options
    );
  }

  toaster.notify(
    ({ onClose, id }) => (
      <React.Fragment>
        <Global styles={toastStyles} />
        <Alert
          id={String(id)}
          title={title}
          component="div"
          elevation={"md"}
          subtitle={subtitle}
          intent={intent}
          onRequestClose={onClose}
        />
      </React.Fragment>
    ),
    options
  );
};

export default toast;
