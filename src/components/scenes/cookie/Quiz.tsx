import { useTranslation } from "../../../utils/hooks/useTranslation";
import { ACHIEVEMENTS } from "../../../constants/Achievements";
import { StoryQuiz } from "../../../types/game/Story";
import { SceneQuiz } from "../../common/BaseScene/SceneQuiz";

type CookieQuizProps = { onComplete: () => void };

export const CookieQuiz = ({ onComplete }: CookieQuizProps) => {
  const { localize } = useTranslation();
  const quizArray = localize.scenes.cookie.quiz as StoryQuiz[];

  return (
    <SceneQuiz onComplete={onComplete} quizArray={quizArray} achievement={ACHIEVEMENTS.cookie} />
  );
};
