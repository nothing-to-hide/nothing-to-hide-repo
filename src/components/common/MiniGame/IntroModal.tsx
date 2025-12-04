import { JSX } from "react";
import { ITranslation } from "../../../types/translations";
import { Modal } from "../Controls/Modal/Modal";
import { Button } from "../Controls/Button/Button";
import "./miniGame.css";

type MiniGameIntroModalProps = {
  open: boolean;
  localize: ITranslation;
  startGame: () => void;
  title: string;
  description: string;
  hint?: string;
};

export const MiniGameIntroModal = ({
  open,
  localize,
  startGame,
  title,
  description,
  hint,
}: MiniGameIntroModalProps): JSX.Element => {
  return (
    <Modal open={open} onClose={startGame} title={title} isBlocking={true}>
      <>
        <p>{description}</p>
        {hint && <p>{hint}</p>}
        <Button label={localize.general.common.proceed} onClick={startGame} />
      </>
    </Modal>
  );
};
