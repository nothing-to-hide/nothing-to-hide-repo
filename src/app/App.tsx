import { StartScreen } from "../components/startScreen/StartScreen";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { FC, useEffect } from "react";
import { useGameState } from "../context/GameStateContext";
import { ACHIEVEMENT_KEY } from "../constants/Achievements";
import { SceneProps } from "../types/game/Scene";
import { SocialMediaScene } from "../components/scenes/socialMedia/SocialMediaScene";
import { CookieScene } from "../components/scenes/cookie/CookieScene";
import { PhishingScene } from "../components/scenes/phishing/PhishingScene";
import { PhotosScene } from "../components/scenes/photos/PhotosScene";
import { PasswordScene } from "../components/scenes/password/PasswordScene";
import "./App.css";
import { SCENE } from "../constants/Game";
import { SOUNDS } from "../constants/Sounds";
import { AudioManager } from "../utils/managers/AudioManager";
import { IMAGES } from "../constants/Images";
import { useAssetPreloader } from "../utils/hooks/useAssetPreloader";
import { EndScreen } from "../components/endScreen/EndScreen";
import { LoadingSpinner } from "../components/common/Controls/Loading/LoadingSpinner";

// Maps each SCENE enum value to the React component that should be rendered.
// This constant is used during the normal story progression flow.
export const SCENE_COMPONENTS: Record<string, FC<SceneProps>> = {
  [SCENE.START_SCREEN]: StartScreen,
  [SCENE.SCENE_1]: SocialMediaScene,
  [SCENE.SCENE_2]: CookieScene,
  [SCENE.SCENE_3]: PhishingScene,
  [SCENE.SCENE_4]: PhotosScene,
  [SCENE.SCENE_5]: PasswordScene,
  [SCENE.END_SCREEN]: EndScreen,
};

// Maps each achievement key to the scene component that represents it.
// This constant is used for the “replay failed modules” functionality.
export const ACHIEVEMENT_SCENES: Record<string, { component: FC<SceneProps>; sceneId: SCENE }> = {
  [ACHIEVEMENT_KEY.socialMedia]: { component: SocialMediaScene, sceneId: SCENE.SCENE_1 },
  [ACHIEVEMENT_KEY.cookie]: { component: CookieScene, sceneId: SCENE.SCENE_2 },
  [ACHIEVEMENT_KEY.phishing]: { component: PhishingScene, sceneId: SCENE.SCENE_3 },
  [ACHIEVEMENT_KEY.photo]: { component: PhotosScene, sceneId: SCENE.SCENE_4 },
  [ACHIEVEMENT_KEY.password]: { component: PasswordScene, sceneId: SCENE.SCENE_5 },
};

export default function App() {
  const { gameState } = useGameState();
  const { isLoading } = useAssetPreloader(IMAGES, SOUNDS, SOUNDS.scenes.START_SCREEN ?? SOUNDS.scenes?.[gameState.scene]);

  useEffect(() => {
    // Handle background audio based on current scene
    if (!isLoading) {
      const backgroundAudio = SOUNDS.scenes?.[gameState.scene];
      if (backgroundAudio) {
        // Delay audio start slightly to ensure user interaction on iOS
        const timer = setTimeout(() => {
          AudioManager.getInstance().loop(backgroundAudio);
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoading, gameState.scene]);

  const renderScene = () => {
    // Replay mode: Render the scenes whose achievements were not unlocked
    if (gameState?.replayQueue?.length > 0) {
      const nextAchievement = gameState.replayQueue[0];
      // Safety: If the queue is empty or invalid, show the EndScreen instead.
      if (!nextAchievement) return <EndScreen initializing={isLoading} />;
      const replayScene = ACHIEVEMENT_SCENES[nextAchievement];
      if (!replayScene) throw new Error(`No scene mapping found for: ${nextAchievement}`);
      // Scene to render
      const ReplayScene = replayScene.component;
      return <ReplayScene initializing={isLoading} />;
    }
    // Render the regular way
    const Scene = SCENE_COMPONENTS[gameState.scene];
    if (!Scene) throw new Error(`No component mapped for scene: ${gameState.scene}`);
    return <Scene initializing={isLoading} />;
  };

  return (
    <div className="app-container">
      <Header />
      <div className="game-container">{isLoading ? <LoadingSpinner /> : renderScene()}</div>
      <Footer />
    </div>
  );
}
