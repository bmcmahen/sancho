/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import toaster, { Position } from "toasted-notes";
import "toasted-notes/lib/index.css";
import { Alert, AlertIntentions } from "./Alert";

interface Toast {
  position?: keyof typeof Position;
  duration?: number | null;
  title?: string;
  subtitle?: string;
  intent?: AlertIntentions;
  render?: () => React.ReactNode;
}

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
    return toaster.notify(render, options);
  }

  toaster.notify(
    ({ onClose, id }) => (
      <Alert
        id={id}
        title={title}
        component="div"
        elevation={"md"}
        subtitle={subtitle}
        intent={intent}
        onRequestClose={onClose}
      />
    ),
    options
  );
};

export default toast;
