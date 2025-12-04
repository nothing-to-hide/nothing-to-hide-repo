import { MINI_GAME_STATE } from "../../../../../constants/Game";
import { PHISHING_GAME } from "../../../../../constants/MiniGames/phishing";
import Timebar from "../../../../common/Controls/Timebar/Timebar";
import { useScubaDiver } from "../logic/useScubaDiver";
import { Fish } from "./Fish";
import { FishingRod } from "./FishingRod";
import { ScubaDiver } from "./ScubaDiver";
import { Bait } from "../logic/types";
import { useFish } from "../logic/useFish";
import { FishScore } from "./FishScore";

type PhishingGameProps = {
  phishingContainerRef: React.RefObject<HTMLDivElement | null>;
  gameState: MINI_GAME_STATE;
  baits: Bait[];
  fishHealth: number;
  duration: number;
  handleBaitEaten: (baitId: number) => void;
  handleBaitPaused: (baitId: number, paused: boolean) => void;
  handleBaitAnswered: (baitId: number, correctAnswer: boolean) => void;
  handleGameCompleted: () => void;
};

export const PhishingGame = ({
  phishingContainerRef,
  gameState,
  baits,
  fishHealth,
  duration,
  handleBaitEaten,
  handleBaitPaused,
  handleBaitAnswered,
  handleGameCompleted,
}: PhishingGameProps) => {
  // Player: animation & movement
  const { coordinates, direction, action } = useScubaDiver(
    phishingContainerRef,
    gameState === MINI_GAME_STATE.PLAYING,
  );

  // Fish: animation & movement
  const { fishCoordinates, fishDirection, fishFrame, healthColor } = useFish(
    baits,
    fishHealth,
    gameState === MINI_GAME_STATE.PLAYING,
    handleBaitEaten,
  );

  return (
    <>
      <div className="phishing-sea">
        {/* Render all bait hooks (fishing rods) */}
        {baits.map((bait) => (
          <FishingRod
            key={bait.id}
            bait={bait}
            diverCoordinates={coordinates}
            onBaitPaused={handleBaitPaused}
            onBaitAnswered={handleBaitAnswered}
          />
        ))}

        {/* Diver controlled by mini-game logic */}
        <ScubaDiver action={action} coordinates={coordinates} direction={direction} />

        {/* Fish character that moves towards baits */}
        <Fish
          frame={fishFrame}
          direction={fishDirection}
          coordinates={fishCoordinates}
          health={fishHealth}
          healthColor={healthColor}
        />

        {/* Game score */}
        <FishScore frame={fishFrame} health={fishHealth} healthColor={healthColor} />

        {/* Static background ground images */}
        <div className="phishing-ground">
          {PHISHING_GAME.images.ground.map((src, index) => (
            <img key={index} src={src} />
          ))}
        </div>
      </div>

      {/* Timebar component showing countdown */}
      <Timebar
        timeMs={duration}
        onTimeOver={handleGameCompleted}
        paused={gameState !== MINI_GAME_STATE.PLAYING}
      />
    </>
  );
};
