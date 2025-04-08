export enum GameMode {
  NOVICE = "Novice Nostalgia",
  MASTER = "Memory Master",
  ROYALE = "Recall Royale",
}

export interface Card {
  id: number;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  moves: number;
  firstSelection: Card | null;
  secondSelection: Card | null;
  gameMode: GameMode;
  isGameWon: boolean;
}
