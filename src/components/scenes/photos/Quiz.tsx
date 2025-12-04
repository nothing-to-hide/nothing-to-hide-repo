import { useTranslation } from "../../../utils/hooks/useTranslation";
import { ACHIEVEMENTS } from "../../../constants/Achievements";
import { StoryQuiz } from "../../../types/game/Story";
import { SceneQuiz } from "../../common/BaseScene/SceneQuiz";

type PhotosQuizProps = { onComplete: () => void };

export const PhotosQuiz = ({ onComplete }: PhotosQuizProps) => {
  const { localize } = useTranslation();
  const quizArray = localize.scenes.photos.quiz as StoryQuiz[];

  return (
    <SceneQuiz onComplete={onComplete} quizArray={quizArray} achievement={ACHIEVEMENTS.photo} />
  );
};
