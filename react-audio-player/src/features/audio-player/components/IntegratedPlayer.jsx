import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../utils/constants';

const IntegratedContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const AudioSelector = styled.div`
  margin-bottom: 20px;
`;

const AudioOption = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  margin-bottom: 8px;
  background: ${props => props.selected ? COLORS.primary : 'white'};
  color: ${props => props.selected ? 'white' : COLORS.dark};
  border: 2px solid ${COLORS.primary};
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.selected ? COLORS.primaryDark : COLORS.lightGray};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const PlayButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: ${props => props.disabled ? COLORS.lightGray : COLORS.primary};
  color: white;
  font-size: 24px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${COLORS.primaryDark};
  }
`;

const TimeDisplay = styled.div`
  font-family: 'Courier New', monospace;
  color: ${COLORS.textSecondary};
  font-size: 14px;
`;

const ProgressContainer = styled.div`
  flex: 1;
  margin: 0 16px;
`;

const ProgressBar = styled.div`
  position: relative;
  height: 6px;
  background: ${COLORS.lightGray};
  border-radius: 3px;
  cursor: pointer;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${COLORS.primary};
  border-radius: 3px;
  width: ${props => props.progress}%;
  transition: width 0.1s ease;
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 12px;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px;
  border: 2px solid ${COLORS.lightGray};
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
  }
`;

const SearchButton = styled.button`
  padding: 12px 20px;
  background: ${COLORS.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: ${COLORS.primaryDark};
  }
`;

const TranscriptText = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding: 16px;
  background: ${COLORS.background};
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
`;

const Segment = styled.span`
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 3px;
  transition: all 0.2s ease;
  
  ${props => props.isHighlighted && `
    background: ${COLORS.primary};
    color: white;
    font-weight: bold;
  `}
  
  ${props => props.isSearchResult && `
    background: #ffeb3b;
    color: #333;
  `}

  &:hover {
    background: ${COLORS.lightGray};
  }
`;

const LoadingMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: ${COLORS.textSecondary};
  font-style: italic;
`;

const ErrorMessage = styled.div`
  padding: 12px;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 6px;
  color: #c66;
  margin-bottom: 16px;
`;

const RangeSelector = styled.div`
  margin-top: 20px;
  padding: 16px;
  background: ${COLORS.background};
  border-radius: 8px;
`;

const RangeInputs = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 12px;
`;

const TimeInput = styled.input`
  padding: 8px;
  border: 1px solid ${COLORS.lightGray};
  border-radius: 4px;
  width: 80px;
  font-family: 'Courier New', monospace;
`;

const RangeButton = styled.button`
  padding: 8px 16px;
  background: ${COLORS.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${COLORS.secondaryDark};
  }
`;

const IntegratedPlayer = () => {
  // Estado do player
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estado da transcrição
  const [transcription, setTranscription] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Estado do seletor de intervalo
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  
  const audioRef = useRef(null);

  // Opções de áudio com transcrições reais
  const audioOptions = [
    { 
      id: 'sample_full_class', 
      name: 'Aula Completa - Data Science', 
      url: '/audio/sample_full_class_2307_CDT21.wav',
      transcriptionUrl: '/audio/transcription_segmented_json.json'
    },
    { 
      id: 'audio1', 
      name: 'Audio Sample 1', 
      url: '/audio/audio1.wav',
      transcriptionUrl: '/audio1/transcription1.json'
    },
    { 
      id: 'audio2', 
      name: 'Audio Sample 2 (M4A)', 
      url: '/audio/audio2.m4a',
      transcriptionUrl: null
    }
  ];

  // Função para formatar tempo
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Função para converter tempo string para segundos
  const parseTime = (timeStr) => {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return (minutes || 0) * 60 + (seconds || 0);
  };

  // Processar transcrição baseada no formato
  const processTranscription = (data) => {
    if (data.segments) {
      // Formato do arquivo transcription_segmented_json.json
      return data.segments.map((segment, index) => {
        const words = segment.words?.filter(w => w.type === 'word') || [];
        const firstWord = words[0];
        const lastWord = words[words.length - 1];
        
        return {
          id: index + 1,
          start: firstWord?.start || 0,
          end: lastWord?.end || firstWord?.start + 1,
          text: segment.text || '',
          speaker: firstWord?.speaker_id || 'speaker_0'
        };
      });
    } else if (data.transcription) {
      // Formato do arquivo transcription1.json
      return data.transcription.map(segment => ({
        id: segment.id,
        start: segment.start,
        end: segment.end,
        text: segment.text,
        speaker: segment.speaker || 'Speaker'
      }));
    }
    return [];
  };

  // Carregar transcrição
  const loadTranscription = async (url) => {
    try {
      console.log('🔄 Carregando transcrição:', url);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      const processedTranscription = processTranscription(data);
      
      console.log('✅ Transcrição carregada:', processedTranscription.length, 'segmentos');
      setTranscription(processedTranscription);
      
    } catch (error) {
      console.error('❌ Erro ao carregar transcrição:', error);
      setError(`Erro ao carregar transcrição: ${error.message}`);
      setTranscription([]);
    }
  };

  // Selecionar áudio
  const selectAudio = async (audio) => {
    setError(null);
    setIsLoading(true);
    setSelectedAudio(audio);
    setIsPlaying(false);
    setCurrentTime(0);
    setTranscription([]);
    setSearchResults([]);
    setStartTime(0);
    setEndTime(0);
    setIsLooping(false);
    
    try {
      // Carregar áudio
      if (audioRef.current) {
        audioRef.current.src = audio.url;
        audioRef.current.load();
      }
      
      // Carregar transcrição se disponível
      if (audio.transcriptionUrl) {
        await loadTranscription(audio.transcriptionUrl);
      }
      
    } catch (error) {
      console.error('❌ Erro ao carregar áudio:', error);
      setError(`Erro ao carregar áudio: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Controles de reprodução
  const togglePlay = () => {
    if (!audioRef.current || !selectedAudio) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Se tem range definido, começar do startTime
      if (startTime > 0) {
        audioRef.current.currentTime = startTime;
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Busca semântica
  const performSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = transcription.filter(segment => 
      segment.text.toLowerCase().includes(query)
    );

    setSearchResults(results);
    console.log(`🔍 Busca por "${query}": ${results.length} resultados`);
  };

  // Navegar para segmento
  const jumpToSegment = (segment) => {
    if (audioRef.current) {
      audioRef.current.currentTime = segment.start;
      setCurrentTime(segment.start);
      console.log(`📍 Navegando para: ${formatTime(segment.start)} - "${segment.text.substring(0, 50)}..."`);
    }
  };

  // Verificar segmento atual
  const getCurrentSegment = () => {
    return transcription.find(segment => 
      currentTime >= segment.start && currentTime < segment.end
    );
  };

  // Funções do seletor de intervalo
  const setRange = () => {
    if (!duration) return;
    
    const start = Math.min(startTime, endTime);
    const end = Math.max(startTime, endTime);
    
    if (end > start) {
      setStartTime(start);
      setEndTime(end);
      if (audioRef.current) {
        audioRef.current.currentTime = start;
        setCurrentTime(start);
      }
    }
  };

  const clearRange = () => {
    setStartTime(0);
    setEndTime(0);
    setIsLooping(false);
  };

  const playRange = () => {
    if (!audioRef.current || startTime >= endTime) return;
    
    audioRef.current.currentTime = startTime;
    setCurrentTime(startTime);
    setIsLooping(true);
    audioRef.current.play();
    setIsPlaying(true);
  };

  // Event listeners do áudio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const time = audio.currentTime;
      setCurrentTime(time);
      
      // Se está em loop e passou do endTime, voltar para startTime
      if (isLooping && endTime > 0 && time >= endTime) {
        audio.currentTime = startTime;
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setEndTime(audio.duration);
      setIsLoading(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (isLooping && startTime < endTime) {
        audio.currentTime = startTime;
        audio.play();
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleError = () => {
      setError('Erro ao carregar o arquivo de áudio');
      setIsLoading(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('error', handleError);
    };
  }, [isLooping, startTime, endTime]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentSegment = getCurrentSegment();

  return (
    <IntegratedContainer>
      <h3>🎵 Player Integrado com Transcrição Real</h3>
      
      {/* Seletor de áudio */}
      <AudioSelector>
        <h4>Selecione um áudio:</h4>
        {audioOptions.map(audio => (
          <AudioOption
            key={audio.id}
            selected={selectedAudio?.id === audio.id}
            onClick={() => selectAudio(audio)}
            disabled={isLoading}
          >
            {audio.name} {audio.transcriptionUrl ? '📝' : '🔇'}
          </AudioOption>
        ))}
      </AudioSelector>

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      {isLoading && (
        <LoadingMessage>
          ⏳ Carregando áudio e transcrição...
        </LoadingMessage>
      )}

      {selectedAudio && !isLoading && (
        <>
          {/* Controles principais */}
          <Controls>
            <PlayButton onClick={togglePlay} disabled={!selectedAudio || isLoading}>
              {isPlaying ? '⏸️' : '▶️'}
            </PlayButton>
            
            <TimeDisplay>
              {formatTime(currentTime)} / {formatTime(duration)}
            </TimeDisplay>
            
            <ProgressContainer>
              <ProgressBar onClick={handleProgressClick}>
                <ProgressFill progress={progress} />
              </ProgressBar>
            </ProgressContainer>
          </Controls>

          {/* Seletor de intervalo */}
          <RangeSelector>
            <h4>🎯 Seleção de Intervalo</h4>
            <p>Defina um intervalo específico para repetir:</p>
            
            <RangeInputs>
              <div>
                <label>Início: </label>
                <TimeInput
                  type="text"
                  placeholder="0:00"
                  value={formatTime(startTime)}
                  onChange={(e) => setStartTime(parseTime(e.target.value))}
                />
              </div>
              
              <div>
                <label>Fim: </label>
                <TimeInput
                  type="text"
                  placeholder="0:00"
                  value={formatTime(endTime)}
                  onChange={(e) => setEndTime(parseTime(e.target.value))}
                />
              </div>
              
              <RangeButton onClick={setRange}>Definir</RangeButton>
              <RangeButton onClick={playRange}>▶️ Tocar Intervalo</RangeButton>
              <RangeButton onClick={clearRange}>Limpar</RangeButton>
            </RangeInputs>
            
            {startTime < endTime && (
              <p style={{ marginTop: '8px', color: COLORS.primary }}>
                📍 Intervalo: {formatTime(startTime)} → {formatTime(endTime)} 
                {isLooping && ' (🔄 Loop ativo)'}
              </p>
            )}
          </RangeSelector>

          {/* Busca na transcrição */}
          {transcription.length > 0 && (
            <>
              <SearchContainer>
                <SearchInput
                  type="text"
                  placeholder="Buscar na transcrição..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                />
                <SearchButton onClick={performSearch}>🔍 Buscar</SearchButton>
                {searchResults.length > 0 && (
                  <SearchButton onClick={() => { setSearchQuery(''); setSearchResults([]); }}>
                    Limpar
                  </SearchButton>
                )}
              </SearchContainer>

              {/* Resultados da busca */}
              {searchResults.length > 0 && (
                <div style={{ marginBottom: '20px', padding: '12px', background: '#e8f5e8', borderRadius: '8px' }}>
                  <strong>🎯 {searchResults.length} resultado(s) encontrado(s):</strong>
                  <div style={{ marginTop: '8px', maxHeight: '150px', overflowY: 'auto' }}>
                    {searchResults.map(result => (
                      <div key={result.id} style={{ marginBottom: '8px' }}>
                        <button
                          onClick={() => jumpToSegment(result)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: COLORS.primary,
                            cursor: 'pointer',
                            textAlign: 'left',
                            display: 'block',
                            width: '100%',
                            padding: '4px'
                          }}
                        >
                          <strong>[{formatTime(result.start)}]</strong> {result.text}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Transcrição */}
              <div>
                <h4>📝 Transcrição ({transcription.length} segmentos)</h4>
                <TranscriptText>
                  {transcription.slice(0, 50).map(segment => (
                    <div key={segment.id} style={{ marginBottom: '8px' }}>
                      <span style={{ color: COLORS.textSecondary, fontSize: '12px', fontWeight: 'bold' }}>
                        [{formatTime(segment.start)}]
                      </span>
                      {' '}
                      <Segment
                        isHighlighted={currentSegment?.id === segment.id}
                        isSearchResult={searchResults.some(result => result.id === segment.id)}
                        onClick={() => jumpToSegment(segment)}
                      >
                        {segment.text}
                      </Segment>
                    </div>
                  ))}
                  {transcription.length > 50 && (
                    <div style={{ padding: '10px', textAlign: 'center', color: COLORS.textSecondary }}>
                      ... e mais {transcription.length - 50} segmentos (mostrando primeiros 50)
                    </div>
                  )}
                </TranscriptText>
              </div>
            </>
          )}
        </>
      )}

      {/* Elemento de áudio oculto */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </IntegratedContainer>
  );
};

export default IntegratedPlayer;
