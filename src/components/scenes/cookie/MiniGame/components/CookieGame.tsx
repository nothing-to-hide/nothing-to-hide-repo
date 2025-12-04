import { MINI_GAME_STATE } from "../../../../../constants/Game";
import { COOKIE_GAME } from "../../../../../constants/MiniGames/cookie";
import Timebar from "../../../../common/Controls/Timebar/Timebar";
import { Cookie, Crumble, Trail } from "../logic/types";
import { Cookie as FlyingCookie } from "./Cookie";
import CookieCrumbsFalling from "./CookieCrumbsFalling";
import SliceTrail from "./SliceTrail";

export type CookieGameProps = {
  duration: number;
  gameState: MINI_GAME_STATE;
  cookies: Cookie[];
  crumbles: Crumble[];
  trails: Trail[];
  score: number;
  handleIntroDone: () => void;
  handleStart: () => void;
  handleRestart: () => void;
  gameContainerRef: React.RefObject<HTMLDivElement | null>;
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseUp: () => void;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  handleTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
  handleTouchEnd: () => void;
  onGameCompleted: () => void;
};

export const CookieGame = ({
  duration,
  gameState,
  cookies,
  crumbles,
  trails,
  score,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleTouchEnd,
  handleTouchMove,
  handleTouchStart,
  onGameCompleted,
  gameContainerRef,
}: CookieGameProps) => {
  return (
    <>
      <div
        className="cookie-game"
        ref={gameContainerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="cookie-score">{score}</div>
        <SliceTrail points={trails} />
        {
          // only show cookies that have not been hit
          cookies
            .filter((c) => c.state === "intact")
            .map((cookie, key) => (
              <FlyingCookie
                cookieImage={COOKIE_GAME.images.cookies.light}
                coordinates={{ x: cookie.position.x, y: cookie.position.y }}
                key={key}
                text={cookie.cookieText.text}
              />
            ))
        }
        {crumbles.map((c, index) => (
          <CookieCrumbsFalling
            left={c.position.x}
            top={c.position.y}
            size={c.size}
            key={"crumble-" + index}
            image={COOKIE_GAME.images.crumbles[index % COOKIE_GAME.images.crumbles.length]}
          />
        ))}
        <img className="cookie-background" src={COOKIE_GAME.images.cookies.background} />
      </div>
      <Timebar
        timeMs={duration}
        onTimeOver={onGameCompleted}
        paused={gameState !== MINI_GAME_STATE.PLAYING}
      />
    </>
  );
};
