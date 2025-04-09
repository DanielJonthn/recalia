import { Card, GameMode } from "../types/game";

export const getGridSize = (mode: GameMode): number => {
  switch (mode) {
    case GameMode.NOVICE:
      return 4;
    case GameMode.MASTER:
      return 5;
    case GameMode.ROYALE:
      return 6;
    default:
      return 4;
  }
};

export const generateCards = (gameMode: GameMode): Card[] => {
  const gridSize = getGridSize(gameMode);
  const totalCards = gridSize * gridSize;
  const pairsCount = totalCards / 2;

  const values = Array.from({ length: pairsCount }, (_, i) => i + 1);
  const pairs = [...values, ...values];

  const shuffledPairs = shuffleArray(pairs);

  return shuffledPairs.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }));
};

// Shuffle with Fisher-Yates algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const checkWinCondition = (cards: Card[]): boolean => {
  return cards.every((card) => card.isMatched);
};
