import { useTranslation } from "../../../utils/hooks/useTranslation";
import { BaseScene } from "../../common/BaseScene/BaseScene";
import { PhishingIntro } from "./Intro";
import { PhishingMiniGame } from "./MiniGame/MiniGame";
import "./PhishingScene.css";
import { MessageType, StoryElement } from "../../../types/game/Story";
import { PhishingQuiz } from "./Quiz";
import { IMAGES } from "../../../constants/Images";
import { SCENE } from "../../../constants/Game";
import { LoadingSpinner } from "../../common/Controls/Loading/LoadingSpinner";
import { useGameState } from "../../../context/GameStateContext";
import { SceneProps } from "../../../types/game/Scene";
import { ACHIEVEMENT_KEY } from "../../../constants/Achievements";

export const PhishingScene = ({ initializing }: SceneProps) => {
  const { localize } = useTranslation();
  const { gameState } = useGameState();

  const prologueElements: StoryElement[] = [
    {
      type: "dialog",
      messageType: MessageType.NARRATOR,
      text: localize.scenes.phishing.prologue.bedroom,
    },
  ];

  if (initializing) return <LoadingSpinner />;

  return (
    <BaseScene
      achievement={ACHIEVEMENT_KEY.phishing}
      backgroundImagePath={IMAGES.getSectionImage(SCENE.SCENE_3, gameState.avatar)}
      prologueElements={prologueElements}
      intro={({ onComplete }) => <PhishingIntro onComplete={onComplete} />}
      miniGame={({ onComplete }) => <PhishingMiniGame onComplete={onComplete} />}
      quiz={({ onComplete }) => <PhishingQuiz onComplete={onComplete} />}
    />
  );
};
