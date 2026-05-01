export type GameMode = "quick" | "full";
export type AppState = "start" | "game" | "result";

export interface Person {
  id: string;
  image: string;
}

export interface Card {
  id: string;
  personId: string;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface RecordItem {
  mode: GameMode;
  moves: number;
  timeSeconds: number;
  date: string;
}

export interface GameResult {
  mode: GameMode;
  moves: number;
  timeSeconds: number;
  rank: number;
}
