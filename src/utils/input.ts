import { GAME_CONFIG } from "../constants/game";
import type { Player } from "../types/game";

export class InputHandler {
  private keys: React.MutableRefObject<{ [key: string]: boolean }>;

  constructor(keysRef: React.MutableRefObject<{ [key: string]: boolean }>) {
    this.keys = keysRef;
  }

  setupEventListeners(): () => void {
    const handleKeyDown = (event: KeyboardEvent) => {
      this.keys.current[event.code] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      this.keys.current[event.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }

  handlePlayerInput(
    player: Player,
    facingLeftRef: React.MutableRefObject<boolean>
  ): void {
    if (this.keys.current["ArrowLeft"]) {
      player.velocityX = -GAME_CONFIG.MOVE_SPEED;
      facingLeftRef.current = true;
    } else if (this.keys.current["ArrowRight"]) {
      player.velocityX = GAME_CONFIG.MOVE_SPEED;
      facingLeftRef.current = false;
    } else {
      player.velocityX *= GAME_CONFIG.FRICTION;
    }
  }
}
