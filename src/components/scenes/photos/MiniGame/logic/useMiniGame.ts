import { useState } from "react";
import { MINI_GAME_STATE } from "../../../../../constants/Game";
import { useGameState } from "../../../../../context/GameStateContext";
import { AudioManager } from "../../../../../utils/managers/AudioManager";
import { PHOTOS_GAME } from "../../../../../constants/MiniGames/photos";
import { SOUNDS } from "../../../../../constants/Sounds";

export enum finalMessageId {
  AllCorrect = "allCorrect",
  MinimumReached = "minimumReached",
  Insufficient = "insufficient",
}

export enum FeedbackId {
  ShouldNotPost = "shouldNotPost",
  CouldPost = "couldPost",
}

export const useMiniGame = (
  images: { src: string; canPost: boolean }[],
  onComplete: () => void
) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackId | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameState, setGameState] = useState<MINI_GAME_STATE>(MINI_GAME_STATE.INTRO);
  const { gameState: globalGameState, updateGameState } = useGameState();
  const audioManager = AudioManager.getInstance();
  const currentImage = images[index];

  const nextPicture = () => {
    if (index < images.length - 1) {
      setIndex((prev) => prev + 1);
      setFeedback(null);
      setIsCorrect(null);
    } else {
      handleFinish();
    }
  };

  const handleChoice = (shouldPost: boolean) => {
    const correct = shouldPost === currentImage.canPost;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
      audioManager.play(SOUNDS.common.correctClick);
      nextPicture();
    } else {
      audioManager.play(SOUNDS.common.falseClick);
      if (shouldPost) {
        setFeedback(FeedbackId.ShouldNotPost);
      } else {
        setFeedback(FeedbackId.CouldPost);
      }
    }
  };

  const handleIntroDone = () => {
    setGameState(MINI_GAME_STATE.PLAYING);
    audioManager.loop(PHOTOS_GAME.sounds.theme);
  };

  const handleFinish = () => {
    setGameState(MINI_GAME_STATE.COMPLETED);
  };

  const getEarnedPoints = () => {
    const maxPoints = PHOTOS_GAME.config.maxPointsToEarn;
    const totalPhotos = PHOTOS_GAME.config.numberOfImages;
    // Normalize and scale to 4 points
    return Math.round((score / totalPhotos) * maxPoints);
  }

  const handleFinishGame = () => {
    updateGameState({ points: globalGameState.points + getEarnedPoints() });
    onComplete();
  };

  const handleRestartGame = () => {
    setScore(0);
    setIndex(0);
    setFeedback(null);
    setIsCorrect(null);
    setGameState(MINI_GAME_STATE.PLAYING);
  };

  const getFinalMessageId = (finalScore: number) => {
    const percentage = (finalScore / PHOTOS_GAME.config.numberOfImages) * 100;
    if (percentage === 100) return finalMessageId.AllCorrect;
    if (percentage >= 50) return finalMessageId.MinimumReached;
    return finalMessageId.Insufficient;
  };

  return {
    score,
    currentImage,
    feedback,
    isCorrect,
    handleChoice,
    nextPicture,
    gameState,
    handleIntroDone,
    handleFinishGame,
    handleRestartGame,
    getFinalMessageId,
    getEarnedPoints
  };
};
