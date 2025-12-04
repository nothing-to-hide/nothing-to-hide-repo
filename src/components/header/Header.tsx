import { useState } from "react";
import { SettingsDialog } from "./Settings";
import { useGameState } from "../../context/GameStateContext";
import "./header.css";
import { AchievementsOverlay } from "../common/Achievements/AchievementsOverview";
import { SOUNDS } from "../../constants/Sounds";
import { SCENE } from "../../constants/Game";
import { AudioManager } from "../../utils/managers/AudioManager";
import { IMAGES } from "../../constants/Images";

type HeaderProps = {};

export const Header = (_props: HeaderProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const { gameState, resetGameState } = useGameState();
  const [showAchievements, setShowAchievements] = useState(false);

  const handleResetClick = () => {
    AudioManager.getInstance().play(SOUNDS.common.woosh);
    resetGameState();
  };

  const handleSettingsClick = () => {
    AudioManager.getInstance().play(SOUNDS.common.click);
    setShowSettings(true);
  };

  return (
    <div className="header">
      {/* Player Info Section */}
      <div className="header-left">
        {gameState.playerName && gameState.avatar && (
          <div className="player-info header-icon">
            <img
              src={IMAGES.getAvatar(gameState.avatar)}
              alt="Player Avatar"
              className="player-avatar"
            />
            <span className="player-name">{gameState.playerName}</span>
          </div>
        )}
      </div>

      {/* Divider */}
      {gameState.playerName && gameState.avatar && <div className="header-divider"></div>}

      {/* Controls Section */}
      <div className="header-right">
        {/* Points */}
        <div className="game-points header-icon">
          {gameState.points} <img src={IMAGES.common.trophyIcon} alt="trophy" />
        </div>
        {/* Achievements Button */}
        {gameState.scene != SCENE.START_SCREEN && (
          <button
            className="header-button header-icon"
            onClick={() => setShowAchievements((prev) => !prev)}
          >
            <img src={IMAGES.common.achievementBook} alt="achivements" />
          </button>
        )}

        {/* Retry */}
        <button className="header-button header-icon" onClick={handleResetClick}>
          <img src={IMAGES.common.replayIcon} alt="replay" />
        </button>
        {/* Settings */}
        <button className="header-button header-icon" onClick={handleSettingsClick}>
          <img src={IMAGES.common.settingsIcon} alt="settings" />
        </button>
      </div>

      {/* Achievements Overlay */}
      {showAchievements && <AchievementsOverlay close={() => setShowAchievements(false)} />}

      {showSettings && (
        <SettingsDialog open={showSettings} handleClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};
