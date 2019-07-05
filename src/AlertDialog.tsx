/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Dialog } from "./Dialog";
import { Button, ButtonIntent } from "./Button";
import { useTheme } from "./Theme/Providers";
import { Text } from "./Text";
import { useUid } from "./Hooks/use-uid";

export interface AlertDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose: () => void;
  title: string;
  subtitle?: string;
  confirmLabel?: string;
}

export const AlertDialog: React.FunctionComponent<AlertDialogProps> = ({
  isOpen,
  title,
  subtitle,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  onClose
}) => {
  const theme = useTheme();
  const id = useUid();

  const cancel = React.useCallback(() => {
    if (onCancel) onCancel();
    onClose();
  }, [onCancel, onClose]);

  const confirm = React.useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm]);

  return (
    <Dialog
      role="alertdialog"
      aria-labelledby={id}
      onRequestClose={cancel}
      isOpen={isOpen}
    >
      <div css={{ padding: "1.5rem" }}>
        <Text id={id} variant="h5">
          {title}
        </Text>
        {subtitle && <Text>{subtitle}</Text>}
        <div
          css={{
            marginTop: theme.spaces.md,
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Button autoFocus onPress={cancel} variant="ghost">
            Cancel
          </Button>
          <Button
            onPress={confirm}
            css={{ marginLeft: theme.spaces.sm }}
            intent="danger"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
