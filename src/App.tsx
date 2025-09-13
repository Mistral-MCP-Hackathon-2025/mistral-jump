import { useState, useEffect } from "react";
import { GameCanvas } from "./components/GameCanvas";
import { GameUI } from "./components/GameUI";
import { useGameEngine } from "./hooks/useGameEngine";
import { useImageLoader } from "./hooks/useImageLoader";
import type { GameState } from "./types/game";

function App() {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    gameOver: false,
  });

  // Load player image
  const { playerImage } = useImageLoader();

  // Game engine hooks
  const { gameLoop, startGame, setupInputListeners } = useGameEngine({
    onScoreUpdate: (score: number) => {
      setGameState((prev) => ({ ...prev, score }));
    },
    onGameOver: () => {
      setGameState((prev) => ({ ...prev, gameOver: true }));
    },
    playerImage,
  });

  const handleRestart = () => {
    setGameState({ score: 0, gameOver: false });
    startGame();
  };

  // Setup input listeners and start game
  useEffect(() => {
    const cleanup = setupInputListeners();
    startGame();

    return cleanup;
  }, [setupInputListeners, startGame]);

  // Handle keyboard restart when game is over
  useEffect(() => {
    if (!gameState.gameOver) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "Space") {
        handleRestart();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState.gameOver]);

  return (
    <GameUI
      score={gameState.score}
      gameOver={gameState.gameOver}
      onRestart={handleRestart}
    >
      <GameCanvas onGameLoop={gameLoop} gameOver={gameState.gameOver} />
    </GameUI>
  );
}

export default App;
