import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('❌ ErrorBoundary: Erro capturado:', error);
    console.error('❌ ErrorBoundary: Info do erro:', errorInfo);
    console.error('❌ ErrorBoundary: Stack trace:', error.stack);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          background: '#ffebee',
          border: '2px solid #f44336',
          borderRadius: '8px',
          padding: '20px',
          margin: '20px 0'
        }}>
          <h2 style={{ color: '#d32f2f', margin: '0 0 15px 0' }}>
            ❌ Erro na Aplicação
          </h2>
          <details style={{ fontSize: '14px' }}>
            <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>
              Detalhes do erro (clique para expandir)
            </summary>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '10px', 
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '12px'
            }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </pre>
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#f44336',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            🔄 Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
