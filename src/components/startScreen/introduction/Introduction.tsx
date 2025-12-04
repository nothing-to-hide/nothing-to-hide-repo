import { Modal } from "../../common/Controls/Modal/Modal";
import { useTranslation } from "../../../utils/hooks/useTranslation";
import "./introduction.css";
import { IMAGES } from "../../../constants/Images";
import { Button } from "../../common/Controls/Button/Button";

type IntroductionProps = {
  open: boolean;
  onClose: () => void;
  playerName: string;
};

export const Introduction = ({ open, onClose, playerName }: IntroductionProps) => {
  const { localize } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`${localize.commonGame.introduction.welcome} ${playerName}!`}
      isBlocking={true}
      content={
        <>
          <h2>{localize.commonGame.introduction.role}</h2>
          <img className="vibrating-phone" src={IMAGES.common.vibratingPhone} />
          <p>{localize.commonGame.introduction.message}</p>
          <Button onClick={onClose} label={localize.commonGame.playerSetup.continueButton} />
        </>
      }
    />
  );
};
