/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import * as React from "react";
import {
  StackTitle as Title,
  Stack as OriginalStack,
  StackItem as OriginalStackItem,
  StackContext,
  StackProps,
  StackItemProps
} from "react-gesture-stack";
import { Text } from "./Text";
import { Button } from "./Button";
import { IconChevronLeft } from "./Icons";
import { useTheme } from "./Theme/Providers";

export interface StackTitleProps {
  /** The pane title which is centered */
  title?: React.ReactNode;
  /** The title of the back button */
  backTitle?: React.ReactNode;
  /** Content that appears to the left of the title */
  contentBefore?: React.ReactNode;
  /** Content that appears to the right of the title */
  contentAfter?: React.ReactNode;
}

export function StackTitle({
  title,
  backTitle = "Back",
  ...other
}: StackTitleProps) {
  const { index, changeIndex } = React.useContext(StackContext);

  return (
    <Title
      backButton={
        <Button
          variant="ghost"
          onPress={() => changeIndex(index - 1)}
          iconBefore={<IconChevronLeft />}
        >
          {backTitle}
        </Button>
      }
      title={
        title ? (
          <Text gutter={false} variant="h6">
            {title}
          </Text>
        ) : null
      }
      {...other}
    />
  );
}

export function Stack(props: StackProps) {
  const theme = useTheme();
  return (
    <OriginalStack
      css={{
        ".Stack__nav": {
          background: theme.colors.background.tint1,
          boxShadow: theme.shadows.xs
        }
      }}
      {...props}
    />
  );
}

export function StackItem(props: StackItemProps) {
  const theme = useTheme();
  return (
    <OriginalStackItem
      style={{
        background: undefined
      }}
      css={{
        backgroundColor: theme.colors.background.default
      }}
      {...props}
    />
  );
}
