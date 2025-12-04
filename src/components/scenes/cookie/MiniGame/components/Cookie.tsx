import { Coordinates } from "../../../../../types/game/MiniGame";

type CookieProps = {
  cookieImage: string;
  coordinates: Coordinates;
  text: string;
};

export const Cookie = ({ cookieImage, coordinates, text }: CookieProps) => {
  return (
    <>
      <img
        src={cookieImage}
        className="cookie"
        draggable={false}
        style={{
          left: `${coordinates.x}%`,
          top: `${coordinates.y}%`,
        }}
      />
      <span
        className="cookie-text"
        style={{
          left: `${coordinates.x}%`,
          top: `${coordinates.y}%`,
        }}
      >{text}</span>
    </>
  );
};
