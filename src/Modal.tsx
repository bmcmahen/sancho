/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Text } from "./Text";
import { CloseButton } from "./IconButton";
import theme from "./Theme";
import { useTransition, animated } from "react-spring";
import { Overlay } from "./Overlay";
import { useFocusElement } from "./Hooks/focus";
import PropTypes from "prop-types";
import { RemoveScroll } from "react-remove-scroll";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the modal is showing */
  isOpen: boolean;
  /** An optional title. If set, a header will be added to your dialog. */
  title?: string;
  /** Fill the entire screen on mobile devices */
  mobileFullscreen?: boolean;
  /** A callback for closing the modal. */
  onRequestClose: () => void;
  /** The contents of the dialog */
  children: React.ReactNode;
}

/**
 * A modal (or dialog) is useful for displaying infomation that
 * commands the user's attention.
 */

export const Modal: React.FunctionComponent<ModalProps> = ({
  isOpen,
  onRequestClose,
  mobileFullscreen,
  title,
  children,
  ...other
}) => {
  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0, transform: "scale(0.9)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.9)" },
    config: { mass: 1, tension: 185, friction: 26 }
  });

  const { bind } = useFocusElement(isOpen);

  return (
    <React.Fragment>
      <Overlay onRequestClose={onRequestClose} isOpen={isOpen}>
        <React.Fragment>
          {transitions.map(
            ({ item, key, props: animationProps }) =>
              item && (
                <animated.div
                  key={key}
                  className="Modal"
                  aria-modal="true"
                  {...bind}
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
                      zIndex: theme.zIndex.modal,
                      background: "white",
                      boxShadow: theme.shadows.md,
                      borderRadius: theme.radii.lg,
                      margin: "16px",
                      width: "calc(100% - 32px)",
                      outline: "none",
                      [theme.breakpoints.sm]: {
                        maxWidth: "500px",
                        margin: "30px auto"
                      },
                      [theme.breakpoints.lg]: {
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
                      [theme.breakpoints.sm]: {
                        maxWidth: "none",
                        margin: "0"
                      },
                      [theme.breakpoints.md]: {
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
                      <ModalHeader
                        className="Modal__header"
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
                    <RemoveScroll>{children}</RemoveScroll>
                  </React.Fragment>
                </animated.div>
              )
          )}
        </React.Fragment>
      </Overlay>
    </React.Fragment>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  mobileFullscreen: PropTypes.bool,
  children: PropTypes.node
};

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The title of the header */
  title: string;
  /** An optional callback for closing the dialog. If set, a close button will be added to the header */
  onRequestClose?: () => void;
}

export const ModalHeader: React.FunctionComponent<ModalHeaderProps> = ({
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

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func
};

export default Modal;
