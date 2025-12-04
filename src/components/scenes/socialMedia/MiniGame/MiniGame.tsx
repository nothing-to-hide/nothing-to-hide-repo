import { useTranslation } from "../../../../utils/hooks/useTranslation";
import { ObjectSearchGame } from "./components/ObjectSearch";
import { MiniGameTutorial } from "../../../common/MiniGame/Tutorial";
import { SOCIAL_MEDIA_GAME } from "../../../../constants/MiniGames/socialMedia";
import { Tutorial } from "../../../../types/game/MiniGame";
import { useMiniGame } from "./logic/useMiniGame";
import { MINI_GAME_STATE } from "../../../../constants/Game";
import { LoadingSpinner } from "../../../common/Controls/Loading/LoadingSpinner";
import { useAssetPreloader } from "../../../../utils/hooks/useAssetPreloader";
import { MiniGameIntroModal } from "../../../common/MiniGame/IntroModal";
import { MiniGameFinishModal } from "../../../common/MiniGame/FinishModal";

type SocialMediaMiniGameProps = {
  onComplete: () => void;
};

export const SocialMediaMiniGame = (props: SocialMediaMiniGameProps) => {
  const { onComplete } = props;
  const { localize } = useTranslation();
  const { isLoading } = useAssetPreloader(SOCIAL_MEDIA_GAME.images, SOCIAL_MEDIA_GAME.sounds);

  const tutorial: Tutorial[] = SOCIAL_MEDIA_GAME.images.tutorial.map((image, i) => ({
    image,
    title: localize.scenes.socialMedia.miniGame.tutorial?.[i]?.title,
    message: localize.scenes.socialMedia.miniGame.tutorial?.[i]?.message,
  }));

  // Main game state & logic
  const {
    gameState,
    handleIntroDone,
    handleStartGame,
    handleFinishGame,
    handleRestart,
    showResultScreen,
    objectSearchData,
    foundObjects,
    currentScore,
    handleObjectFound,
    handleObjectSearchDone,
    handleGlobalClick,
    getScoreText,
    handleNextObjectSearch,
    getEarnedPoints,
  } = useMiniGame(onComplete);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="socialMediaGame-container">
        <ObjectSearchGame
          gameState={gameState}
          showResultScreen={showResultScreen}
          objectSearchData={objectSearchData}
          foundObjects={foundObjects}
          currentScore={currentScore}
          handleObjectFound={handleObjectFound}
          handleObjectSearchDone={handleObjectSearchDone}
          handleGlobalClick={handleGlobalClick}
          getScoreText={getScoreText}
          handleNextObjectSearch={handleNextObjectSearch}
        />
        {/* Intro modal shown before game starts */}
        <MiniGameIntroModal
          open={gameState === MINI_GAME_STATE.INTRO}
          startGame={handleIntroDone}
          localize={localize}
          title={localize.scenes.socialMedia.miniGame.title}
          description={localize.scenes.socialMedia.miniGame.description}
        />
        {/* Tutorial modal shown after introduction  */}
        <MiniGameTutorial
          localize={localize}
          open={gameState === MINI_GAME_STATE.TUTORIAL}
          tutorial={tutorial}
          onComplete={handleStartGame}
        />
        {/* Game over modal, shown after game ends */}
        <MiniGameFinishModal
          open={gameState === MINI_GAME_STATE.COMPLETED}
          onComplete={handleFinishGame}
          localize={localize}
          onRestartGame={handleRestart}
          earnedPoints={getEarnedPoints()}
          maxPossiblePoints={SOCIAL_MEDIA_GAME.config.maximalPointsToEarn}
        />
      </div>
    </>
  );
};
