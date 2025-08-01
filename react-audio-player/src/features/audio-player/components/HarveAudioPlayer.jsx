import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS, ANIMATIONS, BREAKPOINTS } from '../../../utils/constants';
import harveLogo from '../../../assets/harve_logo.png';

const HarveContainer = styled.div`
  background: ${COLORS.white};
  border-radius: 20px;
  padding: 32px;
  box-shadow: 
    0 20px 40px rgba(255, 107, 53, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
  border: 1px solid rgba(255, 107, 53, 0.1);
  transition: all ${ANIMATIONS.normal};

  &:hover {
    box-shadow: 
      0 24px 48px rgba(255, 107, 53, 0.15),
      0 12px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 20px;
    border-radius: 16px;
  }
`;

const HarveHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 2px solid ${COLORS.background};
`;

const HarveLogo = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const HarveLogoImage = styled.img`
  width: 200px;
  height: 50px;
  object-fit: contain;
`;

const HarveTitle = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  color: ${COLORS.dark};
  margin: 0px 0 0 0;
  font-size: 28px;
  font-weight: 700;
  background: ${COLORS.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: ${COLORS.textSecondary};
  margin: 0px 0 0 0;
  font-size: 16px;
  font-weight: 400;
  font-style: italic, bold;
`;

const PlayerSection = styled.div`
  background: linear-gradient(135deg, ${COLORS.dark} 0%, #1a252f 100%);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 16px;
  border: 2px solid ${COLORS.primary};
  color: ${COLORS.white};
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.3);
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 20px;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    grid-template-columns: 1fr;
    gap: 12px;
    text-align: center;
  }
`;

// Novos controles integrados ao player
const PlayerControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 107, 53, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 107, 53, 0.3);
`;

const ControlButton = styled.button`
  background: rgba(255, 107, 53, 0.2);
  border: 1px solid ${COLORS.primary};
  color: ${COLORS.white};
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all ${ANIMATIONS.normal};
  backdrop-filter: blur(10px);

  &:hover {
    background: ${COLORS.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Header com busca integrada para transcrição
const TranscriptHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 16px;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    flex-direction: column;
    gap: 12px;
  }
`;

const CompactSearchInput = styled.input`
  padding: 8px 12px;
  border: 2px solid ${COLORS.lightGray};
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;
  transition: all ${ANIMATIONS.normal};

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  &::placeholder {
    color: ${COLORS.textLight};
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    min-width: 200px;
  }
`;

const TranscriptSearchContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    width: 100%;
    justify-content: stretch;
    
    ${CompactSearchInput} {
      flex: 1;
      min-width: 0;
    }
  }
`;

const CompactButton = styled.button`
  padding: 8px 12px;
  background: ${COLORS.gradientPrimary};
  color: ${COLORS.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  transition: all ${ANIMATIONS.normal};
  white-space: nowrap;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Dropdown para seleção de áudio
const AudioSelector = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 16px 20px;
  background: linear-gradient(135deg, ${COLORS.white} 0%, #f8f9fa 100%);
  border: 2px solid ${COLORS.primary};
  border-radius: 16px;
  color: ${COLORS.dark};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all ${ANIMATIONS.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.2);
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${COLORS.white};
  border: 2px solid ${COLORS.primary};
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 8px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 16px 20px;
  background: ${props => props.selected ? COLORS.primary : 'transparent'};
  color: ${props => props.selected ? COLORS.white : COLORS.dark};
  border: none;
  border-bottom: 1px solid ${COLORS.lightGray};
  text-align: left;
  cursor: pointer;
  transition: all ${ANIMATIONS.fast};

  &:hover {
    background: ${props => props.selected ? COLORS.primaryDark : COLORS.background};
  }

  &:last-child {
    border-bottom: none;
    border-radius: 0 0 14px 14px;
  }

  &:first-child {
    border-radius: 14px 14px 0 0;
  }
`;

const PlayButtonHarve = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  background: ${props => props.disabled ? COLORS.lightGray : COLORS.gradientPrimary};
  color: ${COLORS.white};
  font-size: 32px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${ANIMATIONS.normal};
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 12px 32px rgba(255, 107, 53, 0.4);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }
`;

const TimeDisplayHarve = styled.div`
  font-family: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;
  color: ${COLORS.white};
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ProgressSection = styled.div`
  position: relative;
  padding: 12px 0;
`;

const ProgressBarHarve = styled.div`
  position: relative;
  height: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  cursor: pointer;
  overflow: visible;
  margin: 12px 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const ProgressFillHarve = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%);
  border-radius: 5px;
  width: ${props => props.progress}%;
  transition: width ${ANIMATIONS.fast};
  position: relative;
  box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);

  &::after {
    content: '';
    position: absolute;
    right: -8px;
    top: -3px;
    width: 16px;
    height: 16px;
    background: ${COLORS.primary};
    border: 2px solid ${COLORS.white};
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(255, 107, 53, 0.6);
    opacity: ${props => props.progress > 0 ? 1 : 0};
    transition: all ${ANIMATIONS.normal};
    z-index: 2;
    transform: translateY(0);
  }

  &:hover::after {
    transform: scale(1.3) translateY(0);
    box-shadow: 0 3px 12px rgba(255, 107, 53, 0.8);
  }
`;

const FeatureSection = styled.div`
  background: ${COLORS.white};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  border: 1px solid ${COLORS.lightGray};
`;

const FeatureHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${COLORS.gradientPrimary};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 12px;
  color: ${COLORS.white};
`;

const FeatureTitle = styled.h4`
  color: ${COLORS.dark};
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    flex-direction: column;
  }
`;

const SearchInputHarve = styled.input`
  flex: 1;
  padding: 16px 20px;
  border: 2px solid ${COLORS.lightGray};
  border-radius: 12px;
  font-size: 16px;
  transition: all ${ANIMATIONS.normal};

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  &::placeholder {
    color: ${COLORS.textLight};
  }
`;

const ActionButton = styled.button`
  padding: 16px 24px;
  background: ${props => props.variant === 'secondary' ? COLORS.gradientSecondary : COLORS.gradientPrimary};
  color: ${COLORS.white};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all ${ANIMATIONS.normal};
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TranscriptContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: 20px;
  background: ${COLORS.background};
  border-radius: 12px;
  font-size: 15px;
  line-height: 1.8;

  /* Scrollbar customizada */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${COLORS.lightGray};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLORS.primary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${COLORS.primaryDark};
  }
`;

const SegmentHarve = styled.span`
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all ${ANIMATIONS.fast};
  display: inline-block;
  margin: 2px 0;
  min-height: 20px;
  
  ${props => props.isHighlighted && `
    background: ${COLORS.gradientPrimary};
    color: ${COLORS.white};
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
  `}
  
  ${props => props.isSearchResult && `
    background: ${COLORS.warning};
    color: ${COLORS.white};
    font-weight: 600;
  `}

  /* Garantir que o texto seja visível */
  color: ${props => props.isHighlighted || props.isSearchResult ? 'inherit' : COLORS.dark};
  font-size: 15px;
  line-height: 1.5;

  &:hover {
    background: ${props => props.isHighlighted ? COLORS.primaryDark : COLORS.lightGray};
    transform: translateX(4px);
  }
`;

// Novo componente para palavras individuais
const WordSpan = styled.span`
  cursor: pointer;
  padding: 1px 2px;
  border-radius: 3px;
  transition: all ${ANIMATIONS.fast};
  display: inline;
  margin: 0;
  
  ${props => props.isCurrentWord && `
    background: ${COLORS.secondary};
    color: ${COLORS.white};
    font-weight: 600;
    box-shadow: 0 1px 4px rgba(74, 144, 226, 0.4);
  `}

  /* Garantir que o texto seja visível */
  color: ${props => props.isCurrentWord ? 'inherit' : COLORS.dark};
  font-size: 15px;
  line-height: 1.5;

  &:hover {
    background: ${props => props.isCurrentWord ? COLORS.secondaryDark : 'rgba(74, 144, 226, 0.2)'};
  }

  /* Adicionar espaço após cada palavra, exceto a última */
  &:not(:last-child)::after {
    content: ' ';
  }
`;

// Componente específico para eventos de áudio como (risadas)
const AudioEventSpan = styled.span`
  display: inline;
  font-style: italic;
  color: ${COLORS.textSecondary};
  background: rgba(74, 144, 226, 0.1);
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 14px;
  margin: 0 2px;
  
  /* Adicionar espaço após cada evento, exceto a última */
  &:not(:last-child)::after {
    content: ' ';
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: ${COLORS.textSecondary};
  font-style: italic;

  &::before {
    content: '';
    width: 32px;
    height: 32px;
    border: 3px solid ${COLORS.lightGray};
    border-top-color: ${COLORS.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 12px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorAlert = styled.div`
  padding: 16px 20px;
  background: linear-gradient(135deg, #E74C3C 0%, #C0392B 100%);
  color: ${COLORS.white};
  border-radius: 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  &::before {
    content: '⚠️';
    margin-right: 12px;
    font-size: 20px;
  }
`;

const ResultsPanel = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background: linear-gradient(135deg, #27AE60 0%, #2ECC71 100%);
  color: ${COLORS.white};
  border-radius: 12px;
`;

const ResultItem = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${COLORS.white};
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  display: block;
  width: 100%;
  margin-bottom: 8px;
  transition: all ${ANIMATIONS.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(4px);
  }
`;

const HarveAudioPlayer = () => {
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
  
  // Estados para palavra atual e dropdown
  const [allWords, setAllWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const audioRef = useRef(null);

  // Opções de áudio com visual melhorado
  const audioOptions = [
    { 
      id: 'sample_full_class', 
      name: 'Trecho Inicial - Data Science', 
      description: 'Trecho inicial com transcrição detalhada palavra por palavra',
      url: '/audio/sample_full_class_2307_CDT21.wav',
      transcriptionUrl: '/audio/transcription_segmented_json.json',
      hasTranscription: true
    },
    { 
      id: 'audio1', 
      name: 'Audio Sample 1', 
      description: 'Exemplo prático com transcrição',
      url: '/audio/audio1.wav',
      transcriptionUrl: '/audio1/transcription1.json',
      hasTranscription: true
    },
    { 
      id: 'audio2', 
      name: 'Audio Sample 2 (M4A)', 
      description: 'Formato M4A sem transcrição',
      url: '/audio/audio2.m4a',
      transcriptionUrl: null,
      hasTranscription: false
    }
  ];

  // Funções utilitárias
  const formatTime = (time) => {
    if (!time || isNaN(time) || time < 0) return '0:00';
    const totalSeconds = Math.floor(time);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Processar transcrição
  const processTranscription = (data) => {
    let segments = [];
    let words = [];
    let wordIndex = 0;
    
    if (data.segments) {
      segments = data.segments.map((segment, index) => {
        // Incluir palavras E eventos de áudio como (risadas)
        const segmentWords = segment.words?.filter(w => w.type === 'word' || w.type === 'audio_event') || [];
        console.log('📋 Segmento', index, 'words encontradas:', segmentWords.length, 'primeira palavra:', segmentWords[0]?.text);
        const firstWord = segmentWords[0];
        const lastWord = segmentWords[segmentWords.length - 1];
        
        // Adicionar palavras individuais ao array global com índice
        const processedWords = segmentWords.map(word => {
          const processedWord = {
            text: word.text, // O JSON usa 'text' como campo principal
            start: word.start,
            end: word.end,
            confidence: word.confidence || 1,
            speaker: word.speaker_id || 'speaker_0',
            segmentId: index + 1,
            index: word.type === 'word' ? wordIndex++ : -1, // Só palavras reais recebem índice
            type: word.type // Manter o tipo para diferenciação
          };
          
          // Só adicionar palavras reais ao array de navegação
          if (word.type === 'word') {
            words.push(processedWord);
          }
          
          return processedWord;
        });
        
        return {
          id: index + 1,
          start: firstWord?.start || 0,
          end: lastWord?.end || firstWord?.start + 1,
          text: segment.text || '',
          speaker: firstWord?.speaker_id || 'speaker_0',
          words: processedWords
        };
      });
    } else if (data.transcription) {
      segments = data.transcription.map(segment => ({
        id: segment.id,
        start: segment.start,
        end: segment.end,
        text: segment.text,
        speaker: segment.speaker || 'Speaker',
        words: []
      }));
    }
    
    // Definir palavras processadas
    setAllWords(words);
    
    return segments;
  };

  // Carregar transcrição
  const loadTranscription = async (url) => {
    try {
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
    setDropdownOpen(false); // Fechar dropdown
    
    try {
      if (audioRef.current) {
        audioRef.current.src = audio.url;
        audioRef.current.load();
      }
      
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
    } else {
      audioRef.current.play();
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
  };

  // Navegar para segmento
  const jumpToSegment = (segment) => {
    if (audioRef.current) {
      audioRef.current.currentTime = segment.start;
      setCurrentTime(segment.start);
    }
  };

  // Verificar segmento atual
  const getCurrentSegment = () => {
    return transcription.find(segment => 
      currentTime >= segment.start && currentTime < segment.end
    );
  };

  // Navegar para palavra específica
  const jumpToWord = (word) => {
    if (audioRef.current) {
      audioRef.current.currentTime = word.start;
      setCurrentTime(word.start);
    }
  };

  // Navegação rápida
  const jumpToStart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      const newTime = Math.max(0, audioRef.current.currentTime - 10);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipForward = () => {
    if (audioRef.current && duration) {
      const newTime = Math.min(duration, audioRef.current.currentTime + 10);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const jumpToNextWord = () => {
    if (currentWordIndex < allWords.length - 1) {
      const nextWord = allWords[currentWordIndex + 1];
      jumpToWord(nextWord);
    }
  };

  const jumpToPrevWord = () => {
    if (currentWordIndex > 0) {
      const prevWord = allWords[currentWordIndex - 1];
      jumpToWord(prevWord);
    }
  };

  // Função para renderizar segmento com destaque de palavras
  const renderSegmentWithWordHighlight = (segment, index) => {
    console.log('🏷️ Renderizando segmento:', index, 'texto:', segment.text, 'words:', segment.words?.length || 0);
    
    // TESTE: Renderizar texto direto primeiro
    if (!segment.text) {
      console.log('❌ Segmento sem texto:', segment);
      return <div style={{color: 'red'}}>Segmento sem texto</div>;
    }
    
    if (!segment.words || segment.words.length === 0) {
      console.log('📝 Renderizando como texto simples:', segment.text);
      return (
        <SegmentHarve
          key={index}
          isHighlighted={currentSegment?.id === segment.id}
          isSearchResult={searchResults.some(result => result.id === segment.id)}
          onClick={() => jumpToSegment(segment)}
        >
          {segment.text}
        </SegmentHarve>
      );
    }

    console.log('🔤 Renderizando com palavras:', segment.words.map(w => w.text).join(' '));
    return (
      <SegmentHarve
        key={index}
        isHighlighted={currentSegment?.id === segment.id}
        isSearchResult={searchResults.some(result => result.id === segment.id)}
        onClick={() => jumpToSegment(segment)}
      >
        {segment.words.map((word, wordIndex) => {
          const isCurrentWord = word.type === 'word' && currentWordIndex === word.index;
          const wordText = word.text || `palavra_${wordIndex}`; // word.text é o campo correto
          console.log('🔤 Palavra:', wordIndex, 'texto:', wordText, 'tipo:', word.type, 'start:', word.start);
          
          // Se for um evento de áudio, usar componente específico
          if (word.type === 'audio_event') {
            return (
              <AudioEventSpan key={wordIndex}>
                {wordText}
              </AudioEventSpan>
            );
          }
          
          // Se for uma palavra normal, usar componente interativo
          return (
            <WordSpan
              key={wordIndex}
              isCurrentWord={isCurrentWord}
              onClick={(e) => {
                e.stopPropagation();
                if (audioRef.current) {
                  audioRef.current.currentTime = word.start;
                }
              }}
            >
              {wordText}
            </WordSpan>
          );
        })}
      </SegmentHarve>
    );
  };

  // Event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Verificar palavra atual - movida para dentro do useEffect
    const getCurrentWord = () => {
      const wordIndex = allWords.findIndex(word => 
        currentTime >= word.start && currentTime < word.end
      );
      
      if (wordIndex !== -1 && wordIndex !== currentWordIndex) {
        setCurrentWordIndex(wordIndex);
      }
      
      return wordIndex !== -1 ? allWords[wordIndex] : null;
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      getCurrentWord(); // Atualizar palavra atual
    };
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleEnded = () => setIsPlaying(false);
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
  }, [allWords, currentWordIndex, currentTime]); // Corrigir dependências

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentSegment = getCurrentSegment();

  return (
    <HarveContainer>
      {/* Header com branding */}
      <HarveHeader>
        <HarveLogo>
          <HarveLogoImage src={harveLogo} alt="Harve Logo" />
        </HarveLogo>
        <HarveTitle>
          <Title>Audio Player</Title>
          <Subtitle>Sistema de análise de gravações das aulas com transcrição inteligente</Subtitle>
        </HarveTitle>
      </HarveHeader>
      
      {/* Dropdown para seleção de áudio */}
      <FeatureSection>
        <FeatureHeader>
          <FeatureIcon>📚</FeatureIcon>
          <FeatureTitle>Selecione seu conteúdo de áudio</FeatureTitle>
        </FeatureHeader>
        
        <AudioSelector>
          <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
            <span>
              {selectedAudio ? selectedAudio.name : 'Escolha um arquivo de áudio...'}
            </span>
            <span>{dropdownOpen ? '🔼' : '🔽'}</span>
          </DropdownButton>
          
          <DropdownContent $isOpen={dropdownOpen}>
            {audioOptions.map(audio => (
              <DropdownItem
                key={audio.id}
                selected={selectedAudio?.id === audio.id}
                onClick={() => selectAudio(audio)}
              >
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                  {audio.name}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  {audio.description}
                </div>
                <div style={{ fontSize: '11px', opacity: 0.6, marginTop: '4px' }}>
                  {audio.hasTranscription ? '📝 Com transcrição' : '🔇 Sem transcrição'}
                </div>
              </DropdownItem>
            ))}
          </DropdownContent>
        </AudioSelector>
      </FeatureSection>

      {error && <ErrorAlert>{error}</ErrorAlert>}

      {isLoading && (
        <LoadingSpinner>
          Carregando conteúdo...
        </LoadingSpinner>
      )}

      {selectedAudio && !isLoading && (
        <>
          {/* Player principal com design Harve */}
          <PlayerSection>
            <ControlsGrid>
              <PlayButtonHarve onClick={togglePlay} disabled={!selectedAudio || isLoading}>
                {isPlaying ? '⏸️' : '▶️'}
              </PlayButtonHarve>
              
              <ProgressSection>
                <ProgressBarHarve onClick={handleProgressClick}>
                  <ProgressFillHarve progress={progress} />
                </ProgressBarHarve>
              </ProgressSection>
              
              <TimeDisplayHarve>
                {formatTime(currentTime)} / {formatTime(duration)}
              </TimeDisplayHarve>
            </ControlsGrid>

            {/* Controles de navegação integrados */}
            <PlayerControls>
              <ControlButton onClick={jumpToStart}>⏮️ Início</ControlButton>
              <ControlButton onClick={skipBackward}>⏪ -10s</ControlButton>
              <ControlButton onClick={jumpToPrevWord}>⬅️ Palavra</ControlButton>
              <ControlButton onClick={jumpToNextWord}>Palavra ➡️</ControlButton>
              <ControlButton onClick={skipForward}>+10s ⏩</ControlButton>
            </PlayerControls>
          </PlayerSection>

          {/* Transcrição por segmentos com busca integrada */}
          {transcription.length > 0 && (
            <FeatureSection>
              <TranscriptHeader>
                <FeatureHeader style={{ marginBottom: 0 }}>
                  <FeatureIcon>📝</FeatureIcon>
                  <FeatureTitle>Transcrição por Segmentos ({transcription.length} segmentos)</FeatureTitle>
                </FeatureHeader>
                
                <TranscriptSearchContainer>
                  <CompactSearchInput
                    type="text"
                    placeholder="🔍 Buscar na transcrição..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                  />
                  <CompactButton onClick={performSearch}>
                    Buscar
                  </CompactButton>
                  {searchResults.length > 0 && (
                    <CompactButton 
                      style={{ background: COLORS.gradientSecondary }}
                      onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                    >
                      Limpar
                    </CompactButton>
                  )}
                </TranscriptSearchContainer>
              </TranscriptHeader>

              {/* Resultados da busca */}
              {searchResults.length > 0 && (
                <ResultsPanel style={{ marginBottom: '16px' }}>
                  <strong>🎯 {searchResults.length} resultado(s) encontrado(s):</strong>
                  <div style={{ marginTop: '8px', maxHeight: '150px', overflowY: 'auto' }}>
                    {searchResults.map(result => (
                      <ResultItem
                        key={result.id}
                        onClick={() => jumpToSegment(result)}
                      >
                        <strong>[{formatTime(result.start)}]</strong> {result.text}
                      </ResultItem>
                    ))}
                  </div>
                </ResultsPanel>
              )}
              
              <TranscriptContainer>
                {console.log('🔍 Transcrição para renderizar:', transcription.slice(0, 3))}
                {transcription.slice(0, 100).map((segment, index) => {
                  console.log('🎯 Renderizando segmento:', index, segment);
                  return (
                    <div key={segment.id} style={{ marginBottom: '12px' }}>
                      <span style={{ 
                        color: COLORS.textSecondary, 
                        fontSize: '12px', 
                        fontWeight: 'bold',
                        marginRight: '8px'
                      }}>
                        [{formatTime(segment.start)}]
                      </span>
                      {renderSegmentWithWordHighlight(segment, index)}
                    </div>
                  );
                })}
                {transcription.length > 100 && (
                  <div style={{ 
                    padding: '20px', 
                    textAlign: 'center', 
                    color: COLORS.textSecondary,
                    fontStyle: 'italic'
                  }}>
                    ... e mais {transcription.length - 100} segmentos
                  </div>
                )}
              </TranscriptContainer>
            </FeatureSection>
          )}
        </>
      )}

      {/* Elemento de áudio oculto */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </HarveContainer>
  );
};

export default HarveAudioPlayer;
