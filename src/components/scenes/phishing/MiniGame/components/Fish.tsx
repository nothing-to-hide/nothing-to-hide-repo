import { Coordinates, Direction } from "../logic/types";

type FishProps = {
  frame: string;
  direction: Direction;
  coordinates: Coordinates;
  health: number;
  healthColor: string;
};

export const Fish = ({ frame, direction, coordinates, health, healthColor }: FishProps) => {
  return (
    <div
      className="fish-image"
      style={{
        left: `${coordinates.x}px`,
        top: `${window.innerHeight / 2}px`,
      }}
    >
      {/* Fish sprite image with flip effect based on swim direction */}
      <img
        src={frame}
        alt="fish"
        className="fish-image"
        style={{
          transform: `scaleX(${direction === "left" ? -1 : 1})`,
        }}
      />

      {/* Health bar UI */}
      <div className="fish-health-bar">
        <div
          className="fish-health"
          style={{
            width: `${health}%`,
            backgroundColor: healthColor,
          }}
        />
      </div>
    </div>
  );
};
