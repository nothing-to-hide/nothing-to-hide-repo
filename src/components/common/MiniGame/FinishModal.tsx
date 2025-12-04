import { JSX } from "react";
import { Modal } from "../Controls/Modal/Modal";
import { Button } from "../Controls/Button/Button";
import { ITranslation } from "../../../types/translations";
import "./miniGame.css";

type MiniGameFinishModalProps = {
  open: boolean;
  localize: ITranslation;
  onComplete: () => void;
  onRestartGame: () => void;
  earnedPoints: number;
  maxPossiblePoints: number;
  feedback?: string;
};

export const MiniGameFinishModal = ({
  open,
  localize,
  onRestartGame,
  onComplete,
  earnedPoints,
  maxPossiblePoints,
  feedback,
}: MiniGameFinishModalProps): JSX.Element => {
  const totalScoreText = localize.general.common.maxGamePoints
    .replace("{POINTS}", earnedPoints.toString())
    .replace("{MAX_POINTS}", maxPossiblePoints.toString());

  return (
    <Modal open={open} title={localize.commonGame.endScreen.gameOver} isBlocking={true}>
      <div className="miniGame-finishModal">
        <p>{totalScoreText}</p>
        {feedback && <p>{feedback}</p>}
        <div className="miniGame-finishModal-buttons">
          <Button
            label={localize.general.common.retry}
            variant="outlined"
            onClick={onRestartGame}
          />
          <Button label={localize.general.common.proceed} onClick={onComplete} />
        </div>
      </div>
    </Modal>
  );
};
