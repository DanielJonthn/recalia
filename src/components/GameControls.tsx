import React from "react";

interface GameControlsProps {
  moves: number;
  onReset: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ moves, onReset }) => {
  return (
    <div className="game-footer">
      <div className="moves-counter">Moves: {moves}</div>
      <button className="reset-button" onClick={onReset}>
        Reset Game
      </button>
    </div>
  );
};

export default GameControls;
