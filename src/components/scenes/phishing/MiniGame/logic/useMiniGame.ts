import { useEffect, useRef, useState } from "react";
import { useGameState } from "../../../../../context/GameStateContext";
import { MINI_GAME_STATE } from "../../../../../constants/Game";
import { Bait, PhishingMessage } from "./types";
import { PHISHING_GAME } from "../../../../../constants/MiniGames/phishing";
import { AudioManager } from "../../../../../utils/managers/AudioManager";
import { SOUNDS } from "../../../../../constants/Sounds";

/**
 * Hook that manages the logic for the phishing mini-game.
 */
export function useMiniGame(
  phishingContainerRef: React.RefObject<HTMLDivElement | null>,
  phishingMessages: PhishingMessage[],
  onComplete: () => void
) {
  const audioManager = AudioManager.getInstance();
  const { gameState: globalGameState, updateGameState } = useGameState();
  const [baits, setBaits] = useState<Bait[]>([]);
  const [gameState, setGameState] = useState<MINI_GAME_STATE>(MINI_GAME_STATE.INTRO);
  const [fishHealth, setFishHealth] = useState(PHISHING_GAME.config.fishInitialHealth);

  // Refs for managing difficulty increase
  const baitIntervalRef = useRef(PHISHING_GAME.config.baitInitialInterval);
  const baitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const decayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // References for current state that avoid re-renders
  const baitsRef = useRef(baits);
  const currentMessageIndexRef = useRef(0); // Tracks the next message index
  baitsRef.current = baits;

  // After reading the introduction, proceed to tutorial
  const handleIntroDone = () => {
    setGameState(MINI_GAME_STATE.TUTORIAL);
  };

  // Start the game and loop background audio
  const handleStart = () => {
    audioManager.loop(PHISHING_GAME.sounds.theme);
    setGameState(MINI_GAME_STATE.PLAYING);
  };

  const getEarnedPoints = () => {
    const maxPoints = PHISHING_GAME.config.gameMaxPoints;
    const maxHealth = PHISHING_GAME.config.fishMaxHealth;
    // Normalize and scale to 4 points
    return Math.round((fishHealth / maxHealth) * maxPoints);
  }

  // End the game, optionally playing failure sound if player lost
  const handleGameCompleted = (lost = false) => {
     if (lost) audioManager.play(SOUNDS.common.fail);
    setGameState(MINI_GAME_STATE.COMPLETED);
  }

  const handleFinishGame = () => {
    audioManager.stop();
    updateGameState({ points: globalGameState.points + getEarnedPoints() });
    onComplete()
  };

  const handleRestart = () => {
    setGameState(MINI_GAME_STATE.PLAYING);
    setBaits([]);
    setFishHealth(PHISHING_GAME.config.fishInitialHealth);
  };

  // Called when a bait is eaten (correct or incorrect)
  const handleBaitEaten = (baitId: number) => {
    setBaits((prevBaits) => {
      const currentBait = prevBaits.find((bait) => bait.id === baitId);
      if (!currentBait) return prevBaits;

      // Adjust fish health based on correctness
      let newHealth = currentBait.correctAnswer
        ? Math.min(
          fishHealth + PHISHING_GAME.config.fishHealthUpdate,
          PHISHING_GAME.config.fishMaxHealth,
        )
        : fishHealth - PHISHING_GAME.config.fishHealthUpdate;

      setFishHealth(newHealth);

      // End game if health drops to 0 or below
      if (newHealth <= PHISHING_GAME.config.fishMinHealth) handleGameCompleted(true);

      // Remove the bait that was eaten
      return prevBaits.filter((bait) => bait.id !== baitId);
    });
  };

  // Temporarily pauses a bait's movement during interaction
  const handleBaitPaused = (baitId: number, paused: boolean) => {
    setBaits((prev) => prev.map((bait) => (bait.id === baitId ? { ...bait, paused } : bait)));
  };

  // Updates the bait's answer status after a decision is made.
  const handleBaitAnswered = (baitId: number, correctAnswer: boolean) => {
    setBaits((prev) =>
      prev.map((bait) => (bait.id === baitId ? { ...bait, correctAnswer } : bait)),
    );
  };

  // Moves all baits downward periodically.
  useEffect(() => {
    if (gameState !== MINI_GAME_STATE.PLAYING) return;

    let animationFrameId: number;

    const moveBaits = () => {
      setBaits((prevBaits) =>
        prevBaits.map((bait) => {
          if (bait.paused) return bait;
          const maxY = window.innerHeight / 2; // divide by 2 to get screen center
          const newY =
            bait.yPos < maxY ? bait.yPos + PHISHING_GAME.config.baitDropSpeed : bait.yPos; // Speed at which baits move downwards (pixels per frame)
          return { ...bait, yPos: newY };
        }),
      );
      animationFrameId = requestAnimationFrame(moveBaits);
    };

    animationFrameId = requestAnimationFrame(moveBaits);

    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState]);

  // Spawns new baits based on the phishing message list. Also handles spawn speed decay.
  useEffect(() => {
    if (gameState !== MINI_GAME_STATE.PLAYING) return;

    const spawnBait = () => {
      if (
        phishingContainerRef.current &&
        currentMessageIndexRef.current < phishingMessages.length
      ) {
        const containerWidth = phishingContainerRef.current.offsetWidth;
        let newXPos = Math.floor(Math.random() * containerWidth);
        let attempts = 0;
        const maxAttempts = 100;
        const minBaitSpacingPx = 50;

        // Prevent baits from overlapping too closely
        while (
          baitsRef.current.some((bait) => Math.abs(bait.xPos - newXPos) < minBaitSpacingPx) &&
          attempts < maxAttempts
        ) {
          let found = false;
          for (let x = minBaitSpacingPx; x < containerWidth; x += 10) {
            if (!baitsRef.current.some((bait) => Math.abs(bait.xPos - x) < minBaitSpacingPx)) {
              newXPos = x;
              found = true;
              break;
            }
          }
          if (!found) newXPos = Math.floor(Math.random() * containerWidth);
          attempts++;
        }

        const message = phishingMessages[currentMessageIndexRef.current];
        const newBait: Bait = {
          id: Date.now(),
          xPos: newXPos,
          yPos: 0, // bait starting top Y position
          paused: false,
          message,
        };

        setBaits((prev) => {
          const updated = [...prev, newBait].slice(-PHISHING_GAME.config.baitMaximal); // Limit number of baits
          baitsRef.current = updated;
          return updated;
        });

        currentMessageIndexRef.current += 1;
      }

      // Continue spawning if more messages are available
      if (
        baitsRef.current.length < PHISHING_GAME.config.baitMaximal &&
        currentMessageIndexRef.current < phishingMessages.length
      ) {
        baitTimeoutRef.current = setTimeout(spawnBait, baitIntervalRef.current);
      }
    };

    // Speeds up bait spawn interval over time
    const startDecay = () => {
      decayIntervalRef.current = setInterval(() => {
        // Gradually decrease the spawn interval to increase difficulty,
        // but never go below the configured minimum interval
        baitIntervalRef.current = Math.max(
          PHISHING_GAME.config.baitIntervalMinimum,
          baitIntervalRef.current * PHISHING_GAME.config.decayFactor,
        );
      }, PHISHING_GAME.config.decayInterval);
    };

    spawnBait();
    startDecay();

    return () => {
      if (baitTimeoutRef.current) clearTimeout(baitTimeoutRef.current);
      if (decayIntervalRef.current) clearInterval(decayIntervalRef.current);
    };
  }, [gameState]);

  return {
    baits,
    gameState,
    setBaits,
    handleIntroDone,
    handleStart,
    handleRestart,
    handleFinishGame,
    fishHealth,
    handleBaitEaten,
    handleBaitPaused,
    handleBaitAnswered,
    handleGameCompleted,
    getEarnedPoints
  };
}
