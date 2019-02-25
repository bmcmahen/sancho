/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import { Alert } from "./Alert";

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
            variant="danger"
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
