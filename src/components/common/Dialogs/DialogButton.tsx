import { Button } from "../Controls/Button/Button";
import { useTranslation } from "../../../utils/hooks/useTranslation";

type DialogButtonProps = {
  showButton: boolean;
  onClick?: () => void;
};

export function DialogButton({
  showButton,
  onClick,
}: DialogButtonProps) {
  const defaultStyles = { opacity: showButton ? 1 : 0};
  const { localize } = useTranslation();
  const handleClick = () => {
    if (showButton && onClick) {
      onClick();
    }
  };
  
  return (
    <div className="dialog-button" style={{ ...defaultStyles,}}>
      <Button label={localize.general.common.proceed} onClick={handleClick} />
    </div>
  );
}