import { JSX } from "react";
import { ITranslation } from "../../../types/translations";
import { Modal } from "../Controls/Modal/Modal";
import { Button } from "../Controls/Button/Button";
import "./ImpressumPrivacyModel.css";

type ImpressumModalProps = {
  open: boolean;
  localize: ITranslation;
  onComplete: () => void;
};

export const ImpressumModal = ({
  open,
  localize,
  onComplete,
}: ImpressumModalProps): JSX.Element => {
  return (
    <Modal
      open={open}
      title={localize.general.legal.titleImpressum}
      content={
        <div className="impressum-privacy-modal-content">
          <section>
            <h2>{localize.general.legal.titleGeneral}</h2>
            {localize.general.legal.textGeneral}
          </section>
          <section>
            <h2>{localize.general.legal.titleContact}</h2>
            {localize.general.legal.textContact}
            <br />
          </section>
          <section>
            <h2>{localize.general.legal.titleDisclaimer}</h2>
            {localize.general.legal.textDisclaimer}
          </section>
          <section>
            <h2>{localize.general.legal.titleLinks}</h2>
            {localize.general.legal.textLinks}
          </section>
          <section>
            <h2>{localize.general.legal.titleCopyright}</h2>
            {localize.general.legal.textCopyright}
            <br />
          </section>
        </div>
      }
      actions={<Button label={localize.general.common.close} onClick={onComplete} />}
    />
  );
};
