import "./button.css";
import { SOUNDS } from "../../../../constants/Sounds";
import { AudioManager } from "../../../../utils/managers/AudioManager";

type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: "contained" | "outlined";
  style?: React.CSSProperties;
  className?: string;
  yesNo?: "yes" | "no";
  mute?: boolean;
};

export const Button = (props: ButtonProps) => {
  const { label, onClick, variant = "contained", style, className, yesNo, mute = false } = props;

  const handleClick = () => {
    !mute && AudioManager.getInstance().play(SOUNDS.common.click);
    onClick();
  };

  const classNames = [
    "button",
    variant === "outlined" ? "button-outlined" : "",
    yesNo ? `button-${yesNo}` : "",
    className || "",
  ].join(" ");

  return (
    <button style={{ ...style }} className={classNames} onClick={handleClick}>
      {label}
    </button>
  );
};
