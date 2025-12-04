import { useEffect, useState } from "react";
import { IMAGES } from "../../constants/Images";
import { useTranslation } from "../../utils/hooks/useTranslation";
import { Button } from "../common/Controls/Button/Button";

interface PlayAgainProps {
  onPlayAgain: () => void;
  onReplayFailedModules: () => void;
  allAchievementsUnlocked: boolean;
}

export const PlayAgain = ({
  onPlayAgain,
  onReplayFailedModules,
  allAchievementsUnlocked,
}: PlayAgainProps) => {
  const { localize } = useTranslation();
  const [logoHidden, setLogoHidden] = useState(false);

  useEffect(() => {
    if (!allAchievementsUnlocked) {
      // Let the logo sparkle for 5 seconds before hiding it
      const timeout = setTimeout(() => setLogoHidden(true), 5000);
      return () => clearTimeout(timeout);
    }
  }, [allAchievementsUnlocked]);

  return (
    <div className="playAgain-container">
      <div className="phone-frame">
        <div className="phone-speaker" />
        {/* InstaVibe logo */}
        {!logoHidden && (
          <img
            className={`logo ${allAchievementsUnlocked ? "" : "sparkle-out"}`}
            src={IMAGES.common.instaVibe}
            alt="InstaVibe Logo"
          />
        )}
        <div className="phone-buttons">
          {/* Try again button */}
          <Button onClick={onPlayAgain} label={localize.commonGame.endScreen.tryAgain} />
          {/* Replay failed modules button */}
          {!allAchievementsUnlocked && (
            <Button
              onClick={onReplayFailedModules}
              label={localize.commonGame.endScreen.replayFailedModules}
            />
          )}
        </div>
      </div>
    </div>
  );
};
