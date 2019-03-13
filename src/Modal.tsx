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

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  mobileFullscreen?: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FunctionComponent<ModalProps> = props => {
  const transitions = useTransition(props.isOpen, null, {
    from: { opacity: 0, transform: "scale(0.9)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.9)" }
  });

  const { bind } = useFocusElement(props.isOpen);

  return (
    <React.Fragment>
      <Overlay onRequestClose={props.onRequestClose} isOpen={props.isOpen}>
        <React.Fragment>
          {transitions.map(
            ({ item, key, props: animationProps }) =>
              item && (
                <animated.div
                  key={key}
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
                    props.mobileFullscreen && {
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
                >
                  <React.Fragment>
                    {props.title && (
                      <ModalHeader
                        css={{
                          display: "flex",
                          justifyContent: "space-between",

                          alignItems: "center",
                          padding: `${theme.spaces.lg} ${theme.spaces.lg} 0 ${
                            theme.spaces.lg
                          }`
                        }}
                        title={props.title}
                        onRequestClose={props.onRequestClose}
                      />
                    )}
                    <RemoveScroll>{props.children}</RemoveScroll>
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
  /** Whether the modal is showing */
  isOpen: PropTypes.bool.isRequired,

  /** A callback for closing the modal. */
  onRequestClose: PropTypes.func.isRequired,

  /** An optional title. If set, a header will be added to your dialog. */
  title: PropTypes.string,

  /** Fill the entire screen on mobile devices */
  mobileFullscreen: PropTypes.bool,

  /** The contents of the dialog */
  children: PropTypes.node
};

interface ModalHeaderProps {
  title: string;
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
  /** The title of the header */
  title: PropTypes.string.isRequired,

  /** An optional callback for closing the dialog. If set, a close button will be added to the header */
  onRequestClose: PropTypes.func
};

export default Modal;
