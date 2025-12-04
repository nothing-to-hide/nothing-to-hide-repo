import { useTranslation } from "../../../../../utils/hooks/useTranslation";
import { Button } from "../../../../common/Controls/Button/Button";

type ToPostOrNotGameProps = {
  currentImage: { src: string; canPost: boolean };
  feedback: string | null;
  isCorrect: boolean | null;
  handleChoice: (shouldPost: boolean) => void;
  nextPicture: () => void;
};

export const ToPostOrNotGame = ({
  currentImage,
  feedback,
  isCorrect,
  handleChoice,
  nextPicture,
}: ToPostOrNotGameProps) => {
  const { localize } = useTranslation();

  return (
    <div className="to-post-or-not-game">
      <div className="image-with-buttons">
        {!feedback && (
          <Button
            yesNo={"no"}
            label={localize.scenes.photos.miniGame.notPost}
            onClick={() => handleChoice(false)}
          ></Button>
        )}

        <div className="image-wrapper">
          <img
            src={currentImage.src}
            alt=""
            className={`game-card ${
              isCorrect ? "correct" : isCorrect === false ? "incorrect" : ""
            }`}
          />

          {isCorrect === false && feedback && (
            <div className="feedback-overlay">
              <p>{String(localize.scenes.photos.miniGame[feedback])}</p>
              <Button label={localize.general.common.proceed} onClick={nextPicture} />
            </div>
          )}
        </div>

        {!feedback && (
          <Button
            yesNo={"yes"}
            label={localize.scenes.photos.miniGame.post}
            onClick={() => handleChoice(true)}
          ></Button>
        )}
      </div>
    </div>
  );
};
