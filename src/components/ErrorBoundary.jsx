import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("YOGESH-IDE Error Boundary caught an exception:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#181818] text-white p-6 font-mono select-none">
          <div className="bg-[#252526] border border-rose-500/50 rounded-lg p-8 max-w-md w-full shadow-2xl text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto animate-pulse" />
            <h1 className="text-lg font-bold text-white">YOGESH-IDE Recovery Handler</h1>
            <p className="text-xs text-[#cccccc]">
              An unhandled runtime error occurred inside the workspace. The IDE shell has contained the exception safely.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center space-x-2 bg-vscode-accent hover:bg-vscode-accentHover text-white w-full py-2 rounded font-medium transition-colors text-xs"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload IDE Workspace</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
