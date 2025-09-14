import { useEffect, useCallback } from "react";

interface IframeMessage {
  type: string;
  payload?: any;
}

interface UseIframeMessagingProps {
  onGameStateChange?: (gameState: { score: number; gameOver: boolean }) => void;
  onGameEvent?: (event: string, data?: any) => void;
}

export const useIframeMessaging = ({
  onGameEvent,
}: UseIframeMessagingProps = {}) => {
  // Send message to parent window
  const sendToParent = useCallback((message: IframeMessage) => {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(
        {
          source: "mistral-jump",
          ...message,
        },
        "*"
      );
    }
  }, []);

  // Listen for messages from parent
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.source === "mistral-jump-parent") {
        const { type, payload } = event.data;

        switch (type) {
          case "resize":
            if (payload?.width && payload?.height) {
              // Handle resize if needed
              onGameEvent?.("resize", payload);
            }
            break;
          case "focus":
            // Handle focus events
            onGameEvent?.("focus", payload);
            break;
          case "blur":
            // Handle blur events
            onGameEvent?.("blur", payload);
            break;
          default:
            onGameEvent?.(type, payload);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onGameEvent]);

  // Notify parent when iframe is ready
  useEffect(() => {
    sendToParent({ type: "ready" });
  }, [sendToParent]);

  // Helper functions to send common game events
  const notifyGameStart = useCallback(() => {
    sendToParent({ type: "game-start" });
  }, [sendToParent]);

  const notifyGameOver = useCallback(
    (score: number) => {
      sendToParent({ type: "game-over", payload: { score } });
    },
    [sendToParent]
  );

  const notifyScoreUpdate = useCallback(
    (score: number) => {
      sendToParent({ type: "score-update", payload: { score } });
    },
    [sendToParent]
  );

  const notifyGameRestart = useCallback(() => {
    sendToParent({ type: "game-restart" });
  }, [sendToParent]);

  return {
    sendToParent,
    notifyGameStart,
    notifyGameOver,
    notifyScoreUpdate,
    notifyGameRestart,
  };
};
