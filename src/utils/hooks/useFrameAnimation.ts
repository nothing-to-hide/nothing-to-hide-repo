import { useEffect, useRef, useState } from "react";

/**
 * Animation hook using requestAnimationFrame for better performance.
 * @param frameCount Number of frames in the sprite.
 * @param intervalMs Duration of each frame.
 * @param isPlaying If false, animation is paused.
 */
export function useFrameAnimation(frameCount: number, intervalMs = 200, isPlaying = true) {
  const [frameIndex, setFrameIndex] = useState(0);
  const frameRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying || frameCount <= 0) return;

    const update = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const delta = time - lastTimeRef.current;

      if (delta >= intervalMs) {
        frameRef.current = (frameRef.current + 1) % frameCount;
        setFrameIndex(frameRef.current);
        lastTimeRef.current = time;
      }

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [frameCount, intervalMs, isPlaying]);

  return frameIndex;
}
