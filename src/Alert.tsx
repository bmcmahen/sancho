/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import ReachAlert from "@reach/alert";
import { Text } from "./Text";
import { Icon } from "./Icons";
import { IconName } from "@blueprintjs/icons";
import { CloseButton } from "./IconButton";
import { LayerElevations } from "./Layer";
import PropTypes from "prop-types";
import { Theme } from "./Theme";
import { useTheme } from "./Theme/Providers";

const alertIntentions = (theme: Theme) => ({
  info: theme.colors.intent.none,
  success: theme.colors.intent.success,
  question: theme.colors.intent.primary,
  danger: theme.colors.intent.danger,
  warning: theme.colors.intent.warning
});

export type AlertIntentions =
  | "info"
  | "success"
  | "question"
  | "danger"
  | "warning";

const icons: { [key in AlertIntentions]: IconName } = {
  info: "info-sign",
  success: "tick-circle",
  warning: "warning-sign",
  danger: "error",
  question: "help"
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** If used, a close button will be attached to the alert box. */
  onRequestClose?: () => void;
  /** Primary text */
  title?: string;
  /** Secondary text */
  subtitle?: string | React.ReactNode;
  /** A unique id used for accessibility purposes */
  id?: string;
  elevation?: LayerElevations;
  /** Optionally render children if a title is not specified. Used for custom alerts. */
  children?: React.ReactNode;
  /** Changes the icon and colour of the alert. */
  intent?: AlertIntentions;
  component?: React.ReactType<any>;
  type?: "polite" | "assertive";
}

/**
 * Use an alert to inform users of important information.
 * To display an alert in a toast notification, use the toast module.
 */
export const Alert: React.FunctionComponent<AlertProps> = ({
  children,
  title,
  id,
  subtitle,
  component,
  elevation = "xs",
  onRequestClose,
  intent = "info",
  ...other
}) => {
  const theme = useTheme();
  const intentions = React.useMemo(() => alertIntentions(theme), [theme]);
  const dark = theme.colors.mode === "dark";
  const color = intentions[intent];
  let accent = dark ? color.base : color.base;

  if (dark && intent === "info") {
    accent = color.light;
  }

  const contents = title ? (
    <div
      className="Alert__title"
      css={{ display: "flex", alignItems: "flex-start" }}
    >
      <div css={{ flex: "0 0 auto", marginTop: "4px" }}>
        <Icon color={accent} icon={icons[intent]} />
      </div>
      <div css={{ marginLeft: theme.spaces.md }}>
        <Text
          className="Alert__title-text"
          id={id}
          css={{ margin: 0 }}
          variant="h6"
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            className="Alert__title-subtitle"
            muted
            css={{
              fontSize: theme.sizes[0]
            }}
          >
            {subtitle}
          </Text>
        )}
      </div>
    </div>
  ) : (
    children
  );

  const Component = component || ReachAlert;

  return (
    <Component
      className="Alert"
      css={{
        backgroundColor: dark
          ? theme.colors.background.tint1
          : theme.colors.background.default,
        overflow: "hidden",
        maxWidth: "650px",
        position: "relative",
        boxShadow: theme.shadows[elevation],
        borderRadius: theme.radii.md
      }}
      {...other}
    >
      <div>
        <div
          className="Alert__bar"
          css={{
            width: theme.radii.md,
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            backgroundColor: accent
          }}
        />
        <div
          className="Alert__content"
          css={{
            display: "flex",
            alignItems: "flex-start",
            padding: `${theme.spaces.md} ${theme.spaces.md}`,
            paddingRight: onRequestClose ? "3rem" : undefined
          }}
        >
          {contents}
          {onRequestClose && (
            <CloseButton
              css={{
                marginTop: "-0.25rem",
                right: theme.spaces.sm,
                position: "absolute"
              }}
              onClick={onRequestClose}
            />
          )}
        </div>
      </div>
    </Component>
  );
};

Alert.displayName = "Alert";

Alert.propTypes = {
  onRequestClose: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  intent: PropTypes.oneOf([
    "info",
    "success",
    "warning",
    "danger",
    "question"
  ] as AlertIntentions[])
};
