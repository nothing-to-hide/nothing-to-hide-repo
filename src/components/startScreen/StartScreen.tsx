import { LoadingSpinner } from "../common/Controls/Loading/LoadingSpinner";
import { PlayerSetup } from "./playerSetup/PlayerSetup";
import { useTranslation } from "../../utils/hooks/useTranslation";
import "./startScreen.css";
import { IMAGES } from "../../constants/Images";
import { SCENE, START_STEP } from "../../constants/Game";
import { SettingsDialog } from "../header/Settings";
import { useStartScreen } from "../../utils/hooks/useStartScreen";
import { Introduction } from "./introduction/Introduction";
import { useLandscapeFormatCheck } from "../../utils/hooks/useLandscapeFormatCheck";
import LandscapeFormatEnforcer from "../common/BaseScene/LandscapeFormatEnforcer";
import { useGameState } from "../../context/GameStateContext";
import { SceneProps } from "../../types/game/Scene";

/**
 * StartScreen Component
 *
 * Handles the initial game screen with:
 * 1. A "press start" prompt
 * 2. Player setup (name and avatar selection)
 * 3. Transition to the next game scene
 */
export const StartScreen = ({ initializing }: SceneProps) => {
  const { localize } = useTranslation();
  const { gameState } = useGameState();
  const { step, setupInfo, setSetupInfo, onClick } = useStartScreen();
  const { isLandscapeFormat } = useLandscapeFormatCheck();

  if (initializing) return <LoadingSpinner />;

  return (
    <div
      className="startScreen-container"
      onClick={step === START_STEP.PRESS_START ? onClick : undefined} // Just allow onClick once
    >
      <img
        className="startScreen-background-image"
        src={IMAGES.getSectionImage(SCENE.START_SCREEN, gameState.avatar)}
      />

      {/* Landscape format enforcer */}
      {!isLandscapeFormat ? (
        <LandscapeFormatEnforcer />
      ) : (
        /* Steps container */
        <div className="startScreen-steps">
          {/* Initial "Press Start" prompt */}
          {step === START_STEP.PRESS_START ? (
            <div className="startScreen-text-container">
              <h1 className="glitch-text" title="Nothing to Hide">
                Nothing to Hide
              </h1>
              <p>{localize.commonGame.startScreen.pressStart}</p>
            </div>
          ) : (
            <div className="setup-container">
              <div className="setup-content">
                {/* Player setup form */}
                {step === START_STEP.PLAYER_SETUP && (
                  <PlayerSetup
                    onSetupComplete={onClick}
                    setupInfo={setupInfo}
                    setSetupInfo={setSetupInfo}
                  />
                )}
                {/* Settings form */}
                {step === START_STEP.SETTINGS && (
                  <SettingsDialog
                    open={true}
                    handleClose={onClick}
                    isBlocking={true}
                    buttonLabel={localize.commonGame.playerSetup.continueButton}
                  />
                )}
                {/* Introduction */}
                {step === START_STEP.INTRODUCTION && (
                  <Introduction open={true} onClose={onClick} playerName={setupInfo.playerName} />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
