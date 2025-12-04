import { useFishingRod } from "../logic/useFishingRod";
import { FishingBait } from "./FishingBait";
import { Bait, Coordinates } from "../logic/types";

export type FishingRodProps = {
  bait: Bait;
  onBaitPaused: (baitId: number, paused: boolean) => void;
  onBaitAnswered: (baitId: number, correctAnswer: boolean) => void;
  diverCoordinates: Coordinates;
};

const BAIT_OFFSET = {
  horizontal: 20,
  vertical: 5,
};

export const FishingRod = ({
  bait,
  onBaitPaused,
  onBaitAnswered,
  diverCoordinates,
}: FishingRodProps) => {
  const { xPos, yPos, message } = bait;

  // Hook manages internal bait state (e.g., message visibility, image selection)
  const { showMessage, phishingImage, handleRevealMessage } = useFishingRod({
    bait,
    onBaitPaused,
    onBaitAnswered,
    diverCoordinates,
  });

  return (
    <>
      {/* Fishing line visual */}
      <div
        className="fishing-line"
        style={{
          left: `${xPos}px`,
          height: `${yPos}px`,
        }}
      />
      {/* Bait image at the end of the fishing line */}
      <img
        className="fishing-bait"
        src={phishingImage}
        alt="bait"
        style={{
          left: `${xPos - BAIT_OFFSET.horizontal}px`,
          top: `${yPos - BAIT_OFFSET.vertical}px`,
        }}
      />
      {/* Modal showing phishing message when bait is interacted with */}
      <FishingBait
        message={message}
        showMessage={showMessage}
        handleRevealMessage={handleRevealMessage}
      />
    </>
  );
};
