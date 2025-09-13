import { GAME_CONFIG } from "../constants/game";
import type { Player, Platform } from "../types/game";

export class PhysicsEngine {
  static applyGravity(player: Player): void {
    player.velocityY += GAME_CONFIG.GRAVITY;
  }

  static updatePosition(player: Player): void {
    player.x += player.velocityX;
    player.y += player.velocityY;
  }

  static handleScreenWrapping(player: Player, canvasWidth: number): void {
    if (player.x < -player.width) {
      player.x = canvasWidth;
    } else if (player.x > canvasWidth) {
      player.x = -player.width;
    }
  }

  static checkPlatformCollisions(player: Player, platforms: Platform[]): void {
    if (player.velocityY <= 0) return; // Only check when falling

    for (const platform of platforms) {
      if (this.isColliding(player, platform)) {
        player.velocityY = GAME_CONFIG.JUMP_FORCE;
        break;
      }
    }
  }

  private static isColliding(player: Player, platform: Platform): boolean {
    return (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y + player.height > platform.y &&
      player.y + player.height <
        platform.y +
          GAME_CONFIG.PLATFORM_HEIGHT +
          GAME_CONFIG.COLLISION_TOLERANCE
    );
  }

  static updateCamera(
    player: Player,
    cameraRef: React.MutableRefObject<number>,
    onScoreUpdate: (score: number) => void,
    canvasHeight: number
  ): void {
    const targetCameraY = player.y - canvasHeight / 2;

    if (targetCameraY < cameraRef.current) {
      cameraRef.current = targetCameraY;

      // Update score based on height
      const newScore = Math.max(
        0,
        Math.floor(-targetCameraY / GAME_CONFIG.SCORE_MULTIPLIER)
      );
      onScoreUpdate(newScore);
    }
  }

  static checkGameOver(
    player: Player,
    cameraY: number,
    canvasHeight: number
  ): boolean {
    // Check if player has fallen too far below the visible screen
    const gameOverThreshold =
      cameraY + canvasHeight + GAME_CONFIG.GAME_OVER_OFFSET;
    const isGameOver = player.y > gameOverThreshold;

    // Debug logging (remove in production)
    if (player.y > cameraY + canvasHeight) {
      console.log(
        `Player falling: y=${Math.round(player.y)}, threshold=${Math.round(
          gameOverThreshold
        )}, gameOver=${isGameOver}`
      );
    }

    return isGameOver;
  }
}
