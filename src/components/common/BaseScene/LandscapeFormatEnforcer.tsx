import { IMAGES } from "../../../constants/Images";
import { useTranslation } from "../../../utils/hooks/useTranslation";
import { Modal } from "../Controls/Modal/Modal";
import "./landscapeFormatEnforcer.css";

export default function LandscapeFormatEnforcer() {
  const { localize } = useTranslation();
  return (
    <Modal open title={localize.commonGame.landscapeScreen.turnDevice}>
      <img className="rotating-phone" src={IMAGES.common.phoneWhite} />
    </Modal>
  );
}
