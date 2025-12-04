type FishScoreProps = {
  frame: string;
  health: number;
  healthColor: string;
};

export const FishScore = ({ frame, health, healthColor }: FishScoreProps) => {
  return (
    <div className="fish-score">
      <div className="fish-score-frame">
        <img src={frame} alt="Fish Frame" />
      </div>
      <div className="fish-score-health">
        <div
          className="fish-score-health-bar"
          style={{ width: `${health}%`, backgroundColor: healthColor }}
        />
        <span>{health}% HP</span>
      </div>
    </div>
  );
};
