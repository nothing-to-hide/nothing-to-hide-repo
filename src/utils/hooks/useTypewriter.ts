import { useState, useEffect } from "react";

/**
 * Custom hook that simulates a typewriter effect for a given text.
 *
 * @param text - The text to be displayed with the typewriter effect.
 * @param speed - The typing speed in milliseconds (default is 50ms).
 * @returns The progressively typed text as a string.
 *
 * @example
 * const typedText = useTypewriter("Hello, world!", 100);
 * console.log(typedText); // Displays "H", then "He", then "Hel", etc., over time.
 */
const DEFAULT_TYPEWRITER_SPEED_MS = 50;

export const useTypewriter = (text: string, speed = DEFAULT_TYPEWRITER_SPEED_MS) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    setDisplayText(""); // Reset whenever text changes
    let i = 0;

    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return displayText;
};
