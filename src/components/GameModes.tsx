import React from "react";
import { GameMode } from "../types/game";

interface GameModesProps {
  currentMode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

const GameModes: React.FC<GameModesProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="mode-selector">
      <h3>Choose Mode:</h3>
      <div className="mode-buttons">
        {Object.values(GameMode).map((mode) => (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={currentMode === mode ? "active" : ""}
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameModes;
