import React, { Component, ReactNode } from "react";

/**
 * Props for the ErrorBoundary component.
 */
interface ErrorBoundaryProps {
  children: ReactNode;
}

/**
 * State of the ErrorBoundary component.
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Component that catches JavaScript errors
 * in its child component tree, logs them, and displays a fallback UI
 * instead of crashing the entire React app.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  /** Initial state with no error */
  state: ErrorBoundaryState = { hasError: false };

  /**
   * Update state when a child component throws an error.
   * This triggers a re-render to show the fallback UI.
   *
   * @param error - The error thrown by a child component
   * @returns Updated state to indicate an error has occurred
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Lifecycle method called after an error is thrown in a child component.
   * Useful for logging errors to external services.
   *
   * @param error - The error thrown
   * @param info - An object with componentStack, showing where the error occurred
   */
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error);
    console.error("Error info:", info.componentStack);
  }

  /**
   * Render the fallback UI if an error has been caught,
   * otherwise render the child components normally.
   */
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
          <p>Please reload the page or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
