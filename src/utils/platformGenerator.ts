import { GAME_CONFIG } from "../constants/game";
import type { Platform } from "../types/game";

export class PlatformGenerator {
  static generatePlatforms(
    canvasWidth: number,
    canvasHeight: number
  ): Platform[] {
    const platforms: Platform[] = [];

    // Starting platform (centered)
    platforms.push({
      x: canvasWidth / 2 - GAME_CONFIG.PLATFORM_WIDTH / 2,
      y: canvasHeight - 50,
      width: GAME_CONFIG.PLATFORM_WIDTH,
    });

    // Generate platforms going up
    for (let i = 1; i < GAME_CONFIG.PLATFORM_COUNT; i++) {
      platforms.push({
        x: Math.random() * (canvasWidth - GAME_CONFIG.PLATFORM_WIDTH),
        y: canvasHeight - 50 - i * GAME_CONFIG.PLATFORM_SPACING,
        width: GAME_CONFIG.PLATFORM_WIDTH,
      });
    }

    return platforms;
  }
}
