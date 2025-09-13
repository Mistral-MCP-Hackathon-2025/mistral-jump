import { useRef, useEffect } from "react";
import LeChatGif from "/lechat.gif";

export const useImageLoader = () => {
  const playerImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Create image for canvas rendering
    const img = new Image();
    img.src = LeChatGif;
    playerImageRef.current = img;
  }, []);

  return {
    playerImageSrc: LeChatGif, // For img tag src
    playerImage: playerImageRef.current, // For canvas rendering
  };
};
