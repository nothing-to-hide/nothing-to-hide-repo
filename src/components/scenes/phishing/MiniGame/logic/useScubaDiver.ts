import { useState, useEffect, useRef } from "react";
import { Coordinates, Direction, DiverAction } from "./types";
import { ARROW_KEYS } from "../../../../../constants/Game";
import { PHISHING_GAME } from "../../../../../constants/MiniGames/phishing";

const MOUSE_MOVEMENT_THRESHOLD = 5; // Min distance in pixels to trigger movement

export const useScubaDiver = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  isActive: boolean,
) => {
  const [coordinates, setCoordinates] = useState<Coordinates>(
    PHISHING_GAME.config.diverStartCoords,
  );
  const [direction, setDirection] = useState<Direction>("right");
  const [action, setAction] = useState<DiverAction>("idle");

  const targetPositionRef = useRef<Coordinates | null>(null);
  const isMouseDownRef = useRef(false);
  const activeKeysRef = useRef<Set<string>>(new Set());

  // === Setup event listeners for arrow keys ===
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (Object.values(ARROW_KEYS).includes(e.key)) {
        e.preventDefault(); // Prevent default scrolling behavior
        activeKeysRef.current.add(e.key);
        setAction("swimming");
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (Object.values(ARROW_KEYS).includes(e.key)) {
        activeKeysRef.current.delete(e.key);
        if (activeKeysRef.current.size === 0) {
          setAction("idle");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isActive, setAction]);

  // === Setup event listeners for mouse/touch ===
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    const container = containerRef.current;

    const getPosition = (clientX: number, clientY: number): Coordinates => {
      const rect = container.getBoundingClientRect();
      return {
        x: clientX - rect.left - PHISHING_GAME.config.driverWidth / 2,
        y: clientY - rect.top - PHISHING_GAME.config.driverHeight / 2,
      };
    };

    const handleStart = (pos: Coordinates) => {
      isMouseDownRef.current = true;
      targetPositionRef.current = pos;
      setAction("swimming");
    };

    const handleEnd = () => {
      isMouseDownRef.current = false;
      setAction("idle");
    };

    const handleMouseDown = (e: MouseEvent) => handleStart(getPosition(e.clientX, e.clientY));
    const handleTouchStart = (e: TouchEvent) =>
      handleStart(getPosition(e.touches[0].clientX, e.touches[0].clientY));

    const handleMouseMove = (e: MouseEvent) => {
      if (isMouseDownRef.current) targetPositionRef.current = getPosition(e.clientX, e.clientY);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isMouseDownRef.current)
        targetPositionRef.current = getPosition(e.touches[0].clientX, e.touches[0].clientY);
    };

    // Register events
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchend", handleEnd);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", handleTouchMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isActive, containerRef]);

  // === Move the diver ===
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - PHISHING_GAME.config.driverWidth;
    const maxY = containerRect.height - PHISHING_GAME.config.driverHeight;

    const interval = setInterval(() => {
      setCoordinates((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        // Arrow keys
        if (activeKeysRef.current.size > 0 && !isMouseDownRef.current) {
          if (activeKeysRef.current.has("ArrowLeft")) newX -= PHISHING_GAME.config.diverSpeed;
          if (activeKeysRef.current.has("ArrowRight")) newX += PHISHING_GAME.config.diverSpeed;
          if (activeKeysRef.current.has("ArrowUp")) newY -= PHISHING_GAME.config.diverSpeed;
          if (activeKeysRef.current.has("ArrowDown")) newY += PHISHING_GAME.config.diverSpeed;

          if (activeKeysRef.current.has("ArrowLeft") || activeKeysRef.current.has("ArrowRight")) {
            setDirection(activeKeysRef.current.has("ArrowRight") ? "right" : "left");
          }
        }

        // Mouse/touch
        if (targetPositionRef.current && isMouseDownRef.current) {
          const { x: tx, y: ty } = targetPositionRef.current;
          const dx = tx - prev.x;
          const dy = ty - prev.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist >= MOUSE_MOVEMENT_THRESHOLD) {
            const vx = (dx / dist) * PHISHING_GAME.config.diverSpeed;
            const vy = (dy / dist) * PHISHING_GAME.config.diverSpeed;
            newX += vx;
            newY += vy;
            setDirection(dx > 0 ? "right" : "left");
          }
        }

        // Limit by container size
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        return { x: newX, y: newY };
      });
    }, PHISHING_GAME.config.diverUpdateIntervalMs);

    return () => clearInterval(interval);
  }, [isActive, containerRef]);

  return { coordinates, direction, action };
};
