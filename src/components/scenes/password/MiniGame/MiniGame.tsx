import { useTranslation } from "../../../../utils/hooks/useTranslation";
import { useGameState } from "../../../../context/GameStateContext";
import { useMiniGame } from "./logic/useMiniGame";
import { PASSWORD_GAME } from "../../../../constants/MiniGames/password";
import { MINI_GAME_STATE } from "../../../../constants/Game";
import { useRef } from "react";
import { LoadingSpinner } from "../../../common/Controls/Loading/LoadingSpinner";
import { PasswordGame } from "./components/PasswordGame";
import { Tutorial } from "../../../../types/game/MiniGame";
import { MiniGameTutorial } from "../../../common/MiniGame/Tutorial";
import { useAssetPreloader } from "../../../../utils/hooks/useAssetPreloader";
import { MiniGameIntroModal } from "../../../common/MiniGame/IntroModal";
import { MiniGameFinishModal } from "../../../common/MiniGame/FinishModal";

type PasswordMiniGameProps = {
  onComplete: () => void;
};

export const PasswordMiniGame = ({ onComplete }: PasswordMiniGameProps) => {
  const {
    gameState: { playerName },
  } = useGameState();
  const { localize } = useTranslation();

  const { isLoading } = useAssetPreloader(PASSWORD_GAME.images, PASSWORD_GAME.sounds);
  const passwordContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    fallingWords,
    score,
    gameState,
    sawBladeRef,
    handleIntroDone,
    handleStart,
    handleRestart,
    handleFinishGame,
    handleGameCompleted,
    getEarnedPoints,
  } = useMiniGame(playerName, passwordContainerRef, onComplete);

  const tutorial: Tutorial[] = PASSWORD_GAME.images.tutorial.map((image, i) => ({
    image,
    title: localize.scenes.password.miniGame.tutorial?.[i]?.title,
    message: localize.scenes.password.miniGame.tutorial?.[i]?.message,
  }));

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="passwordGame-container" tabIndex={0}>
      <PasswordGame
        passwordContainerRef={passwordContainerRef}
        sawBladeRef={sawBladeRef}
        gameState={gameState}
        fallingWords={fallingWords}
        score={score}
        handleGameCompleted={handleGameCompleted}
      />
      {/* Intro modal shown before game starts */}
      <MiniGameIntroModal
        open={gameState == MINI_GAME_STATE.INTRO}
        localize={localize}
        startGame={handleIntroDone}
        title={localize.scenes.password.miniGame.title}
        description={localize.scenes.password.miniGame.description}
        hint={localize.scenes.password.miniGame.hint}
      />
      {/* Tutorial modal shown after introduction  */}
      <MiniGameTutorial
        localize={localize}
        open={gameState == MINI_GAME_STATE.TUTORIAL}
        onComplete={handleStart}
        tutorial={tutorial}
      />
      <MiniGameFinishModal
        earnedPoints={getEarnedPoints()}
        open={gameState == MINI_GAME_STATE.COMPLETED}
        localize={localize}
        onComplete={handleFinishGame}
        onRestartGame={handleRestart}
        maxPossiblePoints={PASSWORD_GAME.config.gameMaxPoints}
      />
    </div>
  );
};
