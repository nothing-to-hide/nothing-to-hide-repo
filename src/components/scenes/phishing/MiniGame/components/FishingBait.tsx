import { useTranslation } from "../../../../../utils/hooks/useTranslation";
import { Button } from "../../../../common/Controls/Button/Button";
import { Modal } from "../../../../common/Controls/Modal/Modal";
import { Bait } from "../logic/types";

type FishingBaitProps = {
  message: Bait["message"];
  showMessage: boolean;
  handleRevealMessage: (isPhishing: boolean) => void;
};

export const FishingBait = ({ message, showMessage, handleRevealMessage }: FishingBaitProps) => {
  const { localize } = useTranslation();
  const IS_PHISHING = true;
  const IS_NOT_PHISHING = false;

  if (!showMessage) return;
  return (
    <Modal open={showMessage} isBlocking>
      <div className="bait-message">
        {/* Display sender name */}
        <span>
          <strong>{localize.general.common.from}:</strong> {message.sender}
        </span>

        {/* Display message content */}
        <span>{message.text}</span>

        {/* Answer buttons: Legit or Phishing */}
        <div className="bait-answer-buttons">
          <Button
            onClick={() => handleRevealMessage(IS_NOT_PHISHING)}
            label={localize.scenes.phishing.miniGame.legit}
            yesNo="yes"
            mute
          />
          <Button
            onClick={() => handleRevealMessage(IS_PHISHING)}
            label={localize.scenes.phishing.miniGame.phishing}
            yesNo="no"
            mute
          />
        </div>
      </div>
    </Modal>
  );
};
