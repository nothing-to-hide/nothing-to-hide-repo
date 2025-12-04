import { useTranslation } from "../../../utils/hooks/useTranslation";
import { ACHIEVEMENTS } from "../../../constants/Achievements";
import { StoryQuiz } from "../../../types/game/Story";
import { SceneQuiz } from "../../common/BaseScene/SceneQuiz";

type PasswordQuizProps = { onComplete: () => void };

export const PasswordQuiz = ({ onComplete }: PasswordQuizProps) => {
  const { localize } = useTranslation();
  const quizArray = localize.scenes.password.quiz as StoryQuiz[];

  return (
    <SceneQuiz onComplete={onComplete} quizArray={quizArray} achievement={ACHIEVEMENTS.password} />
  );
};
