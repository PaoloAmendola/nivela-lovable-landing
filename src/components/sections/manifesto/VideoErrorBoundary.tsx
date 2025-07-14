
import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class VideoErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('Video component error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-4xl mx-auto mb-12 lg:mb-16">
          <div className="aspect-video rounded-lg overflow-hidden bg-muted/20 flex items-center justify-center">
            <div className="text-center text-muted-foreground p-8">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm mb-4">Erro ao carregar o vídeo do manifesto</p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 text-xs text-primary hover:underline bg-background/80 px-3 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Recarregar página
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default VideoErrorBoundary;
