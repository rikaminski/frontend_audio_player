import styled, { createGlobalStyle } from 'styled-components';
import { COLORS, BREAKPOINTS } from '../utils/constants';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%);
    color: ${COLORS.textPrimary};
    min-height: 100vh;
    line-height: 1.6;
  }

  code {
    font-family: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Courier New', monospace;
  }

  /* Scrollbar global */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${COLORS.lightGray};
  }

  ::-webkit-scrollbar-thumb {
    background: ${COLORS.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${COLORS.primaryDark};
  }

  /* Seleção de texto */
  ::selection {
    background: ${COLORS.primary};
    color: ${COLORS.white};
  }

  /* Focus outline personalizado */
  button:focus,
  input:focus,
  textarea:focus {
    outline: 2px solid ${COLORS.primary};
    outline-offset: 2px;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
  min-height: 100vh;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 24px 16px;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 20px 12px;
  }
`;
