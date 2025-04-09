import React from "react";
import Card from "./Card";
import { Card as CardType, GameMode } from "../types/game";
import { getGridSize } from "../utils/gameUtils";

interface GameBoardProps {
  cards: CardType[];
  gameMode: GameMode;
  onCardClick: (card: CardType) => void;
  isProcessing: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({
  cards,
  gameMode,
  onCardClick,
  isProcessing,
}) => {
  const gridSize = getGridSize(gameMode);

  return (
    <div className={`game-board grid-${gridSize}`}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={onCardClick}
          disabled={isProcessing}
        />
      ))}
    </div>
  );
};

export default GameBoard;
