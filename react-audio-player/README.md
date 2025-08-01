# 🎵 Harve Audio Player - POC

Sistema inteligente de análise de gravações de aulas com transcrição palavra por palavra desenvolvido para a **Harve**.

## 🚀 **Características principais**

### 🎯 **Player de Áudio Avançado**
- **Reprodução sincronizada** com transcrição palavra por palavra
- **Navegação inteligente**: Pule para palavras específicas, segmentos ou use controles de ±10s
- **Barra de progresso interativa** com design Harve (laranja e preto)
- **Controles integrados**: Início, -10s, ←Palavra, Palavra→, +10s

### 📝 **Transcrição Inteligente**
- **Destaque em tempo real** da palavra atual (azul) e segmento (laranja)
- **Eventos de áudio detectados**: (risadas), (aplausos) aparecem em itálico
- **Busca semântica** na transcrição com resultados destacados
- **Navegação por clique**: Clique em qualquer palavra para pular para o momento exato

### 🎨 **Design Harve**
- **Paleta de cores**: Laranja (#FF6B35) e Preto (#2C3E50)
- **Logo integrada** no cabeçalho
- **Interface responsiva** e moderna
- **Componentes styled-components** com animações suaves

## 🛠️ **Tecnologias utilizadas**

- **React 18.3.1** - Framework principal
- **Vite 5.4.19** - Build tool e dev server
- **styled-components** - CSS-in-JS para estilização
- **HTML5 Audio API** - Reprodução de áudio
- **JSON** - Formato de transcrição com timing palavra por palavra

## 📁 **Estrutura do projeto**

```
react-audio-player/
├── src/
│   ├── features/audio-player/components/
│   │   └── HarveAudioPlayer.jsx        # Componente principal
│   ├── utils/
│   │   └── constants.js                # Cores e animações Harve
│   ├── assets/
│   │   └── harve_logo.png             # Logo da Harve
│   └── App.jsx
├── public/audio/                       # 📂 Arquivos de áudio e transcrição
│   ├── sample_full_class_2307_CDT21.wav
│   ├── transcription_segmented_json.json
│   ├── audio1.wav
│   └── audio2.m4a
└── package.json
```

## 🎵 **Formato de transcrição suportado**

O sistema utiliza arquivos JSON com a seguinte estrutura:

```json
{
  "segments": [
    {
      "text": "(risadas) Você vai ter que fazer maionese.",
      "words": [
        {
          "text": "(risadas)",
          "start": 0.079,
          "end": 0.799,
          "type": "audio_event",
          "speaker_id": "speaker_0"
        },
        {
          "text": "Você",
          "start": 2.019,
          "end": 2.159,
          "type": "word",
          "speaker_id": "speaker_0"
        }
      ]
    }
  ]
}
```

## 🚀 **Como executar**

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clonar o repositório
git clone <repository-url>
cd react-audio-player

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Abrir no navegador
# http://localhost:5173 ou http://localhost:5174
```

## 📋 **Funcionalidades implementadas**

### ✅ **Player de Áudio**
- [x] Reprodução/pausa com botão principal
- [x] Barra de progresso clicável
- [x] Display de tempo atual/total
- [x] Controles de navegação (-10s, +10s, início)
- [x] Navegação palavra por palavra

### ✅ **Transcrição**
- [x] Carregamento de JSON com palavras e timing
- [x] Destaque da palavra atual em tempo real
- [x] Destaque do segmento atual
- [x] Clique para navegar para palavra específica
- [x] Suporte a eventos de áudio (risadas, etc.)

### ✅ **Busca**
- [x] Busca textual na transcrição
- [x] Destaque de resultados
- [x] Navegação para resultados encontrados

### ✅ **Interface**
- [x] Design Harve com logo integrada
- [x] Dropdown para seleção de áudios
- [x] Layout responsivo
- [x] Animações suaves

## 🎯 **Casos de uso**

1. **Análise de aulas gravadas**: Professores podem revisar suas aulas e identificar momentos específicos
2. **Estudo dirigido**: Alunos podem navegar rapidamente para tópicos de interesse
3. **Transcrição acessível**: Pessoas com deficiência auditiva podem acompanhar o conteúdo
4. **Pesquisa de conteúdo**: Busca rápida por palavras-chave na gravação

## 📊 **Dados de exemplo**

O projeto inclui:
- **sample_full_class_2307_CDT21.wav**: Trecho de aula de Data Science com transcrição completa
- **transcription_segmented_json.json**: Transcrição palavra por palavra com 1000+ segmentos
- **Áudios adicionais**: Para teste de diferentes formatos

## 🔧 **Configuração**

### Adicionando novos áudios
1. Coloque o arquivo de áudio em `public/audio/`
2. Adicione a transcrição JSON correspondente
3. Configure no array `audioOptions` em `HarveAudioPlayer.jsx`

### Personalização de cores
Edite o arquivo `src/utils/constants.js` para ajustar a paleta de cores.

## 📈 **Próximos passos (roadmap futuro)**

- [ ] Upload de arquivos de áudio via interface
- [ ] Geração automática de transcrição com IA
- [ ] Múltiplos falantes com cores diferentes
- [ ] Exportação de trechos específicos
- [ ] Anotações e marcadores personalizados
- [ ] Integração com APIs de transcrição

## 🤝 **Contribuição**

Este é um projeto POC (Proof of Concept) desenvolvido para demonstrar as capacidades de análise de áudio com transcrição inteligente.

---

**Desenvolvido com ❤️ para Harve**
