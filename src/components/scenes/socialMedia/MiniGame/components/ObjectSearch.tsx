import { HiddenObject } from "./HiddenObject";
import Timebar from "../../../../common/Controls/Timebar/Timebar";
import { Modal } from "../../../../common/Controls/Modal/Modal";
import { useTranslation } from "../../../../../utils/hooks/useTranslation";
import { Button } from "../../../../common/Controls/Button/Button";
import { MINI_GAME_STATE } from "../../../../../constants/Game";
import { ObjectSearchData, PreparedHiddenObject } from "../logic/types";
import { ITranslation } from "../../../../../types/translations";

export type ObjectSearchGameProps = {
  gameState: MINI_GAME_STATE;
  showResultScreen: boolean;
  objectSearchData: ObjectSearchData;
  foundObjects: PreparedHiddenObject[];
  currentScore: number;
  handleObjectFound: (src: string) => void;
  handleObjectSearchDone: (score: number) => void;
  handleGlobalClick: (e: React.MouseEvent) => void;
  getScoreText: (localize: ITranslation) => string;
  handleNextObjectSearch: () => void;
};

export const ObjectSearchGame = (props: ObjectSearchGameProps) => {
  const {
    gameState,
    showResultScreen,
    objectSearchData,
    foundObjects,
    handleObjectFound,
    handleObjectSearchDone,
    handleGlobalClick,
    getScoreText,
    handleNextObjectSearch,
  } = props;
  const { localize } = useTranslation();

  const totalObjects = objectSearchData.hiddenObjects.length;
  const foundCount = foundObjects.length;

  return (
    <>
      {/* Main game area */}
      <div className="objectsearch" onClick={handleGlobalClick}>
        <img className="objectsearch-background" src={objectSearchData.backgroundImage} />
        <div className="objectsearch-score">{`${foundCount}/${totalObjects}`}</div>

        {objectSearchData.hiddenObjects.map((objectData) => (
          <HiddenObject
            key={objectData.src}
            hiddenObject={objectData as PreparedHiddenObject}
            found={foundObjects.some((foundObject) => foundObject.src === objectData.src)}
            onObjectFound={handleObjectFound}
          />
        ))}
      </div>
      {/* Control bar with timer and give-up button */}
      <div className="objectsearch-controlbar">
        <div className="objectsearch-timer">
          <Timebar
            timeMs={objectSearchData.timeForSearch}
            onTimeOver={() => handleObjectSearchDone(foundCount)}
            paused={showResultScreen || gameState !== MINI_GAME_STATE.PLAYING}
          />
        </div>
        <div className="objectsearch-button">
          <Button
            label={localize.scenes.socialMedia.miniGame.miniGameGiveUp}
            onClick={() => handleObjectSearchDone(foundCount)}
          ></Button>
        </div>
      </div>
      {/* End-of-round modal */}
      <Modal
        open={showResultScreen && gameState != MINI_GAME_STATE.COMPLETED}
        isBlocking={true}
        title={localize.commonGame.endScreen.roundOver}
      >
        <>
          <p>{getScoreText(localize)}</p>
          <Button onClick={handleNextObjectSearch} label={localize.general.common.proceed} />
        </>
      </Modal>
    </>
  );
};
