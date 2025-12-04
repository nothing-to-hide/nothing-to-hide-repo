import { useTranslation } from "../../../utils/hooks/useTranslation";
import { BaseScene } from "../../common/BaseScene/BaseScene";
import { PasswordIntro } from "./Intro";
import { PasswordMiniGame } from "./MiniGame/MiniGame";
import { PasswordQuiz } from "./Quiz";
import "./PasswordScene.css";
import { MessageType, StoryElement } from "../../../types/game/Story";
import { IMAGES } from "../../../constants/Images";
import { SCENE } from "../../../constants/Game";
import { LoadingSpinner } from "../../common/Controls/Loading/LoadingSpinner";
import { useGameState } from "../../../context/GameStateContext";
import { SceneProps } from "../../../types/game/Scene";
import { ACHIEVEMENT_KEY } from "../../../constants/Achievements";

export const PasswordScene = ({ initializing }: SceneProps) => {
  const { localize } = useTranslation();
  const { gameState } = useGameState();

  const prologueElements: StoryElement[] = [
    {
      type: "dialog",
      messageType: MessageType.NARRATOR,
      text: localize.scenes.password.prologue.classroom,
    },
  ];

  if (initializing) return <LoadingSpinner />;

  return (
    <BaseScene
      achievement={ACHIEVEMENT_KEY.password}
      backgroundImagePath={IMAGES.getSectionImage(SCENE.SCENE_5, gameState.avatar)}
      prologueElements={prologueElements}
      intro={({ onComplete }) => <PasswordIntro onComplete={onComplete} />}
      miniGame={({ onComplete }) => <PasswordMiniGame onComplete={onComplete} />}
      quiz={({ onComplete }) => <PasswordQuiz onComplete={onComplete} />}
    />
  );
};
