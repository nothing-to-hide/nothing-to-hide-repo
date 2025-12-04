import { useMemo, useState } from "react";
import { Quiz } from "../../common/Dialogs/Quiz";
import { StoryQuiz } from "../../../types/game/Story";
import { AchievementUnlocked } from "../../common/Achievements/AchievementUnlocked";
import { getRandomElements } from "../../../utils/Array";
import { Achievement } from "../../../types/game/Achievements";

type SceneQuizProps = {
  onComplete: () => void;
  quizArray: StoryQuiz[];
  achievement: Achievement;
};

export const SceneQuiz = ({ onComplete, quizArray, achievement }: SceneQuizProps) => {
  const [quizFinished, setQuizFinished] = useState(false);
  const [achievementUnlocked, setAchievementUnlocked] = useState(false);

  const randomQuizzes = useMemo(() => getRandomElements(quizArray), [quizArray]);

  const handleQuizDone = () => setQuizFinished(true);

  if (quizFinished) {
    return (
      <AchievementUnlocked
        achievement={achievement}
        onComplete={onComplete}
        unlocked={achievementUnlocked}
      />
    );
  }

  return (
    <Quiz
      quiz={randomQuizzes}
      onComplete={handleQuizDone}
      setAchievementUnlocked={setAchievementUnlocked}
      achievement={achievement}
    />
  );
};
