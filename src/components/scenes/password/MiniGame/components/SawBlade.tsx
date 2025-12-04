import { PASSWORD_GAME } from "../../../../../constants/MiniGames/password";

type SawBladeProps = {
  sawBladeRef: React.RefObject<HTMLDivElement | null>;
};

export const SawBlade = ({ sawBladeRef }: SawBladeProps) => {
  return (
    <div ref={sawBladeRef} className="circularSawBlade">
      <img src={PASSWORD_GAME.images.circularSawBlade} alt="SawBlade" />
    </div>
  );
};
