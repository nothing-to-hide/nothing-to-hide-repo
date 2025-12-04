import { useTranslation } from "../../../utils/hooks/useTranslation";
import { ACHIEVEMENTS } from "../../../constants/Achievements";
import { StoryQuiz } from "../../../types/game/Story";
import { SceneQuiz } from "../../common/BaseScene/SceneQuiz";

type PhishingQuizProps = { onComplete: () => void };

export const PhishingQuiz = ({ onComplete }: PhishingQuizProps) => {
  const { localize } = useTranslation();
  const quizArray = localize.scenes.phishing.quiz as StoryQuiz[];

  return (
    <SceneQuiz onComplete={onComplete} quizArray={quizArray} achievement={ACHIEVEMENTS.phishing} />
  );
};
