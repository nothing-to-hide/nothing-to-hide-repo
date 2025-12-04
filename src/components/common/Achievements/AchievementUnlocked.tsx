import { Modal } from "../Controls/Modal/Modal";
import { Button } from "../Controls/Button/Button";
import { useTranslation } from "../../../utils/hooks/useTranslation";
import "./achievementUnlocked.css";
import { SOUNDS } from "../../../constants/Sounds";
import { Achievement } from "../../../types/game/Achievements";
import { AudioManager } from "../../../utils/managers/AudioManager";

type AchievementUnlockedProps = {
  achievement: Achievement;
  onComplete: () => void;
  unlocked: boolean;
};

export const AchievementUnlocked = (props: AchievementUnlockedProps) => {
  const { achievement, onComplete, unlocked } = props;
  const { localize } = useTranslation();

  AudioManager.getInstance().play(SOUNDS.achievements.unlocked);

  return (
    <Modal
      open={true}
      onClose={onComplete}
      actions={<Button label={localize.general.common.proceed} onClick={onComplete} />}
    >
      {unlocked ? (
        <div className="achievement-unlocked">
          <span>{localize.commonGame.achievements.unlockedMessage}</span>
          <h2>{localize.commonGame.achievements[achievement.key]}</h2>
          <img src={achievement.imgPath} />
        </div>
      ) : (
        <div className="achievement-failed">
          <span>{localize.commonGame.achievements.failedMessage}</span>
          <h2>{localize.commonGame.achievements[achievement.key]}</h2>
        </div>
      )}
    </Modal>
  );
};
