import "./dropdown.css";
import { SOUNDS } from "../../../../constants/Sounds";
import { AudioManager } from "../../../../utils/managers/AudioManager";

type DropdownProps = {
  label: string;
  value: string | number;
  onChange: (key: string) => void;
  options: {
    key: string | number;
    text: string | number;
  }[];
};

export const Dropdown = (props: DropdownProps) => {
  const { label, options, value, onChange } = props;

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    AudioManager.getInstance().play(SOUNDS.common.swish);
    onChange(e.currentTarget.value);
  };

  return (
    <div className="dropdown-container">
      <label className="dropdown-label">{label}</label>
      <select value={value} onChange={handleDropdownChange} className="dropdown-select">
        {options.map((option, index) => (
          <option key={index} value={option.key}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};
