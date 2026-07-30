import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State;
  public props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Devil Labs Application Exception:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-stone-100 flex items-center justify-center p-6 font-sans select-none">
          <div className="max-w-md w-full bg-[#0d0d12] border border-white/10 p-8 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-violet-600/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-rose-600/20 rounded-full blur-2xl pointer-events-none" />

            <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-center mx-auto text-rose-400">
              <AlertTriangle size={28} />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[10px] text-rose-400 uppercase tracking-widest font-black block">
                SYSTEM RECOVERY ACTIVE
              </span>
              <h2 className="font-display font-black text-2xl text-white tracking-tight uppercase">
                Unexpected Module Exception
              </h2>
              <p className="text-stone-400 text-xs leading-relaxed font-light">
                An isolated component error occurred during runtime rendering. Our telemetry has logged the trace.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-[#050505] border border-white/10 p-3 rounded-xl text-left max-h-24 overflow-y-auto">
                <p className="font-mono text-[10px] text-stone-400 break-words">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 py-3 bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
              >
                <RefreshCw size={14} />
                <span>RELOAD SYSTEM</span>
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="px-4 py-3 bg-[#111] hover:bg-[#1a1a1a] text-stone-300 hover:text-white border border-white/10 font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Home size={14} />
                <span>HOME</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
