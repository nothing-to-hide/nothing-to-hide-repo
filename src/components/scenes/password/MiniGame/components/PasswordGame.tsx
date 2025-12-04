import { MINI_GAME_STATE } from "../../../../../constants/Game";
import { FallingPassword } from "../logic/types";
import { FallingPasswordComponent } from "./FallingPassword";
import { SawBlade } from "./SawBlade";
import Progressbar from "../../../../common/Controls/Timebar/Timebar";
import { useSawBlade } from "../logic/useSawBlade";
import { PASSWORD_GAME } from "../../../../../constants/MiniGames/password";

type PasswordGameProps = {
  passwordContainerRef: React.RefObject<HTMLDivElement | null>;
  sawBladeRef: React.RefObject<HTMLDivElement | null>;
  gameState: MINI_GAME_STATE;
  fallingWords: FallingPassword[];
  score: number;
  handleGameCompleted: () => void;
};

export const PasswordGame = ({
  passwordContainerRef,
  sawBladeRef,
  gameState,
  fallingWords,
  score,
  handleGameCompleted,
}: PasswordGameProps) => {
  useSawBlade(passwordContainerRef, sawBladeRef);

  return (
    <>
      <div className="passwordGame-field" ref={passwordContainerRef}>
        <div className="score">Score: {score}</div>

        <SawBlade sawBladeRef={sawBladeRef} />

        {fallingWords.map((word, index) => (
          <FallingPasswordComponent key={index} password={word} />
        ))}
      </div>

      <Progressbar
        timeMs={PASSWORD_GAME.config.gameDuration}
        onTimeOver={handleGameCompleted}
        paused={gameState !== MINI_GAME_STATE.PLAYING}
      />
    </>
  );
};
