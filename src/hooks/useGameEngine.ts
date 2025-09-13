import { useRef, useCallback } from "react";
import { GAME_CONFIG } from "../constants/game";
import { InputHandler } from "../utils/input";
import { PhysicsEngine } from "../utils/physics";
import { Renderer } from "../utils/renderer";
import { PlatformGenerator } from "../utils/platformGenerator";
import type { Player, Platform } from "../types/game";

interface UseGameEngineProps {
  onScoreUpdate: (score: number) => void;
  onGameOver: () => void;
  playerImage: HTMLImageElement | null;
  imageLoaded?: boolean;
}

export const useGameEngine = ({
  onScoreUpdate,
  onGameOver,
  playerImage,
  imageLoaded = false,
}: UseGameEngineProps) => {
  // Game refs
  const playerRef = useRef<Player>({
    x: GAME_CONFIG.CANVAS_WIDTH / 2 - GAME_CONFIG.PLAYER_WIDTH / 2,
    y: GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.PLAYER_START_OFFSET,
    velocityX: 0,
    velocityY: 0,
    width: GAME_CONFIG.PLAYER_WIDTH,
    height: GAME_CONFIG.PLAYER_HEIGHT,
  });

  const platformsRef = useRef<Platform[]>([]);
  const cameraRef = useRef(0);
  const facingLeftRef = useRef(false);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const animationRef = useRef<number | undefined>(undefined);

  // Initialize input handler
  const inputHandler = useRef(new InputHandler(keysRef));

  const initializePlatforms = useCallback(
    (canvasWidth: number, canvasHeight: number) => {
      platformsRef.current = PlatformGenerator.generatePlatforms(
        canvasWidth,
        canvasHeight
      );
    },
    []
  );

  const gameLoop = useCallback(
    (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const player = playerRef.current;
      const platforms = platformsRef.current;
      const renderer = new Renderer(ctx);
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Handle input
      inputHandler.current.handlePlayerInput(player, facingLeftRef);

      // Apply physics
      PhysicsEngine.applyGravity(player);
      PhysicsEngine.updatePosition(player);
      PhysicsEngine.handleScreenWrapping(player, canvasWidth);
      PhysicsEngine.checkPlatformCollisions(player, platforms);

      // Update camera and score
      PhysicsEngine.updateCamera(
        player,
        cameraRef,
        onScoreUpdate,
        canvasHeight
      );

      // Check game over
      if (
        PhysicsEngine.checkGameOver(player, cameraRef.current, canvasHeight)
      ) {
        onGameOver();
        return;
      }

      // Render everything
      renderer.drawStaticBackground();
      renderer.drawPlatforms(platforms, cameraRef.current);
      renderer.drawPlayer(
        player,
        cameraRef.current,
        playerImage,
        imageLoaded,
        facingLeftRef.current
      );
    },
    [onScoreUpdate, onGameOver, playerImage, imageLoaded]
  );

  const startGame = useCallback(
    (canvasWidth?: number, canvasHeight?: number) => {
      const width =
        canvasWidth ||
        (typeof window !== "undefined" ? window.innerWidth : 800);
      const height =
        canvasHeight ||
        (typeof window !== "undefined" ? window.innerHeight : 600);

      // Reset player
      playerRef.current = {
        x: width / 2 - GAME_CONFIG.PLAYER_WIDTH / 2,
        y: height - GAME_CONFIG.PLAYER_START_OFFSET,
        velocityX: 0,
        velocityY: 0,
        width: GAME_CONFIG.PLAYER_WIDTH,
        height: GAME_CONFIG.PLAYER_HEIGHT,
      };

      // Reset game state
      cameraRef.current = 0;
      facingLeftRef.current = false;

      // Initialize platforms
      initializePlatforms(width, height);
    },
    [initializePlatforms]
  );

  const setupInputListeners = useCallback(() => {
    return inputHandler.current.setupEventListeners();
  }, []);

  return {
    gameLoop,
    startGame,
    setupInputListeners,
    animationRef,
  };
};
