/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import { Alert } from "./Alert";
import PropTypes from "prop-types";

interface ErrorBoundaryProps {
  title?: string;
  subtitle?: string;
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
    // The title of the error message.
    title: PropTypes.string,

    // The subtitle of the error message.
    subtitle: PropTypes.string,

    // The regular content you want to render. Errors in this tree will be captured.
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
        <div css={{ padding: theme.spaces.md }}>
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
