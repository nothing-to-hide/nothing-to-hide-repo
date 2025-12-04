import { ACHIEVEMENTS } from "../../../constants/Achievements";
import { SOUNDS } from "../../../constants/Sounds";
import { useGameState } from "../../../context/GameStateContext";
import { Modal } from "../Controls/Modal/Modal";
import "./achievementsOverview.css";
import { useTranslation } from "../../../utils/hooks/useTranslation";
import { IMAGES } from "../../../constants/Images";
import { AudioManager } from "../../../utils/managers/AudioManager";

export function AchievementsOverlay({ close }: { close: () => void }) {
  const { gameState } = useGameState();
  const { localize } = useTranslation();

  // Filter achievements to only those that are unlocked
  const unlockedAchievements = Object.values(ACHIEVEMENTS).filter(({ key }) =>
    gameState.unlockedAchievements.includes(key),
  );

  AudioManager.getInstance().play(SOUNDS.achievements.unlocked);

  return (
    <Modal
      onClose={close}
      open
      title={`${localize.commonGame.achievements.title} ${gameState.playerName}`}
    >
      <div className="achievements-book-wrapper">
        <img src={IMAGES.achievements.book} className="achievements-book" />
        <div className="achievements-list">
          <div className="achievements-column">
            {unlockedAchievements.slice(0, 4).map((achievement) => (
              <div className="achievement" key={achievement.key}>
                <div className="achievement-img achievement-img-small">
                  <img src={achievement.imgPath} className="achievement-base-image" />
                  <img
                    src={IMAGES.getAvatar(gameState.avatar)}
                    className="achievement-avatar-image"
                  />
                </div>
                <span>{localize.commonGame.achievements[achievement.key]}</span>
              </div>
            ))}
          </div>
          <div className="achievements-column">
            {unlockedAchievements.slice(4, 8).map((achievement) => (
              <div className="achievement" key={achievement.key}>
                <div className="achievement-img achievement-img-small">
                  <img src={achievement.imgPath} className="achievement-base-image" />
                  {/* Avatar nur, wenn du ihn auch auf der rechten Seite willst */}
                  <img
                    src={IMAGES.getAvatar(gameState.avatar)}
                    className="achievement-avatar-image"
                  />
                </div>
                <span>{localize.commonGame.achievements[achievement.key]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
