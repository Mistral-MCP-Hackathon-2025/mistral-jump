export const GAME_CONFIG = {
  // Canvas dimensions - now fullscreen
  CANVAS_WIDTH: typeof window !== "undefined" ? window.innerWidth : 800,
  CANVAS_HEIGHT: typeof window !== "undefined" ? window.innerHeight : 600,

  // Physics
  GRAVITY: 0.5,
  JUMP_FORCE: -15,
  MOVE_SPEED: 5,
  FRICTION: 0.8,

  // Platform settings
  PLATFORM_WIDTH: 120,
  PLATFORM_HEIGHT: 20,
  PLATFORM_SPACING: 120,
  PLATFORM_COUNT: 100,

  // Player settings
  PLAYER_WIDTH: 90,
  PLAYER_HEIGHT: 90,
  PLAYER_START_OFFSET: 120,

  // Game mechanics
  COLLISION_TOLERANCE: 3,
  GAME_OVER_OFFSET: 100,
  SCORE_MULTIPLIER: 10,

  // Visual - Mistral Colors (Official Brand Colors)
  MISTRAL_COLORS: {
    YELLOW: "#FFD800",
    ORANGE_LIGHT: "#FFAF00",
    ORANGE: "#FF8205",
    ORANGE_DARK: "#FA500F",
    RED: "#E10500",
  },
  BACKGROUND_COLOR: "#87CEEB", // Fallback color
  PLATFORM_COLOR: "#2C1810", // Dark brown that complements Mistral colors
  FALLBACK_PLAYER_COLOR: "#FF6B6B",

  // Animation (keeping for future use if needed)
  GRADIENT_ANIMATION_SPEED: 0.0008,
  PARALLAX_SPEED: 0.0003,
} as const;
