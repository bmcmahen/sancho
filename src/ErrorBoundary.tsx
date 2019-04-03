/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Alert } from "./Alert";
import PropTypes from "prop-types";

interface ErrorBoundaryProps {
  /** The title of the error message. */
  title?: string;
  /** The subtitle of the error message. */
  subtitle?: string;
  /** The regular content you want to render. Errors in this tree will be captured. */
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = {
    error: null
  };

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    title: "An unexpected error has occurred.",
    subtitle:
      "Please try reloading. If the problem persists, please contact us for help."
  };

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      //render error message
      return (
        <div css={{ padding: "1rem" }}>
          <Alert
            type="assertive"
            intent="danger"
            title={this.props.title}
            subtitle={this.props.subtitle}
          />
        </div>
      );
    } else {
      //when there's not an error, render children untouched
      return this.props.children;
    }
  }
}
