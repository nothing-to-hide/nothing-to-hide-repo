import { ACHIEVEMENTS } from "../../constants/Achievements";
import { useGameState } from "../../context/GameStateContext";
import { MessageType } from "../../types/game/Story";
import { useTranslation } from "../../utils/hooks/useTranslation";
import { Dialog } from "../common/Dialogs/Dialog";
import { IMAGES } from "../../constants/Images";

type EndScoreProps = {
  onNext: () => void;
  allAchievementsUnlocked: boolean;
};

export const EndScore = ({ onNext, allAchievementsUnlocked }: EndScoreProps) => {
  const { gameState } = useGameState();
  const { localize } = useTranslation();

  const achievements = Object.values(ACHIEVEMENTS);
  const points = String(gameState.points);
  const unlockedAchievements = new Set(gameState.unlockedAchievements);

  // Render the achievements with a checkmark if unlocked, otherwise a cross
  const renderAchievements = () => {
    return achievements.map((achievement) => {
      const isUnlocked = unlockedAchievements.has(achievement.key);
      return (
        <div className="achievement" key={achievement.key}>
          <img className="achievement-img" src={achievement.imgPath} />
          <div >
            {localize.commonGame.achievements[achievement.key]}
          </div>
          <div className="achievement-passed">
            {isUnlocked ? "✅" : "❌"}
          </div>
        </div>
      );
    });
  };

  const endScoreText = localize.commonGame.endScreen.pointsEarned.replace("{POINTS}", points);

  return (
    <Dialog
      element={{
        type: "dialog",
        messageType: MessageType.NPC_MSG,
        text: endScoreText,
        avatarUrl: IMAGES.getAvatar(gameState.avatar, allAchievementsUnlocked ? "happy" : "sad"),
      }}
      onClick={onNext}
    >
      <div className="endScreen-achievements">{renderAchievements()}</div>
    </Dialog>
  );
};
