import { LoadingSpinner } from "../../../common/Controls/Loading/LoadingSpinner";
import { useAssetPreloader } from "../../../../utils/hooks/useAssetPreloader";
import { PHOTOS_GAME } from "../../../../constants/MiniGames/photos";
import { useTranslation } from "../../../../utils/hooks/useTranslation";
import { MINI_GAME_STATE } from "../../../../constants/Game";
import { ToPostOrNotGame } from "./components/ToPostOrNotGame";
import { useMiniGame } from "./logic/useMiniGame";
import { useMemo } from "react";
import { getRandomElements } from "../../../../utils/Array";
import { MiniGameIntroModal } from "../../../common/MiniGame/IntroModal";
import { MiniGameFinishModal } from "../../../common/MiniGame/FinishModal";

type PhotosMiniGameProps = {
  onComplete: () => void;
};

export const PhotosMiniGame = ({ onComplete }: PhotosMiniGameProps) => {
  const { localize } = useTranslation();
  const { isLoading } = useAssetPreloader(PHOTOS_GAME.images, PHOTOS_GAME.sounds);
  // const [score, setScore] = useState(0);

  const images = useMemo(() => {
    const keys = Object.keys(PHOTOS_GAME.images) as Array<keyof typeof PHOTOS_GAME.images>;

    return keys.map((key) => ({
      src: PHOTOS_GAME.images[key],
      canPost: PHOTOS_GAME.imageFeedback[key].canPost,
    }));
  }, []);

  const shuffledImages = useMemo(
    () => getRandomElements(images, PHOTOS_GAME.config.numberOfImages),
    [images],
  );

  const {
    score,
    currentImage,
    feedback,
    isCorrect,
    handleChoice,
    nextPicture,
    gameState,
    handleIntroDone,
    handleFinishGame,
    handleRestartGame,
    getFinalMessageId,
    getEarnedPoints,
  } = useMiniGame(shuffledImages, onComplete);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {/* Intro */}
      <MiniGameIntroModal
        open={gameState === MINI_GAME_STATE.INTRO}
        localize={localize}
        startGame={handleIntroDone}
        title={localize.scenes.photos.miniGame.title}
        description={localize.scenes.photos.miniGame.description}
      />

      {/* Game */}
      {gameState === MINI_GAME_STATE.PLAYING && (
        <div className="photosGame-container">
          <ToPostOrNotGame
            currentImage={currentImage}
            feedback={feedback}
            isCorrect={isCorrect}
            handleChoice={handleChoice}
            nextPicture={nextPicture}
          />
        </div>
      )}

      {/* Finish */}
      <MiniGameFinishModal
        open={gameState === MINI_GAME_STATE.COMPLETED}
        localize={localize}
        onComplete={handleFinishGame}
        onRestartGame={handleRestartGame}
        feedback={localize.scenes.photos.miniGame[getFinalMessageId(score)]}
        earnedPoints={getEarnedPoints()}
        maxPossiblePoints={PHOTOS_GAME.config.maxPointsToEarn}
      />
    </div>
  );
};
