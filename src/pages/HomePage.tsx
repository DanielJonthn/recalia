import { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import GameControls from "../components/GameControls";
import GameModes from "../components/GameModes";
import ThemeToggle from "../components/ThemeToggle";
import { Card, GameMode, GameState } from "../types/game";
import { generateCards, checkWinCondition } from "../utils/gameUtils";

function HomePage() {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    moves: 0,
    firstSelection: null,
    secondSelection: null,
    gameMode: GameMode.NOVICE,
    isGameWon: false,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    resetGame(gameState.gameMode);
  }, []);

  useEffect(() => {
    if (gameState.firstSelection && gameState.secondSelection) {
      setIsProcessing(true);

      const isMatch =
        gameState.firstSelection.value === gameState.secondSelection.value;

      setTimeout(() => {
        updateCards(isMatch);
        setIsProcessing(false);
      }, 1000);
    }
  }, [gameState.secondSelection]);

  const resetGame = (mode: GameMode) => {
    setGameState({
      cards: generateCards(mode),
      moves: 0,
      firstSelection: null,
      secondSelection: null,
      gameMode: mode,
      isGameWon: false,
    });
  };

  const updateCards = (isMatch: boolean) => {
    const { cards, firstSelection, secondSelection } = gameState;

    if (!firstSelection || !secondSelection) return;

    const updatedCards = cards.map((card) => {
      if (card.id === firstSelection.id || card.id === secondSelection.id) {
        if (isMatch) {
          // Cards match, keep them flipped and mark as matched
          return { ...card, isFlipped: true, isMatched: true };
        } else {
          // Cards don't match, flip them back
          return { ...card, isFlipped: false };
        }
      }
      return card;
    });

    const isGameWon = checkWinCondition(updatedCards);

    setGameState((prev) => ({
      ...prev,
      cards: updatedCards,
      firstSelection: null,
      secondSelection: null,
      isGameWon,
    }));
  };

  const handleCardClick = (card: Card) => {
    if (isProcessing) return;

    // No clicking the same card twice
    if (gameState.firstSelection && gameState.firstSelection.id === card.id)
      return;

    // Flip the clicked card
    const updatedCards = gameState.cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );

    if (!gameState.firstSelection) {
      setGameState((prev) => ({
        ...prev,
        cards: updatedCards,
        firstSelection: card,
        moves: prev.moves + 1,
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        cards: updatedCards,
        secondSelection: card,
      }));
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className={`home-page ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="header">
        <h1 className="game-title">Recalia</h1>
        <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      <GameModes currentMode={gameState.gameMode} onModeChange={resetGame} />

      <GameBoard
        cards={gameState.cards}
        gameMode={gameState.gameMode}
        onCardClick={handleCardClick}
        isProcessing={isProcessing}
      />

      <GameControls
        moves={gameState.moves}
        onReset={() => resetGame(gameState.gameMode)}
      />

      {gameState.isGameWon && <div className="win-message">You Win! 🎉</div>}

      <footer>
        <p>
          Created by
          <a
            href="https://github.com/DanielJonthn/recalia"
            target="_blank"
            rel="noopener noreferrer"
          >
            Daniel Jonathan
          </a>
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
