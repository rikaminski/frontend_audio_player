// Cores baseadas na identidade visual da Harve
export const COLORS = {
  // Cores principais da Harve
  primary: '#FF6B35',        // Laranja vibrante da Harve
  primaryDark: '#E55A2B',    // Laranja mais escuro
  primaryLight: '#FF8A5B',   // Laranja mais claro
  
  // Cores secundárias modernas
  secondary: '#4A90E2',      // Azul tecnológico
  secondaryDark: '#357ABD',  // Azul mais escuro
  accent: '#7B68EE',         // Roxo moderno
  
  // Tons neutros sofisticados
  dark: '#2C3E50',           // Azul escuro profissional
  textPrimary: '#2C3E50',    // Texto principal
  textSecondary: '#7F8C8D',  // Texto secundário
  textLight: '#BDC3C7',      // Texto claro
  
  // Backgrounds
  background: '#F8F9FA',     // Fundo claro
  backgroundDark: '#ECF0F1', // Fundo alternativo
  white: '#FFFFFF',
  
  // Estados
  success: '#27AE60',        // Verde sucesso
  warning: '#F39C12',        // Amarelo aviso
  error: '#E74C3C',          // Vermelho erro
  info: '#3498DB',           // Azul informação
  
  // Gradientes
  gradientPrimary: 'linear-gradient(135deg, #FF6B35 0%, #F39C12 100%)',
  gradientSecondary: 'linear-gradient(135deg, #4A90E2 0%, #7B68EE 100%)',
  
  // Cinzas
  lightGray: '#ECF0F1',
  mediumGray: '#BDC3C7',
  darkGray: '#95A5A6'
};

// Constantes de interface
export const PLAYER_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  PLAYING: 'playing',
  PAUSED: 'paused',
  ERROR: 'error'
};

// Configurações de highlight para transcrição
export const HIGHLIGHT_TOLERANCE = 0.5; // segundos de tolerância para highlight

// Breakpoints responsivos
export const BREAKPOINTS = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px'
};

// Animações
export const ANIMATIONS = {
  fast: '0.15s ease',
  normal: '0.3s ease',
  slow: '0.5s ease'
};
