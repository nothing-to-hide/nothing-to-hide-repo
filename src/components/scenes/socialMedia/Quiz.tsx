import { useTranslation } from "../../../utils/hooks/useTranslation";
import { ACHIEVEMENTS } from "../../../constants/Achievements";
import { StoryQuiz } from "../../../types/game/Story";
import { SceneQuiz } from "../../common/BaseScene/SceneQuiz";

type SocialMediaQuizProps = { onComplete: () => void };

export const SocialMediaQuiz = ({ onComplete }: SocialMediaQuizProps) => {
  const { localize } = useTranslation();
  const quizArray = localize.scenes.socialMedia.quiz as StoryQuiz[];

  return (
    <SceneQuiz
      onComplete={onComplete}
      quizArray={quizArray}
      achievement={ACHIEVEMENTS.socialMedia}
    />
  );
};
