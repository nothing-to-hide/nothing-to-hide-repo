import { useEffect, useState } from "react";
import { NEXT_SCENE_MAP, SCENE } from "../../constants/Game";
import { useGameState } from "../../context/GameStateContext";
import "./footer.css";
import { ImpressumModal } from "../common/Legal/ImpressumModal";
import { PrivacyModal } from "../common/Legal/PrivacyModal";
import { useTranslation } from "../../utils/hooks/useTranslation";

type FooterProps = {};

export const Footer = (_props: FooterProps) => {
  const { gameState, updateGameState } = useGameState();
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const { localize } = useTranslation();

  /**
   * ONLY FOR DEBUGGING
   * - skip scenes with CTRL + LEFT/RIGHT
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Previous - with ctrl + left
      if (event.ctrlKey && event.key === "ArrowLeft") {
        const prevScene =
          (Object.entries(NEXT_SCENE_MAP).find(
            ([_from, to]) => to === gameState.scene,
          )?.[0] as SCENE) ?? SCENE.START_SCREEN;

        updateGameState({ scene: prevScene });
      }
      // Next - with ctrl + right
      if (event.ctrlKey && event.key === "ArrowRight") {
        const nextScene = NEXT_SCENE_MAP[gameState.scene] ?? SCENE.START_SCREEN;
        updateGameState({ scene: nextScene });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState.scene, updateGameState]);

  return (
    <div className="footer">
      <div className="footer-text">
        <a href="https://www.datapro.education/">© DataPro 2025</a>
        <p className="spacer"> | </p>
        <button className="link-button" onClick={() => setImpressumOpen(true)}>
          {localize.general.legal.titleImpressum}
        </button>
        <p className="spacer"> | </p>
        <button className="link-button" onClick={() => setPrivacyOpen(true)}>
          {localize.general.legal.titlePrivacy}
        </button>
      </div>
      <ImpressumModal open={impressumOpen} localize={localize} onComplete={() => setImpressumOpen(false)} />
      <PrivacyModal open={privacyOpen} localize={localize} onComplete={() => setPrivacyOpen(false)} />
    </div>
  );
};
