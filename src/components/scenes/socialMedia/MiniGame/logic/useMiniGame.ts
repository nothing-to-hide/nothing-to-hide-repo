import { useState } from "react";
import { useGameState } from "../../../../../context/GameStateContext";
import { SOCIAL_MEDIA_GAME } from "../../../../../constants/MiniGames/socialMedia";
import { AudioManager } from "../../../../../utils/managers/AudioManager";
import { MINI_GAME_STATE } from "../../../../../constants/Game";
import { getPreparedObjectSearch, OBJECT_SEARCHES } from "./data";
import { ObjectSearchData, PreparedHiddenObject } from "./types";
import { SOUNDS } from "../../../../../constants/Sounds";
import { ITranslation } from "../../../../../types/translations";

/**
 * Hook that manages the logic for the social media mini-game.
 */
export const useMiniGame = (onComplete: () => void) => {
  const audioManager = AudioManager.getInstance();
  const [gameState, setGameState] = useState(MINI_GAME_STATE.INTRO);
  const { gameState: globalGameState, updateGameState } = useGameState();
  const [gameNumber, setGameNumber] = useState(0); // index of current object search
  const [currentScore, setCurrentScore] = useState(0); // total score across rounds
  const [showResultScreen, setShowResultScreen] = useState(false); // controls end-of-round result UI
  const [foundObjects, setFoundObjects] = useState<PreparedHiddenObject[]>([]); // objects found in current round
  const [ totalObjects, setTotalObjects ] = useState(0);
  const [objectSearchData, setObjectSearchData] = useState<ObjectSearchData>(
    getPreparedObjectSearch(0),
  );

  const handleIntroDone = () => setGameState(MINI_GAME_STATE.TUTORIAL);

  const handleStartGame = () => {
    audioManager.loop(SOCIAL_MEDIA_GAME.sounds.theme);
    setGameState(MINI_GAME_STATE.PLAYING);
  };

  const handleRestart = () => {
    setObjectSearchData(getPreparedObjectSearch(0));
    setGameState(MINI_GAME_STATE.PLAYING);
    setShowResultScreen(false);
    setFoundObjects([]);
    setCurrentScore(0);
    setGameNumber(0);
    setTotalObjects(0);
  }

  const handleFinishGame = () => {
    audioManager.stop();
    updateGameState({ points: globalGameState.points + getEarnedPoints() });
    onComplete();
  };

  const getEarnedPoints = () => {
    const maxPoints = SOCIAL_MEDIA_GAME.config.maximalPointsToEarn;
    const totalObjects = OBJECT_SEARCHES.reduce((sum, obj) => sum + obj.hiddenObjects.length, 0);
    // Normalize and scale to 4 points
    return Math.round((currentScore / totalObjects) * maxPoints);
  }


  // Called when player finds all objects in current round (or gives up)
  const handleObjectSearchDone = (score: number) => {
    setShowResultScreen(true);
    setCurrentScore(currentScore + score);
  };

  // Go to next object search round or finish game
  const handleNextObjectSearch = () => {
    const isLastRound = gameNumber >= OBJECT_SEARCHES.length - 1;
    setTotalObjects(prev => prev + objectSearchData.hiddenObjects.length);
    if (isLastRound) {
      setGameState(MINI_GAME_STATE.COMPLETED);
      return;
    }
    const nextGameNumber = gameNumber + 1;
    setGameNumber(nextGameNumber);
    setFoundObjects([]);
    setShowResultScreen(false);
    setObjectSearchData(getPreparedObjectSearch(nextGameNumber));
  };

  // Called when a hidden object is clicked
  const handleObjectFound = (src: string) => {
    const match = objectSearchData.hiddenObjects.find((o) => o.src === src);
    if (!match) return;

    const updatedFound = [...foundObjects, match as PreparedHiddenObject];
    setFoundObjects(updatedFound);
    audioManager.play(SOUNDS.common.correctClick);

    const allFound = updatedFound.length === objectSearchData.hiddenObjects.length;
    if (allFound) handleObjectSearchDone(updatedFound.length);
  };

  // Called on any global click; plays a generic click sound if it's not a hidden object
  const handleGlobalClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("hidden-object")) {
      AudioManager.getInstance().play(SOUNDS.common.click);
    }
  };

  // Returns a localized string like "You found 3/5 objects"
  const getScoreText = (localize: ITranslation) => {
    const total = objectSearchData.hiddenObjects.length;
    const found = foundObjects.length;
    const progress = found === total ? localize.scenes.socialMedia.miniGame.all : `${found}/${total}`;
    return `${localize.scenes.socialMedia.miniGame.youHave} ${progress} ${localize.scenes.socialMedia.miniGame.objectsFound}`;
  };

  return {
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
    totalObjects,
  };
};
