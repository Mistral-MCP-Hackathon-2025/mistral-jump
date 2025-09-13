import { GAME_CONFIG } from "../constants/game";
import type { Player, Platform } from "../types/game";

export class Renderer {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  drawStaticBackground(): void {
    // Get actual canvas dimensions
    const canvasWidth = this.ctx.canvas.width;
    const canvasHeight = this.ctx.canvas.height;

    // Create static gradient background with Mistral colors
    const gradient = this.ctx.createLinearGradient(0, 0, 0, canvasHeight);

    // Mistral colors array for gradient (from yellow to red)
    const colors = [
      GAME_CONFIG.MISTRAL_COLORS.YELLOW,
      GAME_CONFIG.MISTRAL_COLORS.ORANGE_LIGHT,
      GAME_CONFIG.MISTRAL_COLORS.ORANGE,
      GAME_CONFIG.MISTRAL_COLORS.ORANGE_DARK,
      GAME_CONFIG.MISTRAL_COLORS.RED,
    ];

    // Create smooth horizontal bands (static positioning)
    for (let i = 0; i < colors.length; i++) {
      const position = i / (colors.length - 1);
      gradient.addColorStop(position, colors[i]);
    }

    // Apply gradient background
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  drawPlatforms(platforms: Platform[], cameraY: number): void {
    for (const platform of platforms) {
      const screenY = platform.y - cameraY;

      // Only draw platforms that are visible on screen
      if (
        screenY > -GAME_CONFIG.PLATFORM_HEIGHT &&
        screenY < GAME_CONFIG.CANVAS_HEIGHT + GAME_CONFIG.PLATFORM_HEIGHT
      ) {
        this.drawPlatform(
          platform.x,
          screenY,
          platform.width,
          GAME_CONFIG.PLATFORM_HEIGHT
        );
      }
    }
  }

  private drawPlatform(
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    this.ctx.save();

    // Draw platform shadow first
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    this.drawRoundedRect(x + 3, y + 3, width, height, 8);
    this.ctx.fill();

    // Create gradient for platform
    const gradient = this.ctx.createLinearGradient(x, y, x, y + height);
    gradient.addColorStop(0, "#8B4513"); // Lighter brown top
    gradient.addColorStop(0.3, "#654321"); // Medium brown
    gradient.addColorStop(0.7, "#4A2C17"); // Darker brown
    gradient.addColorStop(1, "#2C1810"); // Darkest brown bottom

    // Draw main platform with gradient
    this.ctx.fillStyle = gradient;
    this.drawRoundedRect(x, y, width, height, 8);
    this.ctx.fill();

    // Add highlight on top edge
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    this.drawRoundedRect(x, y, width, height * 0.3, 8);
    this.ctx.fill();

    // Add subtle inner glow
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    this.ctx.lineWidth = 1;
    this.drawRoundedRect(x + 0.5, y + 0.5, width - 1, height - 1, 7);
    this.ctx.stroke();

    // Add texture dots for grip
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    const dotSpacing = 12;
    const dotsPerRow = Math.floor(width / dotSpacing);
    const startX = x + (width - (dotsPerRow - 1) * dotSpacing) / 2;

    for (let i = 0; i < dotsPerRow; i++) {
      const dotX = startX + i * dotSpacing;
      const dotY = y + height / 2;
      this.ctx.beginPath();
      this.ctx.arc(dotX, dotY, 1.5, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.restore();
  }

  private drawRoundedRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ): void {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
  }

  drawPlayer(
    player: Player,
    cameraY: number,
    playerImage: HTMLImageElement | null,
    imageLoaded: boolean,
    facingLeft: boolean
  ): void {
    const playerScreenY = player.y - cameraY;

    if (imageLoaded && playerImage && playerImage.complete) {
      this.drawPlayerImage(player, playerScreenY, playerImage, facingLeft);
    } else {
      this.drawPlayerFallback(player, playerScreenY);
    }
  }

  private drawPlayerImage(
    player: Player,
    screenY: number,
    image: HTMLImageElement,
    facingLeft: boolean
  ): void {
    this.ctx.save();

    // Optimize settings for GIF animation rendering
    this.ctx.imageSmoothingEnabled = false; // Disable smoothing for pixel-perfect GIF rendering

    // Ensure the image is ready and animated
    if (!image.complete || image.naturalWidth === 0) {
      console.warn("Image not ready for rendering");
      this.ctx.restore();
      return;
    }

    if (facingLeft) {
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight, // Source rectangle (full image)
        -(player.x + player.width),
        screenY,
        player.width,
        player.height // Destination rectangle
      );
    } else {
      this.ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight, // Source rectangle (full image)
        player.x,
        screenY,
        player.width,
        player.height // Destination rectangle
      );
    }

    this.ctx.restore();
  }

  private drawPlayerFallback(player: Player, screenY: number): void {
    this.ctx.fillStyle = GAME_CONFIG.FALLBACK_PLAYER_COLOR;
    this.ctx.fillRect(player.x, screenY, player.width, player.height);
  }
}
