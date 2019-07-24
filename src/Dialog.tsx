/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import { CloseButton } from "./IconButton";
import { useTransition, animated } from "react-spring";
import { Overlay } from "./Overlay";
import { useFocusElement } from "./Hooks/use-focus-trap";
import PropTypes from "prop-types";
import useScrollLock from "use-scroll-lock";
import { useTheme } from "./Theme/Providers";

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the dialog is showing */
  isOpen: boolean;
  /** An optional title. If set, a header will be added to your dialog. */
  title?: string;
  /** Fill the entire screen on mobile devices */
  mobileFullscreen?: boolean;
  /** A callback for closing the dialog. */
  onRequestClose: () => void;
  /** The contents of the dialog */
  children: React.ReactNode;
}

/**
 * A dialog is useful for displaying infomation that
 * commands the user's attention.
 */

export const Dialog: React.FunctionComponent<DialogProps> = ({
  isOpen,
  onRequestClose,
  mobileFullscreen,
  title,
  children,
  ...other
}) => {
  const theme = useTheme();
  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0, transform: "scale(0.9)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.9)" },
    config: { mass: 1, tension: 185, friction: 26 }
  });

  const scrollableRef = React.useRef(null);
  const ref = React.useRef<HTMLDivElement | null>(null);

  useFocusElement(ref, isOpen);
  useScrollLock(isOpen, scrollableRef);

  return (
    <React.Fragment>
      <Overlay onRequestClose={onRequestClose} isOpen={isOpen}>
        <React.Fragment>
          {transitions.map(
            ({ item, key, props: animationProps }) =>
              item && (
                <animated.div
                  key={key}
                  className="Dialog"
                  aria-modal="true"
                  ref={ref}
                  tabIndex={-1}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                  }}
                  style={{
                    opacity: animationProps.opacity,
                    transform: animationProps.transform
                  }}
                  css={[
                    {
                      zIndex: theme.zIndices.modal,
                      background: theme.colors.background.default,
                      boxShadow: theme.shadows.md,
                      borderRadius: theme.radii.lg,
                      margin: "16px",
                      width: "calc(100% - 32px)",
                      outline: "none",
                      [theme.mediaQueries.sm]: {
                        maxWidth: "500px",
                        margin: "30px auto"
                      },
                      [theme.mediaQueries.lg]: {
                        maxWidth: "650px",
                        margin: "30px auto"
                      }
                    },
                    mobileFullscreen && {
                      maxWidth: "none",
                      margin: 0,
                      width: "100vw",
                      height: "100vh",
                      borderRadius: 0,
                      boxShadow: "none",
                      [theme.mediaQueries.sm]: {
                        maxWidth: "none",
                        margin: "0"
                      },
                      [theme.mediaQueries.md]: {
                        maxWidth: "500px",
                        margin: "30px auto",
                        height: "auto",
                        boxShadow: theme.shadows.md,
                        borderRadius: theme.radii.lg,
                        width: "calc(100% - 32px)"
                      }
                    }
                  ]}
                  {...other}
                >
                  <React.Fragment>
                    {title && (
                      <DialogHeader
                        className="Dialog__header"
                        css={{
                          display: "flex",
                          justifyContent: "space-between",

                          alignItems: "center",
                          padding: `${theme.spaces.lg} ${theme.spaces.lg} 0 ${
                            theme.spaces.lg
                          }`
                        }}
                        title={title}
                        onRequestClose={onRequestClose}
                      />
                    )}
                    <div ref={scrollableRef}>{children}</div>
                  </React.Fragment>
                </animated.div>
              )
          )}
        </React.Fragment>
      </Overlay>
    </React.Fragment>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  mobileFullscreen: PropTypes.bool,
  children: PropTypes.node
};

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The title of the header */
  title: string;
  /** An optional callback for closing the dialog. If set, a close button will be added to the header */
  onRequestClose?: () => void;
}

export const DialogHeader: React.FunctionComponent<DialogHeaderProps> = ({
  title,
  onRequestClose,
  ...other
}) => (
  <div {...other}>
    <Text wrap={false} variant="h4">
      {title}
    </Text>
    {onRequestClose && <CloseButton onClick={onRequestClose} />}
  </div>
);

DialogHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func
};
