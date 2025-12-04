import { useTranslation } from "../../../utils/hooks/useTranslation";
import { SocialMediaIntro } from "./Intro";
import { SocialMediaMiniGame } from "./MiniGame/MiniGame";
import { SocialMediaQuiz } from "./Quiz";
import { BaseScene } from "../../common/BaseScene/BaseScene";
import "./SocialMediaScene.css";
import { MessageType, StoryElement } from "../../../types/game/Story";
import { getSectionImage, IMAGES } from "../../../constants/Images";
import { SCENE } from "../../../constants/Game";
import { LoadingSpinner } from "../../common/Controls/Loading/LoadingSpinner";
import { useGameState } from "../../../context/GameStateContext";
import { SceneProps } from "../../../types/game/Scene";
import { ACHIEVEMENT_KEY } from "../../../constants/Achievements";

export const SocialMediaScene = ({ initializing }: SceneProps) => {
  const { localize } = useTranslation();
  const { gameState } = useGameState();

  const prologueElements: StoryElement[] = [
    {
      type: "dialog",
      messageType: MessageType.THOUGHT,
      text: localize.scenes.socialMedia.prologue.innerDialog,
      avatarUrl: IMAGES.getAvatar(gameState.avatar),
    },
  ];

  if (initializing) return <LoadingSpinner />;

  return (
    <BaseScene
      achievement={ACHIEVEMENT_KEY.socialMedia}
      backgroundImagePath={getSectionImage(SCENE.SCENE_1,gameState.avatar)}
      prologueElements={prologueElements}
      intro={({ onComplete }) => <SocialMediaIntro onComplete={onComplete} />}
      miniGame={({ onComplete }) => <SocialMediaMiniGame onComplete={onComplete} />}
      quiz={({ onComplete }) => <SocialMediaQuiz onComplete={onComplete} />}
    />
  );
};
