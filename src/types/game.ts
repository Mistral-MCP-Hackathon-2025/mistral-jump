export interface Platform {
  x: number;
  y: number;
  width: number;
}

export interface Player {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  width: number;
  height: number;
}

export interface GameState {
  score: number;
  gameOver: boolean;
}

export interface GameRefs {
  player: React.MutableRefObject<Player>;
  platforms: React.MutableRefObject<Platform[]>;
  camera: React.MutableRefObject<number>;
  facingLeft: React.MutableRefObject<boolean>;
  keys: React.MutableRefObject<{ [key: string]: boolean }>;
  playerImage: React.MutableRefObject<HTMLImageElement | null>;
  animation: React.MutableRefObject<number | undefined>;
}
