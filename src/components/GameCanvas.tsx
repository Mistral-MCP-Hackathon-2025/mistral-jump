import React, { useRef, useEffect, useState } from "react";

interface GameCanvasProps {
  onGameLoop: (canvas: HTMLCanvasElement) => void;
  gameOver: boolean;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  onGameLoop,
  gameOver,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [canvasSize, setCanvasSize] = useState(() => ({
    width:
      typeof window !== "undefined" ? Math.min(window.innerWidth, 480) : 480,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  }));
  const [gameImageSrc, setGameImageSrc] = useState<string>("");

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: Math.min(window.innerWidth, 480), // Mobile max width
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update canvas dimensions when size changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
  }, [canvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const animate = () => {
      // Run the game loop to update the canvas
      onGameLoop(canvas);

      // Convert canvas to data URL and update the image
      try {
        const dataURL = canvas.toDataURL("image/png");
        setGameImageSrc(dataURL);
      } catch (error) {
        console.warn("Failed to convert canvas to data URL:", error);
      }

      if (!gameOver) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onGameLoop, gameOver]);

  return (
    <>
      {/* Hidden canvas for rendering the game */}
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          visibility: "hidden",
        }}
      />

      {/* Visible image that shows the rendered game */}
      {gameImageSrc && (
        <img
          src={gameImageSrc}
          alt="Game Render"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            objectFit: "cover", // Fill the container
            imageRendering: "pixelated",
          }}
        />
      )}
    </>
  );
};
