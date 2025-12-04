import { useEffect, useRef, useState } from "react";
import { Bait, Coordinates, Direction } from "./types";
import { useFrameAnimation } from "../../../../../utils/hooks/useFrameAnimation";
import { PHISHING_GAME } from "../../../../../constants/MiniGames/phishing";

const START_X_POSITION = 100;
const TARGET_Y_OFFSET = 10;

export function useFish(
  baits: Bait[],
  health: number,
  isActive: boolean,
  onEatBait: (baitId: number) => void,
) {
  const [fishCoordinates, setFishCoordinates] = useState<Coordinates>({
    x: START_X_POSITION,
    y: window.innerHeight / 2,
  });
  const [targetBait, setTargetBait] = useState<Bait | null>(null);
  const [fishDirection, setFishDirection] = useState<Direction>("right");
  const eatenBaits = useRef<Set<number>>(new Set());
  const frameIndex = useFrameAnimation(PHISHING_GAME.images.fishFrames.length);
  const animationFrameId = useRef<number>(null);

  // Targeting logic - find a bait on the same y-level
  useEffect(() => {
    if (!targetBait && isActive) {
      const middleY = window.innerHeight / 2;
      const nextBait = baits.find(
        (bait) =>
          Math.abs(bait.yPos - middleY) < TARGET_Y_OFFSET && !eatenBaits.current.has(bait.id),
      );
      if (nextBait) {
        setTargetBait(nextBait);
        // Set initial direction when targeting new bait
        setFishDirection(nextBait.xPos > START_X_POSITION ? "right" : "left");
      }
    }
  }, [baits, targetBait, isActive]);

  // Movement and bait eating logic
  useEffect(() => {
    if (!targetBait || !isActive) return;

    const moveFish = () => {
      setFishCoordinates((prev) => {
        const targetY = window.innerHeight / 2;
        const dx = targetBait.xPos - prev.x;
        const dy = targetY - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Update direction based on movement
        if (Math.abs(dx) > 0) {
          setFishDirection(dx > 0 ? "right" : "left");
        }

        if (distance < PHISHING_GAME.config.fishEatingDistance) {
          eatenBaits.current.add(targetBait.id);
          onEatBait(targetBait.id);
          setTargetBait(null);
          return prev;
        }

        const vx = (dx / distance) * PHISHING_GAME.config.fishSpeed;
        const vy = (dy / distance) * PHISHING_GAME.config.fishSpeed;

        return {
          x: prev.x + vx,
          y: prev.y + vy,
        };
      });

      animationFrameId.current = requestAnimationFrame(moveFish);
    };

    animationFrameId.current = requestAnimationFrame(moveFish);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [targetBait, isActive, onEatBait]);

  // Health bar color logic
  const getHealthColor = () => {
    const thresholds = PHISHING_GAME.config.fishHealthColorThresholds;
    return thresholds.find(({ min }) => health >= min)?.color || "#000000";
  };

  return {
    frameIndex,
    fishCoordinates,
    fishDirection,
    fishFrame: PHISHING_GAME.images.fishFrames[frameIndex],
    healthColor: getHealthColor(),
  };
}
