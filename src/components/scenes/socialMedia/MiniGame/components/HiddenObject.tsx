import { PreparedHiddenObject } from "../logic/types";

type HiddenObjectProps = {
  onObjectFound: (src: string) => void;
  hiddenObject: PreparedHiddenObject;
  found: boolean;
};

const POSITION_THRESHOLD_PERCENT = 50;
const TRANSFORM_OFFSET_PERCENT = -100;

export const HiddenObject = ({ hiddenObject, found, onObjectFound }: HiddenObjectProps) => {
  const { src, position, width } = hiddenObject;

  // Calculate transform to ensure object appears inside screen bounds
  const translateX = position.left > POSITION_THRESHOLD_PERCENT ? TRANSFORM_OFFSET_PERCENT : 0;
  const translateY = position.top > POSITION_THRESHOLD_PERCENT ? TRANSFORM_OFFSET_PERCENT : 0;

  return (
    <img
      src={src}
      alt="hidden object"
      className="hidden-object"
      style={{
        top: `${position.top}%`,
        left: `${position.left}%`,
        width: `${width}%`,
        transform: `translate(${translateX}%, ${translateY}%)`,
        visibility: found ? "hidden" : "visible",
      }}
      onClick={() => onObjectFound(src)}
    />
  );
};
