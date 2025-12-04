import { useState } from "react";
import { SCENE, SCENE_STEP, START_STEP } from "../../constants/Game";
import { SetupInfo } from "../../components/startScreen/playerSetup/PlayerSetup";
import { useGameState } from "../../context/GameStateContext";
import { fadeScene } from "../Scene";

export const useStartScreen = () => {
  const { gameState, updateGameState } = useGameState();
  const [step, setStep] = useState<START_STEP>(START_STEP.PRESS_START);
  const [setupInfo, setSetupInfo] = useState<SetupInfo>({
    playerName: gameState.playerName,
    avatar: gameState.avatar,
  });

  const onPressStart = () => setStep(START_STEP.SETTINGS);

  const onSetupComplete = () => setStep(START_STEP.INTRODUCTION);

  const onSettingsComplete = () => setStep(START_STEP.PLAYER_SETUP);

  const onIntroductionComplete = () => {
    fadeScene(() => {
      updateGameState({
        ...gameState,
        scene: SCENE.SCENE_1,
        step: SCENE_STEP.PROLOGUE,
        playerName: setupInfo.playerName,
        avatar: setupInfo.avatar,
      });
    });
  };

  const onClick = () => {
    if (step === START_STEP.PRESS_START) onPressStart();
    if (step === START_STEP.PLAYER_SETUP) onSetupComplete();
    if (step === START_STEP.SETTINGS) onSettingsComplete();
    if (step === START_STEP.INTRODUCTION) onIntroductionComplete();
  };

  return {
    step,
    setupInfo,
    setSetupInfo,
    onClick,
  };
};
