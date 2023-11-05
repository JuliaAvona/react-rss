import React, { Component } from 'react';

interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  React.PropsWithChildren<unknown>,
  IErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<unknown>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <h4>Something went wrong. Please try again later.</h4>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
