import { useState } from "react";
import { MessageType, StoryElement } from "../../types/game/Story";
import { useLandscapeFormatCheck } from "../../utils/hooks/useLandscapeFormatCheck";
import LandscapeFormatEnforcer from "../common/BaseScene/LandscapeFormatEnforcer";
import { Dialog } from "../common/Dialogs/Dialog";
import { useGameState } from "../../context/GameStateContext";
import { LoadingSpinner } from "../common/Controls/Loading/LoadingSpinner";
import { IMAGES } from "../../constants/Images";
import { SCENE, SCENE_STEP } from "../../constants/Game";
import "./endScreen.css";
import { useTranslation } from "../../utils/hooks/useTranslation";
import { EndScore } from "./EndScore";
import { ACHIEVEMENT_KEY, ACHIEVEMENTS } from "../../constants/Achievements";
import { PlayAgain } from "./PlayAgain";
import { SceneProps } from "../../types/game/Scene";
import { ACHIEVEMENT_SCENES } from "../../app/App";

export const EndScreen = ({ initializing }: SceneProps) => {
  const { gameState, resetGameState, updateGameState } = useGameState();
  const { localize } = useTranslation();
  const { isLandscapeFormat } = useLandscapeFormatCheck();

  const [storyElementIndex, setStoryElementIndex] = useState(0);

  const allAchievementsUnlocked =
    new Set(gameState.unlockedAchievements).size === Object.keys(ACHIEVEMENTS).length;

  const storyElements: StoryElement[] = [
    {
      type: "dialog",
      messageType: MessageType.SPEECH,
      text: allAchievementsUnlocked
        ? `${localize.commonGame.endScreen.successTitle}\n${localize.commonGame.endScreen.successMessage}`
        : `${localize.commonGame.endScreen.failedTitle}\n${localize.commonGame.endScreen.failedMessage}`,
      avatarUrl: allAchievementsUnlocked
        ? IMAGES.npcAvatars.csProfessor_happy
        : IMAGES.npcAvatars.csProfessor,
    },
    {
      type: "custom",
      component: (
        <EndScore
          allAchievementsUnlocked={allAchievementsUnlocked}
          onNext={() => proceedStoryElement()}
        />
      ),
    },
    {
      type: "dialog",
      messageType: MessageType.NPC_MSG,
      text: allAchievementsUnlocked
        ? localize.commonGame.endScreen.successEndingMessage
        : localize.commonGame.endScreen.failedEndingMessage,
      avatarUrl: IMAGES.getAvatar(gameState.avatar, allAchievementsUnlocked ? "happy" : "sad"),
    },
    {
      type: "custom",
      component: (
        <PlayAgain
          allAchievementsUnlocked={allAchievementsUnlocked}
          onPlayAgain={() => proceedStoryElement()}
          onReplayFailedModules={() => handleReplayFailedModules()}
        />
      ),
    },
  ];

  const currentStoryElement = storyElements[storyElementIndex];

  const proceedStoryElement = () => {
    if (storyElementIndex < storyElements.length - 1) {
      setStoryElementIndex(storyElementIndex + 1);
    } else {
      resetGameState();
    }
  };

  const handleReplayFailedModules = () => {
    // Build replay queue from missing achievements
    const replayQueue = Object.values(ACHIEVEMENT_KEY).filter(
      (key) => !gameState.unlockedAchievements.includes(key),
    );
    // If everything is unlocked, go to EndScreen
    const nextScene =
      replayQueue.length > 0 ? ACHIEVEMENT_SCENES[replayQueue[0]].sceneId : SCENE.END_SCREEN;
    // Update state for replay mode
    updateGameState({
      replayQueue,
      step: SCENE_STEP.INTRO,
      scene: nextScene,
    });
  };

  if (initializing) return <LoadingSpinner />;

  return (
    <div className="endScreen-container">
      <img
        className="endScreen-background-image"
        src={IMAGES.getSectionImage(SCENE.END_SCREEN, gameState.avatar, allAchievementsUnlocked)}
      />

      {!isLandscapeFormat ? (
        <LandscapeFormatEnforcer />
      ) : (
        <>
          {currentStoryElement.type === "dialog" && (
            <Dialog element={currentStoryElement} onClick={proceedStoryElement} />
          )}
          {currentStoryElement.type === "custom" && currentStoryElement.component}
        </>
      )}
    </div>
  );
};
