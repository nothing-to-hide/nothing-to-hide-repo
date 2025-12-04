import { BaseScene } from "../../common/BaseScene/BaseScene";
import { CookieIntro } from "./Intro/Intro";
import { CookieMiniGame } from "./MiniGame/MiniGame";
import { CookieQuiz } from "./Quiz";
import "./CookieScene.css";
import { IMAGES } from "../../../constants/Images";
import { SCENE } from "../../../constants/Game";
import { LoadingSpinner } from "../../common/Controls/Loading/LoadingSpinner";
import { useGameState } from "../../../context/GameStateContext";
import { SceneProps } from "../../../types/game/Scene";
import { ACHIEVEMENT_KEY } from "../../../constants/Achievements";

export const CookieScene = ({ initializing }: SceneProps) => {
  const { gameState } = useGameState();

  if (initializing) return <LoadingSpinner />;

  return (
    <BaseScene
      achievement={ACHIEVEMENT_KEY.cookie}
      backgroundImagePath={IMAGES.getSectionImage(SCENE.SCENE_2, gameState.avatar)}
      intro={({ onComplete }) => <CookieIntro onComplete={onComplete} />}
      miniGame={({ onComplete }) => <CookieMiniGame onComplete={onComplete} />}
      quiz={({ onComplete }) => <CookieQuiz onComplete={onComplete} />}
    />
  );
};
