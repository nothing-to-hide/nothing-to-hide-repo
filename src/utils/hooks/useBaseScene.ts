import { useCallback, useState } from "react";
import {
  GAME_STORAGE_KEY,
  NEXT_SCENE_MAP,
  NEXT_STEP_MAP,
  SCENE,
  SCENE_STEP,
} from "../../constants/Game";
import { IGameState } from "../../context/GameStateContext";
import { fadeScene } from "../Scene";
import { ACHIEVEMENT_KEY } from "../../constants/Achievements";
import { ACHIEVEMENT_SCENES } from "../../app/App";

export const useBaseScene = (
  gameState: IGameState,
  updateGameState: (state: Partial<IGameState>) => void,
  prologueLength: number,
  achievement: ACHIEVEMENT_KEY
) => {
  const [currentStep, setCurrentStep] = useState(gameState.step);
  const [prologueIndex, setPrologueIndex] = useState(0);

  const updateCurrentStep = (newStep: SCENE_STEP) => {
    setCurrentStep(newStep);
    window.localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify({ ...gameState, step: newStep }));
  };

  const proceedPrologue = useCallback(() => {
    if (prologueIndex < prologueLength - 1) {
      setPrologueIndex((prev) => prev + 1);
    } else {
      updateCurrentStep(SCENE_STEP.INTRO);
    }
  }, [prologueIndex, prologueLength]);

  const proceedStep = useCallback(() => {
    const next = NEXT_STEP_MAP[currentStep as SCENE_STEP];
    if (next === SCENE_STEP.PROLOGUE) return; // Do nothing
    updateCurrentStep(next);
  }, [currentStep]);

  const proceedScene = useCallback(() => {
    if (gameState?.replayQueue?.length > 0) {
      // Remove the current module (identified by this scene's achievement)
      const updatedQueue = gameState.replayQueue.filter(key => key !== achievement);
      // Determine next scene (based on next achievement in queue)
      const nextAchievementKey = updatedQueue[0];
      const nextScene = nextAchievementKey
        ? ACHIEVEMENT_SCENES[nextAchievementKey].sceneId
        : SCENE.END_SCREEN;
      // Transition to next replay scene (or end screen)
      fadeScene(() => {
        updateGameState({ replayQueue: updatedQueue, scene: nextScene, step: SCENE_STEP.PROLOGUE });
      });
      return;
    } else {
      // Normal story progression
      const nextScene = NEXT_SCENE_MAP[gameState.scene] ?? SCENE.START_SCREEN;
      fadeScene(() => updateGameState({ scene: nextScene, step: SCENE_STEP.PROLOGUE }));
    }
  }, [gameState.scene, gameState.replayQueue, gameState.unlockedAchievements, updateGameState]);

  return {
    currentStep,
    prologueIndex,
    proceedPrologue,
    proceedStep,
    proceedScene,
  };
};
