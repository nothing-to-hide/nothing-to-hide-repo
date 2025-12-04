import "./checkbox.css";
import { SOUNDS } from "../../../../constants/Sounds";
import { AudioManager } from "../../../../utils/managers/AudioManager";

type CheckboxProps = {
  label: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
};

export const Checkbox = (props: CheckboxProps) => {
  const { label, checked, onChange } = props;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    AudioManager.getInstance().play(SOUNDS.common.click);
    onChange(e.currentTarget.checked);
  };

  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          className="checkbox-input"
        />
        {label}
      </label>
    </div>
  );
};
