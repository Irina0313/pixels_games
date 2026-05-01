export type GameMode = "quick" | "full";
export type AppState = "start" | "game" | "result";

export type Suit = "Hearts" | "Diamonds" | "Clubs" | "Spades";

export interface Person {
  id: string;
  name: string;
  image: string;
  suit: Suit;
}

export interface Card {
  id: string;
  personId: string;
  name: string;
  image: string;
  suit: Suit;
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
