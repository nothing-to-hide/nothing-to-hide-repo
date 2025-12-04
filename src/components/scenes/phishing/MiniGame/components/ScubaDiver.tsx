import { PHISHING_GAME } from "../../../../../constants/MiniGames/phishing";
import { useFrameAnimation } from "../../../../../utils/hooks/useFrameAnimation";
import { DiverAction, Direction, Coordinates } from "../logic/types";

type ScubaDiverProps = {
  action: DiverAction;
  coordinates: Coordinates;
  direction: Direction;
};

export const ScubaDiver = ({ action, coordinates, direction }: ScubaDiverProps) => {
  const idleFrames = PHISHING_GAME.images.scubaFrames.idle;
  const swimFrames = PHISHING_GAME.images.scubaFrames.swim;

  const isSwimming = action === "swimming";
  const currentFrames = isSwimming ? swimFrames : idleFrames;
  const animationSpeed = isSwimming
    ? PHISHING_GAME.config.diverSwimAnimationSpeed
    : PHISHING_GAME.config.diverIdleAnimationSpeed;

  // Cycles through animation frames
  const frameIndex = useFrameAnimation(
    currentFrames.length,
    animationSpeed,
    true, // loop animation
  );

  const currentImage = currentFrames[frameIndex % currentFrames.length];

  return (
    <img
      src={currentImage}
      alt={`scuba diver ${action}`}
      className="scuba-diver"
      style={{
        top: coordinates.y,
        left: coordinates.x,
        transform: `scaleX(${direction === "left" ? -1 : 1})`, // flip based on direction
      }}
    />
  );
};
