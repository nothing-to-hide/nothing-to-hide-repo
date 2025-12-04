import { useState, useEffect } from "react";
import "./timebar.css";
import { IMAGES } from "../../../../constants/Images";
import { useGameState } from "../../../../context/GameStateContext";

type TimebarProps = {
  timeMs: number;
  onTimeOver: () => void;
  paused?: boolean;
}

const Timebar = (props: TimebarProps) => {
  const { timeMs, onTimeOver, paused } = props;
  const { gameState } = useGameState();
  const [progress, setProgress] = useState(100);

  const intervalSizeMs = 100;

  useEffect(() => {
    let elapsedMs = 0;
    const interval = setInterval(() => {
      if (paused) {
        return;
      }
      elapsedMs += intervalSizeMs;
      const percentage = Math.max(100 - (elapsedMs / timeMs * 100), 0);
      setProgress(percentage);

      if (elapsedMs >= timeMs) {
        clearInterval(interval);
        onTimeOver();
      }
    }, intervalSizeMs);

    return () => clearInterval(interval);
  }, [timeMs, paused]);

  return (
    <div className="timebar-container">
      <div className="dynamic-bar" style={{ width: `${progress}%` }}>
        <img className="timebar-avatar" src={IMAGES.getAvatar(gameState.avatar)} alt="timebar" />
      </div>
    </div>
  );
};

export default Timebar;