import { useEffect, useRef, useState } from "react";
import { ARROW_KEYS } from "../../../../../constants/Game";

const SAW_BLADE_SPEED = 20; // Speed of the saw blade in pixels per frame
const LEFT_MOVEMENT_KEY = "a";
const RIGHT_MOVEMENT_KEY = "d";

export const useSawBlade = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  sawBladeRef: React.RefObject<HTMLDivElement | null>,
) => {
  const [xPos, setXPos] = useState(0);

  // Tracks whether left/right keys are currently pressed
  const keysPressed = useRef({ left: false, right: false });

  // Initialize saw position to center within container and update on window resize
  useEffect(() => {
    const updatePosition = () => {
      if (containerRef.current && sawBladeRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const sawWidth = sawBladeRef.current.clientWidth;
        const maxX = containerWidth - sawWidth;
        setXPos(maxX / 2); // Start roughly centered
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [containerRef, sawBladeRef]);

  // Handle mouse and touch movement to update saw position
  useEffect(() => {
    const clampX = (x: number) => {
      if (!containerRef.current || !sawBladeRef.current) return 0;
      const maxX = containerRef.current.clientWidth - sawBladeRef.current.clientWidth;
      return Math.min(Math.max(0, x), maxX);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !sawBladeRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const sawWidth = sawBladeRef.current.clientWidth;
      const x = e.clientX - rect.left - sawWidth / 2;
      setXPos(clampX(x));
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || !sawBladeRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const sawWidth = sawBladeRef.current.clientWidth;
      const x = e.touches[0].clientX - rect.left - sawWidth / 2;
      setXPos(clampX(x));
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [containerRef, sawBladeRef]);

  // Keyboard handling for smooth continuous movement using requestAnimationFrame
  useEffect(() => {
    if (!containerRef.current || !sawBladeRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const sawWidth = sawBladeRef.current.clientWidth;
    const maxX = containerWidth - sawWidth;

    let animationFrameId: number;

    const moveSaw = () => {
      setXPos((prevX) => {
        let newX = prevX;
        if (keysPressed.current.left) newX = Math.max(0, prevX - SAW_BLADE_SPEED);
        if (keysPressed.current.right) newX = Math.min(maxX, prevX + SAW_BLADE_SPEED);
        return newX;
      });
      animationFrameId = requestAnimationFrame(moveSaw);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === ARROW_KEYS.LEFT || e.key.toLowerCase() === LEFT_MOVEMENT_KEY) keysPressed.current.left = true;
      if (e.key === ARROW_KEYS.RIGHT || e.key.toLowerCase() === RIGHT_MOVEMENT_KEY) keysPressed.current.right = true;
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === ARROW_KEYS.LEFT || e.key.toLowerCase() === LEFT_MOVEMENT_KEY) keysPressed.current.left = false;
      if (e.key === ARROW_KEYS.RIGHT || e.key.toLowerCase() === RIGHT_MOVEMENT_KEY) keysPressed.current.right = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    animationFrameId = requestAnimationFrame(moveSaw);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [containerRef, sawBladeRef]);

  // Apply the current x position to the saw blade’s CSS style
  useEffect(() => {
    if (sawBladeRef.current) {
      sawBladeRef.current.style.left = `${xPos}px`;
    }
  }, [xPos, sawBladeRef]);

  return {
    xPos,
  };
};
