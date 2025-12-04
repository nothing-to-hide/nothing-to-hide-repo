import { JSX } from "react";
import { ITranslation } from "../../../types/translations";
import { Modal } from "../Controls/Modal/Modal";
import { Button } from "../Controls/Button/Button";
import "./ImpressumPrivacyModel.css";

type PrivacyPolicyModalProps = {
  open: boolean;
  localize: ITranslation;
  onComplete: () => void;
};

export const PrivacyModal = ({
  open,
  localize,
  onComplete,
}: PrivacyPolicyModalProps): JSX.Element => {
  return (
    <Modal
      open={open}
      title={localize.general.legal.titlePrivacy}
      content={
        <div className="impressum-privacy-modal-content">
          <section>{localize.general.legal.textPrivacy}</section>
        </div>
      }
      actions={<Button label={localize.general.common.close} onClick={onComplete} />}
    />
  );
};
