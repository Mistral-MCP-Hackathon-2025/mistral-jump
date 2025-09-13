import { useRef, useEffect, useState } from "react";
import LeChatGif from "/lechat.gif";

export const useImageLoader = () => {
  const playerImageRef = useRef<HTMLImageElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Create image for canvas rendering
    const img = new Image();

    img.onload = () => {
      console.log("Player image loaded successfully");
      setImageLoaded(true);
    };

    img.onerror = (error) => {
      console.error("Failed to loagd player image:", error);
      setImageLoaded(false);
    };

    img.src = LeChatGif;
    playerImageRef.current = img;
  }, []);

  return {
    playerImageSrc: LeChatGif, // For img tag src
    playerImage: playerImageRef.current, // For canvas rendering
    imageLoaded, // Whether the image has finished loading
  };
};
