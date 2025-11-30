import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { user } = this.props;
      return (
        React.createElement("div", { style: { padding: 24, color: '#fff', background: '#2b2f36' } },
          React.createElement("h2", { style: { marginTop: 0 } }, "Something went wrong while rendering the dashboard."),
          React.createElement("pre", { style: { whiteSpace: 'pre-wrap', color: '#ffb4b4' } }, this.state.error && this.state.error.toString()),
          React.createElement("details", { style: { whiteSpace: 'pre-wrap', marginTop: 12 } },
            React.createElement("summary", null, "Error details (click to expand)"),
            React.createElement("div", null, this.state.errorInfo && this.state.errorInfo.componentStack)
          ),
          React.createElement("div", { style: { marginTop: 12 } },
            React.createElement("strong", null, "User object passed to dashboard:"),
            React.createElement("pre", { style: { whiteSpace: 'pre-wrap', marginTop: 6 } }, JSON.stringify(user, null, 2))
          )
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
