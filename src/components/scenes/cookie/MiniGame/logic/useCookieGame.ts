import { useEffect, useRef, useState } from "react";
import { MINI_GAME_STATE } from "../../../../../constants/Game";
import { useGameState } from "../../../../../context/GameStateContext";
import { AudioManager } from "../../../../../utils/managers/AudioManager";
import { Cookie, Crumble, Trail } from "./types";
import { COOKIE_GAME } from "../../../../../constants/MiniGames/cookie";
import { getRandomElements } from "../../../../../utils/Array";
import { SOUNDS } from "../../../../../constants/Sounds";
import { Coordinates } from "../../../../../types/game/MiniGame";

export const useCookieGame = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  goodCookieTexts: string[],
  badCookieTexts: string[],
  onComplete: () => void,
) => {
  const audioManager = AudioManager.getInstance();
  const [gameState, setGameState] = useState(MINI_GAME_STATE.INTRO);
  const [cookies, setCookies] = useState<Cookie[]>([]);
  const [crumbles, setCrumbles] = useState<Crumble[]>([]);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [score, setScore] = useState(0);
  const animationRef = useRef<number>(null);
  const cookieSpawn = useRef<NodeJS.Timeout>(null);
  const trailTimeoutRef = useRef<NodeJS.Timeout>(null);
  const lastTimeRef = useRef<number>(0);
  const cookieScoreRef = useRef<number>(0);
  const trailRef = useRef<Trail[]>([]);
  const { gameState: globalGameState, updateGameState } = useGameState();
  const mousePosition = useRef({ x: 0, y: 0, slicing: false });
  const spawnFrequencyRef = useRef(COOKIE_GAME.config.initialSpawnFrequency);

  const getCookieText = () => {
    return Math.random() > 0.5
      ? { text: getRandomElements(goodCookieTexts, 1)[0], goodCookie: true }
      : { text: getRandomElements(badCookieTexts, 1)[0], goodCookie: false };
  };

  const spawnCookie = () => {
    const startX =
      Math.random() * COOKIE_GAME.config.cookieSpawnMaxX + COOKIE_GAME.config.cookieSpawnMinX;
    const xVelocity =
      Math.random() * COOKIE_GAME.config.cookieSpeedRangeX + COOKIE_GAME.config.cookieSpeedRangeX;
    setCookies((existing) => [
      ...existing,
      {
        key: existing.length,
        position: {
          x: startX,
          y: 100,
        },
        velocityXY: {
          // fly to the right when starting on the left and vice versa
          x: startX < 50 ? xVelocity : -xVelocity,
          y: -(
            Math.random() * COOKIE_GAME.config.cookieSpeedRangeY +
            COOKIE_GAME.config.cookieBaseSpeedY
          ),
        },
        state: "intact",
        cookieText: getCookieText(),
      },
    ]);
  };

  const updateCookies = (deltaTime: number) => {
    setCookies((existing) =>
      existing
        .map(
          (cookie) => {
            cookie.position.x += cookie.velocityXY.x * deltaTime;
            cookie.position.y += cookie.velocityXY.y * deltaTime;
            cookie.velocityXY.y += COOKIE_GAME.config.cookieGravity * deltaTime;
            return cookie;
          },
          // remove cookies that fell down without getting hit
        )
        .filter((cookie) => cookie.position.y < COOKIE_GAME.config.cookieMaxYPosition),
    );
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    mousePosition.current.slicing = true;
    checkCookieHit(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    mousePosition.current.slicing = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mousePosition.current.slicing) return;
    checkCookieHit(e.clientX, e.clientY);
    updateSliceTrail({ x: e.clientX, y: e.clientY });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    mousePosition.current.slicing = true;
    const touch = e.touches[0];
    checkCookieHit(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!mousePosition.current.slicing) return;
    const touch = e.touches[0];
    checkCookieHit(touch.clientX, touch.clientY);
    updateSliceTrail({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    mousePosition.current.slicing = false;
  };

  const checkCookieHit = (x: number, y: number) => {
    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) return;

    // calculate percentages
    const relX = ((x - rect.left) / rect.width) * 100;
    const relY = ((y - rect.top) / rect.height) * 100;

    setCookies((existing) =>
      existing.map((cookie) => {
        if (cookie.state !== "intact") return cookie;
        const fx = cookie.position.x;
        const fy = cookie.position.y;
        const distance = Math.hypot(fx - relX, fy - relY);
        if (distance < COOKIE_GAME.config.cookieHitBoxRange) {
          // mouse pointer / finger is close enough to cookie
          const newCookie = <Cookie>{ ...cookie, state: "crumbles" };
          cookie.state = "crumbles";
          // hide cookie & spawn cookie crumbles
          spawnCrumbles(cookie.key, cookie.position);
          setScore((current) =>
            !cookie.cookieText.goodCookie ? current + 1 : current > 0 ? current - 1 : current,
          );
          audioManager.play(SOUNDS.common.crunch);
          return newCookie;
        }
        return cookie;
      }),
    );
  };

  const spawnCrumbles = (cookieRef: number, cookiePosition: Coordinates) => {
    // spawn random amount of crumbles
    const amount = Math.ceil(
      Math.random() * COOKIE_GAME.config.crumbleAmountRange +
        COOKIE_GAME.config.minCrumblesPerCookie,
    );

    setCrumbles((existing) => {
      let newCrumbles = <Crumble[]>[];
      for (let i = 0; i < amount; i++) {
        newCrumbles.push({
          cookieRef: cookieRef,
          position: cookiePosition,
          // spread the cookies so all are visible when falling down
          xDirection:
            Math.random() * COOKIE_GAME.config.crumbleDirectionRange -
            COOKIE_GAME.config.crumbleDirectionRange / 2,
          size:
            Math.random() * COOKIE_GAME.config.crumbleSizeRange + COOKIE_GAME.config.crumbleMinSize,
          speed:
            Math.random() * COOKIE_GAME.config.crumbleFallingSpeedRange +
            COOKIE_GAME.config.crumbleFallingSpeed,
        });
      }

      return [...existing, ...newCrumbles];
    });
  };

  const updateCrumbles = (deltaTime: number) => {
    setCrumbles((crumbles) =>
      crumbles
        .map((c) => {
          return {
            ...c,
            position: {
              x: c.position.x + c.xDirection * deltaTime,
              y: c.position.y + c.speed * deltaTime,
            },
          };
        })
        .filter((crumbles) => crumbles.position.y < 100),
    );
  };

  // "cut" effect (red line)
  const updateSliceTrail = (position: Coordinates) => {
    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) return;

    // calculate percentages
    const relX = ((position.x - rect.left) / rect.width) * 100;
    const relY = ((position.y - rect.top) / rect.height) * 100;

    trailRef.current.push({
      position: { x: relX, y: relY },
      opacity: 1,
    });

    trailRef.current.map((trailElement, index) => {
      return {
        ...trailElement,
        opacity: index / trailRef.current.length,
      };
    });

    // only keep last n elements so line always keeps the same length
    if (trailRef.current.length > COOKIE_GAME.config.maxTrailElements) trailRef.current.shift();

    if (trailTimeoutRef.current) clearTimeout(trailTimeoutRef.current);
    // Clear the trail when nothing happens
    trailTimeoutRef.current = setTimeout(() => {
      trailRef.current = [];
      setTrails([]);
    }, COOKIE_GAME.config.clearTrailAfterMs);
  };

  const renderSliceTrail = () => {
    setTrails([...trailRef.current]);
  };

  // Main animation loop
  const gameLoop = (time: number) => {
    const deltaTime = (time - lastTimeRef.current) / 1000;
    lastTimeRef.current = time;
    updateCookies(deltaTime);
    updateCrumbles(deltaTime);
    renderSliceTrail();
    animationRef.current = requestAnimationFrame(gameLoop);
  };

  // After reading the introduction, proceed to tutorial
  const handleIntroDone = () => {
    setGameState(MINI_GAME_STATE.TUTORIAL);
  };

  // Start spawning words and game loop
  const startGame = () => {
    audioManager.loop(COOKIE_GAME.sounds.theme);
    gameLoop(performance.now());
    runGame();
  };

  const runGame = () => {
    cookieSpawn.current = setTimeout(() => {
      spawnCookie();
      spawnFrequencyRef.current = Math.max(COOKIE_GAME.config.maxSpawnFrequency, spawnFrequencyRef.current - COOKIE_GAME.config.spawnFrequencyIncrease);
      runGame();
    }, spawnFrequencyRef.current);
  };

  // Stop all intervals and animation frames
  const stopGame = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (cookieSpawn.current) clearTimeout(cookieSpawn.current);
  };

  // Start the game, reset everything
  const handleStart = () => {
    setScore(0);
    setCookies([]);
    setGameState(MINI_GAME_STATE.PLAYING);
    startGame();
  };

  const getEarnedPoints = () => {
    if (score <= 0) return 0; // No negative points
    const maxPoints = COOKIE_GAME.config.gameMaxPoints;
    const gameSeconds = COOKIE_GAME.config.gameDuration / 1000;
    const expectedScore = gameSeconds * COOKIE_GAME.config.targetPointsPerSecond;
    const ratio = score / expectedScore; // ratio of actual score to expected score
    const normalized = maxPoints * (1 - Math.exp(-ratio)); // exponential scaling
    return Math.min(Math.round(normalized), maxPoints); // round and cap at maxPoints
  };

  // Finish the game and update global score
  const handleFinish = () => {
    audioManager.stop();
    updateGameState({ points: globalGameState.points + getEarnedPoints() });
    onComplete();
  };

  const handleGameCompleted = () => {
    stopGame();
    setGameState(MINI_GAME_STATE.COMPLETED);
  };

  const handleRestart = () => {
    handleStart();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopGame();
    };
  }, []);

  // Keep scoreRef in sync
  useEffect(() => {
    cookieScoreRef.current = score;
  }, [score]);

  return {
    gameState,
    cookies,
    crumbles,
    trails,
    score,
    handleIntroDone,
    updateCookies,
    handleStart,
    handleFinish,
    handleRestart,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    updateCrumbles,
    setCookies,
    animationRef,
    getCookieText,
    updateSliceTrail,
    trailRef,
    renderSliceTrail,
    gameLoop,
    startGame,
    stopGame,
    cookieSpawn,
    setScore,
    cookieScoreRef,
    getEarnedPoints,
    handleGameCompleted,
  };
};
