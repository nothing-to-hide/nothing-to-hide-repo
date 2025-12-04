import { LoadingSpinner } from "../../../common/Controls/Loading/LoadingSpinner";
import { PHISHING_GAME } from "../../../../constants/MiniGames/phishing";
import { PhishingGame } from "./components/PhishingGame";
import { useMemo, useRef } from "react";
import { MINI_GAME_STATE } from "../../../../constants/Game";
import { useTranslation } from "../../../../utils/hooks/useTranslation";
import { shuffleArray } from "../../../../utils/Array";
import { useMiniGame } from "./logic/useMiniGame";
import { MiniGameTutorial } from "../../../common/MiniGame/Tutorial";
import { Tutorial } from "../../../../types/game/MiniGame";
import { useAssetPreloader } from "../../../../utils/hooks/useAssetPreloader";
import { MiniGameIntroModal } from "../../../common/MiniGame/IntroModal";
import { MiniGameFinishModal } from "../../../common/MiniGame/FinishModal";

type PhishingMiniGameProps = {
  onComplete: () => void;
};

export const PhishingMiniGame = ({ onComplete }: PhishingMiniGameProps) => {
  const { localize } = useTranslation();
  const { isLoading } = useAssetPreloader(PHISHING_GAME.images, PHISHING_GAME.sounds);
  const phishingContainerRef = useRef<HTMLDivElement | null>(null);

  // Randomize order of phishing messages
  const phishingMessages = localize.scenes.phishing.miniGame.phishingMessages;
  const shuffledPhishingMessages = useMemo(
    () => shuffleArray(phishingMessages),
    [phishingMessages],
  );

  const tutorial: Tutorial[] = PHISHING_GAME.images.tutorial.map((image, i) => ({
    image,
    title: localize.scenes.phishing.miniGame.tutorial?.[i]?.title,
    message: localize.scenes.phishing.miniGame.tutorial?.[i]?.message,
  }));

  // Main game state & logic
  const {
    baits,
    gameState,
    handleIntroDone,
    handleStart,
    handleRestart,
    fishHealth,
    handleBaitEaten,
    handleBaitPaused,
    handleBaitAnswered,
    handleGameCompleted,
    getEarnedPoints,
  } = useMiniGame(phishingContainerRef, shuffledPhishingMessages, onComplete);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="phishingGame-container" ref={phishingContainerRef}>
      <PhishingGame
        phishingContainerRef={phishingContainerRef}
        gameState={gameState}
        baits={baits}
        handleBaitEaten={handleBaitEaten}
        handleBaitPaused={handleBaitPaused}
        handleBaitAnswered={handleBaitAnswered}
        fishHealth={fishHealth}
        duration={PHISHING_GAME.config.gameDuration}
        handleGameCompleted={handleGameCompleted}
      />
      {/* Intro modal shown before game starts */}
      <MiniGameIntroModal
        open={gameState === MINI_GAME_STATE.INTRO}
        startGame={handleIntroDone}
        localize={localize}
        title={localize.scenes.phishing.miniGame.title}
        description={localize.scenes.phishing.miniGame.description}
        hint={localize.scenes.phishing.miniGame.hint}
      />
      {/* Tutorial modal shown after introduction  */}
      <MiniGameTutorial
        localize={localize}
        open={gameState === MINI_GAME_STATE.TUTORIAL}
        onComplete={handleStart}
        tutorial={tutorial}
      />

      {/* Game over modal, shown after game ends */}
      <MiniGameFinishModal
        open={gameState === MINI_GAME_STATE.COMPLETED}
        onComplete={onComplete}
        localize={localize}
        earnedPoints={getEarnedPoints()}
        feedback={
          fishHealth <= PHISHING_GAME.config.fishMinHealth
            ? localize.scenes.phishing.miniGame.failure
            : localize.scenes.phishing.miniGame.success
        }
        onRestartGame={handleRestart}
        maxPossiblePoints={PHISHING_GAME.config.gameMaxPoints}
      />
    </div>
  );
};
