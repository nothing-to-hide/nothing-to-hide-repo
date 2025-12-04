import { useState } from "react";
import { Tutorial } from "../../../types/game/MiniGame";
import { ITranslation } from "../../../types/translations";
import { Modal } from "../Controls/Modal/Modal";
import { Button } from "../Controls/Button/Button";
import "./miniGame.css";

type MiniGameTutorialProps = {
  onComplete: () => void;
  localize: ITranslation;
  open: boolean;
  tutorial: Tutorial[];
};

export const MiniGameTutorial = ({
  onComplete,
  localize,
  open,
  tutorial,
}: MiniGameTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < tutorial.length - 1) setCurrentStep(currentStep + 1);
    else onComplete();
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Modal open={open} title={localize.commonGame.tutorial.title} isBlocking>
      <>
        <div className="miniGame-tutorial">
          <img src={tutorial[currentStep].image} />
          <p>{tutorial[currentStep].title}</p>
          <p>{tutorial[currentStep].message}</p>
        </div>
        <div className="miniGame-tutorial-buttons">
          {/* Back */}
          {currentStep > 0 && (
            <Button label={localize.commonGame.tutorial.back} onClick={handlePreviousStep} />
          )}
          {/* Can be skipped if tutorial is not done */}
          {currentStep < tutorial.length - 1 && (
            <Button
              label={localize.commonGame.tutorial.skip}
              variant="outlined"
              onClick={onComplete}
            />
          )}
          {/* Next */}
          <Button
            label={
              currentStep < tutorial.length - 1
                ? localize.commonGame.tutorial.next
                : localize.commonGame.tutorial.start
            }
            onClick={handleNextStep}
          />
        </div>
      </>
    </Modal>
  );
};
