import React from "react";

interface GameUIProps {
  score: number;
  gameOver: boolean;
  onRestart: () => void;
  children: React.ReactNode;
}

export const GameUI: React.FC<GameUIProps> = ({
  score,
  gameOver,
  onRestart,
  children,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // Full-screen Mistral gradient background
        background:
          "linear-gradient(180deg, #FFD800 0%, #FFAF00 25%, #FF8205 50%, #FA500F 75%, #E10500 100%)",
      }}
    >
      {/* Game Container - centered with mobile max width */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "480px", // Mobile-friendly max width
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "transparent", // Let the game render its own background
        }}
      >
        {/* Game Canvas */}
        {children}
      </div>

      {/* UI Overlay */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
          zIndex: 10,
          width: "min(400px, calc(100vw - 40px))",
        }}
      >
        {/* Title and Score Container */}
        <div
          style={{
            padding: "10px 20px",
            borderRadius: "15px",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            marginBottom: "15px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            <img
              src="/mistral-logo.png"
              alt="Mistral Logo"
              style={{ width: "36px", height: "36px" }}
            />
            <h1
              style={{
                margin: "0",
                color: "#fff",
                fontSize: "24px",
                fontWeight: "bold",
                fontFamily: "'Press Start 2P', 'Courier New', monospace",
                textShadow:
                  "2px 2px 0px rgba(0,0,0,0.8), 4px 4px 0px rgba(0,0,0,0.3)",
                letterSpacing: "2px",
                imageRendering: "pixelated",
                textRendering: "geometricPrecision",
              }}
            >
              Jump
            </h1>
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#fff",
              fontFamily: "'Press Start 2P', 'Courier New', monospace",
              textShadow:
                "1px 1px 0px rgba(0,0,0,0.8), 2px 2px 0px rgba(0,0,0,0.3)",
              letterSpacing: "1px",
              imageRendering: "pixelated",
              textRendering: "geometricPrecision",
            }}
          >
            Score: {score}
          </div>
        </div>

        {/* Controls Hint */}
        <div
          style={{
            padding: "8px 16px",
            borderRadius: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            fontSize: "12px",
            color: "#fff",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          Use ← → arrow keys to move
        </div>
      </div>

      {/* Game Over Overlay */}
      {gameOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "auto",
            zIndex: 20,
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "30px",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "15px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              maxWidth: "350px",
              width: "min(350px, calc(100vw - 40px))",
            }}
          >
            {/* Game Over Title */}
            <h2
              style={{
                margin: "0 0 20px 0",
                color: "#ff4444",
                fontSize: "36px",
                fontWeight: "bold",
                fontFamily: "'Press Start 2P', 'Courier New', monospace",
                textShadow:
                  "3px 3px 0px rgba(0,0,0,0.8), 6px 6px 0px rgba(0,0,0,0.3)",
                letterSpacing: "2px",
                imageRendering: "pixelated",
                textRendering: "geometricPrecision",
                textTransform: "uppercase",
              }}
            >
              Game Over
            </h2>

            {/* Final Score */}
            <div
              style={{
                margin: "0 0 25px 0",
                padding: "12px 20px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "10px",
                fontSize: "16px",
                color: "#fff",
                fontFamily: "'Press Start 2P', 'Courier New', monospace",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                letterSpacing: "1px",
                imageRendering: "pixelated",
                textRendering: "geometricPrecision",
              }}
            >
              Final Score: {score}
            </div>

            {/* Play Again Button */}
            <button
              onClick={onRestart}
              style={{
                padding: "12px 24px",
                fontSize: "14px",
                fontFamily: "'Press Start 2P', 'Courier New', monospace",
                backgroundColor: "rgba(76, 175, 80, 0.8)",
                backdropFilter: "blur(10px)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                transition: "all 0.2s ease",
                textTransform: "uppercase",
                letterSpacing: "1px",
                imageRendering: "pixelated",
                textRendering: "geometricPrecision",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(69, 160, 73, 0.9)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(76, 175, 80, 0.8)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
              }}
            >
              Play Again
            </button>

            {/* Additional game-like decoration */}
            <div
              style={{
                marginTop: "20px",
                fontSize: "10px",
                color: "rgba(255, 255, 255, 0.7)",
                fontFamily: "'Press Start 2P', 'Courier New', monospace",
                letterSpacing: "1px",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              Press ENTER or SPACE to continue...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
