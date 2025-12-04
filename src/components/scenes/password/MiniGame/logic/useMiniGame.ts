import { AudioManager } from "../../../../../utils/managers/AudioManager";
import { useGameState } from "../../../../../context/GameStateContext";
import { MINI_GAME_STATE } from "../../../../../constants/Game";
import { PASSWORD_GAME } from "../../../../../constants/MiniGames/password";
import React, { useEffect, useRef, useState } from "react";
import { passwords } from "./passwords";
import { FallingPassword } from "./types";
import { SOUNDS } from "../../../../../constants/Sounds";

const APPROX_CHAR_WIDTH = 10;
const APPEND_NAME_PROBABILITY = 0.5; // probability to append player name to a password

export const useMiniGame = (
  playerName: string,
  containerRef: React.RefObject<HTMLDivElement | null>,
  onComplete: () => void
) => {
  const audioManager = AudioManager.getInstance();
  const { gameState: globalGameState, updateGameState } = useGameState();

  const [gameState, setGameState] = useState(MINI_GAME_STATE.INTRO);
  const [fallingWords, setFallingWords] = useState<FallingPassword[]>([]);
  const [score, setScore] = useState(0);

  const scoreRef = useRef(score);
  const sawBladeRef = useRef<HTMLDivElement>(null);
  const spawnInterval = useRef<NodeJS.Timeout | null>(null);
  const animationFrame = useRef<number | null>(null);
  const gameSpeed = useRef(PASSWORD_GAME.config.wordMinSpeed);
  const scoredWordIds = useRef(new Set<number>());

  // Spawn a new falling password at a random horizontal position
  const spawnWord = () => {
    if (!containerRef.current) return;

    let word = passwords[Math.floor(Math.random() * passwords.length)];

    // Occasionally add playerName to invalid passwords for variety
    if (!word.valid && Math.random() > APPEND_NAME_PROBABILITY) {
      word = { ...word, value: word.value + playerName };
    }

    const containerWidth = containerRef.current.clientWidth;
    const approxTextWidth = word.value.length * APPROX_CHAR_WIDTH;
    const x = Math.random() * (containerWidth - approxTextWidth);

    setFallingWords((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        value: word.value,
        valid: word.valid,
        x,
        y: 0,
        speed: PASSWORD_GAME.config.wordBaseSpeed + Math.random() * gameSpeed.current,
        ref: React.createRef(),
      },
    ]);
  };

  // Update positions of falling words and handle collisions
  const updateWords = () => {
    const container = containerRef.current;
    const saw = sawBladeRef.current;
    if (!container || !saw) return;

    const containerRect = container.getBoundingClientRect();
    const sawRect = saw.getBoundingClientRect();

    setFallingWords((prev) =>
      prev
        .map((word) => ({ ...word, y: word.y + word.speed }))
        .filter((word) => {
          const el = word.ref.current;
          if (!el) return true;

          const wordRect = el.getBoundingClientRect();

          const hitsSaw =
            wordRect.bottom >= sawRect.top &&
            wordRect.top <= sawRect.bottom &&
            wordRect.right >= sawRect.left &&
            wordRect.left <= sawRect.right;

          const hitsBottom = wordRect.bottom >= containerRect.bottom;

          if (hitsSaw) {
            if (!scoredWordIds.current.has(word.id)) {
              scoredWordIds.current.add(word.id);
              audioManager.play(word.valid ? SOUNDS.common.falseClick : SOUNDS.common.correctClick);
              setScore((prev) =>
                Math.max(
                  0,
                  prev +
                  (word.valid
                    ? -PASSWORD_GAME.config.scoreUpdate
                    : PASSWORD_GAME.config.scoreUpdate),
                ),
              );
            }
            return false; // Remove word on hit
          }

          if (hitsBottom) return false; // Remove word when reaching bottom

          return true;
        }),
    );
  };

  // Main animation loop
  const gameLoop = () => {
    updateWords();
    animationFrame.current = requestAnimationFrame(gameLoop);
  };

  // After reading the introduction, proceed to tutorial
  const handleIntroDone = () => {
    setGameState(MINI_GAME_STATE.TUTORIAL);
  };

  // Start spawning words and game loop
  const startGame = () => {
    gameSpeed.current = PASSWORD_GAME.config.wordMinSpeed;
    spawnInterval.current = setInterval(() => {
      spawnWord();
      gameSpeed.current = Math.min(
        gameSpeed.current + PASSWORD_GAME.config.wordSpeedIncrease,
        PASSWORD_GAME.config.wordMaxSpeed,
      );
    }, PASSWORD_GAME.config.gameInterval);

    gameLoop();
  };

  // Stop all intervals and animation frames
  const stopGame = () => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    if (spawnInterval.current) clearInterval(spawnInterval.current);
  };

  // Start the game, reset everything
  const handleStart = () => {
    audioManager.loop(PASSWORD_GAME.sounds.theme);
    setScore(0);
    scoredWordIds.current.clear();
    setFallingWords([]);
    setGameState(MINI_GAME_STATE.PLAYING);
    startGame();
  };

  const getEarnedPoints = () => {
    if (score <= 0) return 0; // No negative points
    const maxPoints = PASSWORD_GAME.config.gameMaxPoints;
    const gameSeconds = PASSWORD_GAME.config.gameDuration / 1000;
    const expectedScore = gameSeconds * PASSWORD_GAME.config.targetPointsPerSecond;
    const ratio = score / expectedScore; // ratio of actual score to expected score
    const normalized = maxPoints * (1 - Math.exp(-ratio)); // exponential scaling
    return Math.min(Math.round(normalized), maxPoints); // round and cap at maxPoints
  }

  // Finish the game and update global score
  const handleFinishGame = () => {
    audioManager.stop();
    updateGameState({ points: globalGameState.points + getEarnedPoints() });
    onComplete();
  };

  const handleGameCompleted = () => {
    stopGame();
    setGameState(MINI_GAME_STATE.COMPLETED);
  }

  const handleRestart = () => {
    handleStart();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopGame();
    };
  }, []);

  // Keep scoreRef in sync
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  return {
    gameState,
    fallingWords,
    score,
    sawBladeRef,
    handleIntroDone,
    gameSpeed: gameSpeed.current,
    updateWords,
    handleStart,
    handleFinishGame,
    handleGameCompleted,
    handleRestart,
    getEarnedPoints
  };
};
