import { LoadingSpinner } from "../../../common/Controls/Loading/LoadingSpinner";
import { useAssetPreloader } from "../../../../utils/hooks/useAssetPreloader";
import { Tutorial } from "../../../../types/game/MiniGame";
import { useTranslation } from "../../../../utils/hooks/useTranslation";
import { MINI_GAME_STATE } from "../../../../constants/Game";
import { COOKIE_GAME } from "../../../../constants/MiniGames/cookie";
import { CookieGame } from "./components/CookieGame";
import { useCookieGame } from "./logic/useCookieGame";
import { MiniGameTutorial } from "../../../common/MiniGame/Tutorial";
import { useRef } from "react";
import { MiniGameIntroModal } from "../../../common/MiniGame/IntroModal";
import { MiniGameFinishModal } from "../../../common/MiniGame/FinishModal";

type CookieMiniGameProps = {
  onComplete: () => void;
};

export const CookieMiniGame = ({ onComplete }: CookieMiniGameProps) => {
  const { localize } = useTranslation();
  const { isLoading } = useAssetPreloader(COOKIE_GAME.images, COOKIE_GAME.sounds);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    gameState,
    cookies,
    crumbles,
    trails,
    score,
    handleIntroDone,
    handleStart,
    handleFinish,
    handleRestart,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    getEarnedPoints,
    handleGameCompleted,
  } = useCookieGame(
    containerRef,
    localize.scenes.cookie.miniGame.goodCookieTexts,
    localize.scenes.cookie.miniGame.badCookieTexts,
    onComplete,
  );

  const tutorial: Tutorial[] = COOKIE_GAME.images.tutorial.map((image, i) => ({
    image,
    title: localize.scenes.cookie.miniGame.tutorial?.[i]?.title,
    message: localize.scenes.cookie.miniGame.tutorial?.[i]?.message,
  }));

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="cookieGame-container">
        <CookieGame
          duration={COOKIE_GAME.config.gameDuration}
          gameState={gameState}
          onGameCompleted={handleGameCompleted}
          cookies={cookies}
          crumbles={crumbles}
          trails={trails}
          handleIntroDone={handleIntroDone}
          handleRestart={handleRestart}
          handleStart={handleStart}
          score={score}
          gameContainerRef={containerRef}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          handleTouchStart={handleTouchStart}
          handleTouchMove={handleTouchMove}
          handleTouchEnd={handleTouchEnd}
        />
      </div>
      {/* Intro modal shown before game starts */}
      <MiniGameIntroModal
        open={gameState == MINI_GAME_STATE.INTRO}
        localize={localize}
        startGame={handleIntroDone}
        title={localize.scenes.cookie.miniGame.title}
        description={localize.scenes.cookie.miniGame.description}
      />
      {/* Tutorial modal shown after introduction  */}
      <MiniGameTutorial
        localize={localize}
        open={gameState == MINI_GAME_STATE.TUTORIAL}
        onComplete={handleStart}
        tutorial={tutorial}
      />
      {/* Finish Modal shown after game got completed */}
      <MiniGameFinishModal
        open={gameState == MINI_GAME_STATE.COMPLETED}
        localize={localize}
        onComplete={handleFinish}
        onRestartGame={handleRestart}
        earnedPoints={getEarnedPoints()}
        maxPossiblePoints={COOKIE_GAME.config.gameMaxPoints}
      />
    </>
  );
};
