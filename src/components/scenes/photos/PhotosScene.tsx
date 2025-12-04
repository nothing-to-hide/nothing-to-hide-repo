import { BaseScene } from "../../common/BaseScene/BaseScene";
import { PhotosIntro } from "./Intro";
import { PhotosMiniGame } from "./MiniGame/MiniGame";
import { PhotosQuiz } from "./Quiz";
import "./PhotosScene.css";
import { IMAGES } from "../../../constants/Images";
import { SCENE } from "../../../constants/Game";
import { LoadingSpinner } from "../../common/Controls/Loading/LoadingSpinner";
import { useGameState } from "../../../context/GameStateContext";
import { SceneProps } from "../../../types/game/Scene";
import { ACHIEVEMENT_KEY } from "../../../constants/Achievements";

export const PhotosScene = ({ initializing }: SceneProps) => {
  const { gameState } = useGameState();

  if (initializing) return <LoadingSpinner />;

  return (
    <BaseScene
      achievement={ACHIEVEMENT_KEY.photo}
      backgroundImagePath={IMAGES.getSectionImage(SCENE.SCENE_4, gameState.avatar)}
      intro={({ onComplete }) => <PhotosIntro onComplete={onComplete} />}
      miniGame={({ onComplete }) => <PhotosMiniGame onComplete={onComplete} />}
      quiz={({ onComplete }) => <PhotosQuiz onComplete={onComplete} />}
    />
  );
};
