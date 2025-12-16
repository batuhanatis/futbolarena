export type QuestionType = 'FEUD' | 'NUMERIC' | 'WORD';

export interface Answer {
  id: string;
  text: string;
  score: number;
  revealed: boolean;
}

export interface Player {
  id: string;
  name: string;
  team: 'A' | 'B';
}

export interface Team {
  id: 'A' | 'B';
  name: string;
  score: number;
}

export interface GameQuestion {
  id: string;
  type: QuestionType;
  question: string;
  // For Feud
  answers?: { text: string; score: number }[];
  // For Numeric
  correctNumber?: number;
  // For Word
  correctWord?: string;
  
  createdAt: number;
}

export interface GameRound {
  id: string;
  type: QuestionType;
  question: string;
  
  // FEUD STATE
  answers: Answer[];
  totalPoints: number;
  currentStrikes: number;
  isQuestionRevealed: boolean;
  
  // NUMERIC STATE
  correctNumber?: number;
  numericGuesses: { playerId: string; playerName: string; team: 'A' | 'B'; guess: number; diff?: number }[];
  isNumericResultRevealed: boolean; // Show who won

  // WORD STATE
  correctWord?: string; // "GALATASARAY"
  wordPuzzle: (string | null)[]; // ['G', null, 'L', ...]
  wordCurrentValue: number; // Starts at 100, drops by 10

  // COMMON
  activeTeam: 'A' | 'B' | null;
  buzzerWinner: { team: 'A' | 'B', playerId: string, playerName: string } | null;
}

export enum AppView {
  LOBBY = 'LOBBY',
  DASHBOARD = 'DASHBOARD',
  HOST = 'HOST',
  BOARD = 'BOARD',
  PLAYER = 'PLAYER'
}

export interface GameState {
  sessionId: string;
  gamePhase: 'LOBBY' | 'GAME';
  players: Player[];
  activeGame: GameRound | null;
  showStrikeOverlay: boolean;
  teams: {
    A: Team;
    B: Team;
  };
  roundInfo?: {
    current: number;
    total: number;
  };
}