import { useEffect, useState } from "react";
import { SOUNDS } from "../../constants/Sounds";
import { useGameState } from "../../context/GameStateContext";
import { StoryQuiz } from "../../types/game/Story";
import { AudioManager } from "../managers/AudioManager";
import { Achievement } from "../../types/game/Achievements";

type QuizState = {
  currentQuizIndex: number;
  quizPoints: number;
  selectedAnswerIndices: number[];
  quizTimeLeft: number;
  isQuizResolved: boolean;
};

type UseQuizProps = {
  quizzes: StoryQuiz[];
  setAchievementUnlocked?: (unlocked: boolean) => void;
  achievement?: Achievement;
  onComplete: () => void;
};

const QUIZ_INTERVAL = 1000; // ms
export const QUIZ_INTRODUCTION_TIME = 2500; //ms

export function useQuiz({ quizzes, setAchievementUnlocked, achievement, onComplete }: UseQuizProps) {
  const { gameState, updateGameState } = useGameState();
  const audioManager = AudioManager.getInstance();

  const [hasStarted, setHasStarted] = useState(false);
  const [state, setState] = useState<QuizState>({
    currentQuizIndex: 0,
    quizPoints: 0,
    selectedAnswerIndices: [],
    quizTimeLeft: quizzes[0]?.timeLimit || 0,
    isQuizResolved: false,
  });

  const currentQuiz = quizzes[state.currentQuizIndex];
  const hasTimeLimit = typeof currentQuiz.timeLimit === "number";

  // Timer logic
  useEffect(() => {
    if (!hasStarted || !hasTimeLimit || state.isQuizResolved) return; // Skip if no time limit or quiz is done
    const timer = setInterval(() => {
      setState((prev) => {
        if (prev.quizTimeLeft <= 1) {
          clearInterval(timer);
          handleQuizResolution(); // Manual reveal triggered on timeout
          return { ...prev, quizTimeLeft: 0 };
        }
        return { ...prev, quizTimeLeft: prev.quizTimeLeft - 1 };
      });
    }, QUIZ_INTERVAL);
    return () => clearInterval(timer);
  }, [hasStarted, state.quizTimeLeft, state.isQuizResolved, state.currentQuizIndex]);

  const handleStart = () => {
    audioManager.loop(SOUNDS.quizzes.quiz);
    setHasStarted(true);
  };

  const handleAnswerClick = (index: number) => {
    if (state.isQuizResolved) return; // Prevent clicking if quiz is done
    audioManager.play(SOUNDS.common.click);
    setState((prev) => {
      // Toggle selected state of the answer
      const isSelected = prev.selectedAnswerIndices.includes(index);
      const updated = isSelected
        ? prev.selectedAnswerIndices.filter((i) => i !== index)
        : [...prev.selectedAnswerIndices, index];

      return { ...prev, selectedAnswerIndices: updated };
    });
  };

  const calculatePoints = () => {
    const correct = state.selectedAnswerIndices.filter(
      (i) => currentQuiz.answers[i].isCorrect,
    ).length;
    const incorrect = state.selectedAnswerIndices.filter(
      (i) => !currentQuiz.answers[i].isCorrect,
    ).length;
    return Math.max(0, correct - incorrect);
  };

  // Get the score display string
  const getScoreDisplay = () => {
    const totalCorrect = currentQuiz.answers.filter((a) => a.isCorrect).length;
    const score = calculatePoints();
    return `${score}/${totalCorrect}`;
  };

  // Handle quiz resolution (when time is up or user clicks the button)
  const handleQuizResolution = () => {
    if (state.isQuizResolved) return; // Prevent multiple resolutions
    audioManager.play(SOUNDS.common.click);
    const points = calculatePoints();
    updateGameState({ ...gameState, points: gameState.points + points });
    // Mark quiz as done
    setState((prev) => ({ ...prev, isQuizResolved: true }));
  };

  // Handle moving to the next quiz or completing the quiz set
  const handleNext = () => {
    audioManager.play(SOUNDS.common.click);
    const nextIndex = state.currentQuizIndex + 1;
    const quizPoints = state.quizPoints + calculatePoints();
    if (nextIndex < quizzes.length) {
      const nextQuiz = quizzes[nextIndex];
      setState({
        currentQuizIndex: nextIndex,
        quizPoints,
        selectedAnswerIndices: [],
        quizTimeLeft: nextQuiz.timeLimit || 0,
        isQuizResolved: false,
      });
    } else {
      // Achievement eligibility: at least 50% of the quizzes answered correctly
      const gameStateUpdateProps = { ...gameState }
      if (achievement && setAchievementUnlocked) {
        const isAchievementEligible = quizPoints >= Math.ceil(quizzes.length / 2);
        const unlockedAchievements = [...gameState.unlockedAchievements, ...(isAchievementEligible ? [achievement.key] : [])];
        Object.assign(gameStateUpdateProps, { unlockedAchievements })
        setAchievementUnlocked(isAchievementEligible);
      }
      updateGameState(gameStateUpdateProps);
      onComplete();
    }
  };

  const getAnswerClassName = (index: number) => {
    const isSelected = state.selectedAnswerIndices.includes(index);
    const isResolved = state.isQuizResolved;
    if (!isResolved) return isSelected ? "selected" : "";

    const isCorrect = currentQuiz.answers[index].isCorrect;
    return (isSelected ? "selected-resolved " : "") + (isCorrect ? "correct" : "incorrect");
  };

  return {
    state,
    currentQuiz,
    hasTimeLimit,
    hasStarted,
    handleStart,
    handleAnswerClick,
    handleQuizResolution,
    handleNext,
    getScoreDisplay,
    getAnswerClassName,
  };
}
