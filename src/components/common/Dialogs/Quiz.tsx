import { StoryQuiz } from "../../../types/game/Story";
import { Modal } from "../Controls/Modal/Modal";
import { useTranslation } from "../../../utils/hooks/useTranslation";
import { QUIZ_INTRODUCTION_TIME, useQuiz } from "../../../utils/hooks/useQuiz";
import "./quiz.css";
import { IMAGES } from "../../../constants/Images";
import { useGameState } from "../../../context/GameStateContext";
import Timebar from "../Controls/Timebar/Timebar";
import { Achievement } from "../../../types/game/Achievements";
import { Button } from "../Controls/Button/Button";

type QuizProps = {
  quiz: StoryQuiz | StoryQuiz[];
  setAchievementUnlocked?: (unlocked: boolean) => void;
  achievement?: Achievement;
  onComplete: () => void;
};

/**
 * Quiz component for rendering a quiz question with multiple answers.
 *
 * @component
 * @param {StoryQuiz | StoryQuiz[]} quiz - A single quiz object or an array of quiz objects.
 * @param {void} [onComplete] - Optional callback triggered when the "next" button is clicked.
 *
 * @description
 * This component displays a quiz question with multiple answers. It supports:
 * - Timed quizzes with a progress bar.
 * - Single or multiple correct answers.
 * - Answer selection and validation.
 * - Displaying detailed answer descriptions after the quiz is resolved.
 * - Scoring based on correct and incorrect answers.
 */
export function Quiz({ quiz, setAchievementUnlocked, achievement, onComplete }: QuizProps) {
  const quizzes = Array.isArray(quiz) ? quiz : [quiz];
  const { localize } = useTranslation();
  const { gameState } = useGameState();

  const {
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
  } = useQuiz({ quizzes, setAchievementUnlocked, achievement, onComplete });

  return (
    <div className="quiz-container">
      {!hasStarted ? (
        <Modal
          open={!hasStarted}
          onClose={handleStart}
          title={localize.commonGame.quizSetup.title}
          autoClose={QUIZ_INTRODUCTION_TIME}
          content={
            <div className="animated-content">
              <h2>
                {localize.commonGame.quizSetup.getReady} {gameState.playerName}
                {"?"}
              </h2>
              <h3>{localize.commonGame.quizSetup.startSoon}</h3>
            </div>
          }
        />
      ) : (
        <div className="quiz-content">
          {/* Display the current quiz question */}
          <div className="quiz-question">{currentQuiz.question}</div>

          {/* Display the answers */}
          <div className="quiz-answers">
            {currentQuiz.answers.map((answer, i) => (
              <div
                key={i}
                className={`quiz-answerBox ${getAnswerClassName(i)}`}
                onClick={() => handleAnswerClick(i)}
              >
                {answer.text}
                {state.isQuizResolved && (
                  <div className={"quiz-answer-description"}>{answer.description}</div>
                )}
              </div>
            ))}
          </div>

          {/* Timer progress bar (if there is a time limit) */}
          {hasTimeLimit && currentQuiz.timeLimit != undefined && !state.isQuizResolved && (
            <Timebar timeMs={currentQuiz.timeLimit * 1000} onTimeOver={() => null} />
          )}

          {/* Button container in quiz footer */}
          <div className="quiz-buttons">
            {state.isQuizResolved && (
              <>
                <div className="quiz-score-display">{getScoreDisplay()}</div>
                <img width={50} height={50} alt="score" src={IMAGES.common.trophyIcon} />
              </>
            )}
            <Button
              label={localize.general.common.proceed}
              className={
                state.selectedAnswerIndices.length > 0 || state.isQuizResolved
                  ? "quiz-button-active"
                  : "quiz-button-passive"
              }
              onClick={
                state.selectedAnswerIndices.length > 0 || state.isQuizResolved
                  ? state.isQuizResolved
                    ? handleNext
                    : handleQuizResolution
                  : () => {}
              }
            ></Button>
          </div>
        </div>
      )}
    </div>
  );
}
