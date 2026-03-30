import { Component } from "react";

/**
 * React Error Boundary — wraps async-heavy tabs (Practice, Mock, AI scoring).
 * Catches render errors and shows a recoverable error screen.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.reset = this.reset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  reset() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center flex-1 gap-6 p-8 text-center min-h-[60vh]">
          <div className="w-16 h-16 rounded-full bg-red/10 border border-red/20 flex items-center justify-center text-3xl">
            ⚠️
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-white font-black text-xl">Something went wrong</h2>
            <p className="text-muted text-sm leading-relaxed max-w-[280px]">
              {this.state.error?.message ?? "An unexpected error occurred."}
            </p>
          </div>
          <button
            onClick={this.reset}
            className="bg-primary-gradient text-white font-black px-8 py-3 rounded-xl text-sm uppercase tracking-widest shadow-primary-glow active:scale-95 transition-transform focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
