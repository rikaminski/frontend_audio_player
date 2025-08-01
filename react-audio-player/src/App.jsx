import React from 'react';
import { GlobalStyles, Container } from './styles/GlobalStyles';
import HarveAudioPlayer from './features/audio-player/components/HarveAudioPlayer';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <GlobalStyles />
      <Container>
        {/* Player com design da Harve */}
        <HarveAudioPlayer />
      </Container>
    </ErrorBoundary>
  );
}

export default App;
