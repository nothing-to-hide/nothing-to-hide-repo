import { JSX } from "react";
import { useGameState } from "../../../context/GameStateContext";
import "./baseScene.css";
import { StoryElement } from "../../../types/game/Story";
import { Dialog } from "../Dialogs/Dialog";
import { Quiz } from "../Dialogs/Quiz";
import { SCENE_STEP } from "../../../constants/Game";
import { useBaseScene } from "../../../utils/hooks/useBaseScene";
import { useLandscapeFormatCheck } from "../../../utils/hooks/useLandscapeFormatCheck";
import LandscapeFormatEnforcer from "./LandscapeFormatEnforcer";
import { ACHIEVEMENT_KEY } from "../../../constants/Achievements";

type BaseSceneProps = {
  achievement: ACHIEVEMENT_KEY;
  backgroundImagePath: string;
  prologueElements?: StoryElement[];
  intro: (props: { onComplete: () => void }) => JSX.Element;
  miniGame: (props: { onComplete: () => void }) => JSX.Element;
  quiz: (props: { onComplete: () => void }) => JSX.Element;
};

export const BaseScene = (props: BaseSceneProps) => {
  const { achievement, backgroundImagePath, prologueElements = [], intro, miniGame, quiz } = props;

  const { gameState, updateGameState } = useGameState();
  const { isLandscapeFormat } = useLandscapeFormatCheck();

  const { currentStep, prologueIndex, proceedPrologue, proceedStep, proceedScene } = useBaseScene(
    gameState,
    updateGameState,
    prologueElements.length,
    achievement
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case SCENE_STEP.INTRO:
        return intro({ onComplete: proceedStep });
      case SCENE_STEP.MINI_GAME:
        return miniGame({ onComplete: proceedStep });
      case SCENE_STEP.QUIZ:
        return quiz({ onComplete: proceedScene });
      default:
        // if the current step is not implemented in this scene, proceed step;
        proceedStep();
        return null;
    }
  };

  return (
    <div className="scene-container">
      <img className="scene-background-image" src={backgroundImagePath} />

      {!isLandscapeFormat ? (
        <LandscapeFormatEnforcer />
      ) : currentStep === SCENE_STEP.PROLOGUE && prologueElements.length > 0 ? (
        <div>
          {prologueElements[prologueIndex].type === "dialog" && (
            <Dialog element={prologueElements[prologueIndex]} onClick={proceedPrologue} />
          )}
          {prologueElements[prologueIndex].type === "quiz" && (
            <Quiz quiz={prologueElements[prologueIndex]} onComplete={proceedPrologue} />
          )}
        </div>
      ) : (
        <div>{renderCurrentStep()}</div>
      )}
    </div>
  );
};
