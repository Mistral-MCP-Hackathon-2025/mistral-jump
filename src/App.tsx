import { useState, useEffect } from "react";
import { GameCanvas } from "./components/GameCanvas";
import { GameUI } from "./components/GameUI";
import { LoadingScreen } from "./components/LoadingScreen";
import { useGameEngine } from "./hooks/useGameEngine";
import { useImageLoader } from "./hooks/useImageLoader";
import { useIframeMessaging } from "./hooks/useIframeMessaging";
import type { GameState } from "./types/game";

function App() {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    gameOver: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load player image
  const { playerImage, imageLoaded } = useImageLoader();

  // Iframe messaging hook
  const {
    notifyGameStart,
    notifyGameOver,
    notifyScoreUpdate,
    notifyGameRestart,
  } = useIframeMessaging({
    onGameEvent: (event, data) => {
      console.log("Received iframe event:", event, data);
    },
  });

  // Game engine hooks
  const { gameLoop, startGame, setupInputListeners } = useGameEngine({
    onScoreUpdate: (score: number) => {
      setGameState((prev) => ({ ...prev, score }));
      notifyScoreUpdate(score);
    },
    onGameOver: () => {
      setGameState((prev) => ({ ...prev, gameOver: true }));
      notifyGameOver(gameState.score);
    },
    playerImage,
    imageLoaded,
  });

  const handleRestart = () => {
    setGameState({ score: 0, gameOver: false });
    startGame();
    notifyGameRestart();
  };

  // Setup input listeners and start game immediately (but keep hidden during loading)
  useEffect(() => {
    const cleanup = setupInputListeners();
    startGame();
    notifyGameStart();
    return cleanup;
  }, [setupInputListeners, startGame, notifyGameStart]);

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

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Game UI - always rendered but hidden during loading */}
      <div
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <GameUI
          score={gameState.score}
          gameOver={gameState.gameOver}
          onRestart={handleRestart}
        >
          <GameCanvas onGameLoop={gameLoop} gameOver={gameState.gameOver} />
        </GameUI>
      </div>

      {/* Loading screen overlay */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
    </>
  );
}

export default App;
