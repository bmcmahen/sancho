/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { useToast } from "./Toast";
import { Alert } from "./Alert";

export interface Confirm {
  title: string;
  subtitle?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export function useConfirmation() {
  const notify = useToast();

  function confirm({ title, subtitle, onConfirm, onCancel }: Confirm) {
    notify({
      position: "top",
      duration: null,
      render: ({ onClose, id }) => (
        <Alert
          id={String(id)}
          title={title}
          subtitle={subtitle}
          elevation={"md"}
          intent="danger"
          onRequestClose={onClose}
        />
      )
    });
  }

  return confirm;
}
