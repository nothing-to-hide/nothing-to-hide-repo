import { Modal } from "../../../common/Controls/Modal/Modal";
import { useTranslation } from "../../../../utils/hooks/useTranslation";
import { Button } from "../../../common/Controls/Button/Button";

type CookieOverviewProps = {
  open?: boolean;
  onNext: () => void;
};

export function CookieOverview({ open = true, onNext }: CookieOverviewProps) {
  const { localize } = useTranslation();

  return (
    <Modal open={open} isBlocking title={localize.scenes.cookie.intro.cookies.title}>
      <div className="cookie-overview">
        <p className="cookie-text-intro">{localize.scenes.cookie.intro.cookieInfo1}</p>

        <div className="cookie-buttons">
          <Button variant={"outlined"} label={localize.scenes.cookie.intro.buttonTextManageCookies} onClick={onNext} />
          <Button label={localize.scenes.cookie.intro.buttonTextAcceptCookies} onClick={onNext} />
        </div>
      </div>
    </Modal>
  );
}
