import "./iconSelector.css";
import { SOUNDS } from "../../../../constants/Sounds";
import { AudioManager } from "../../../../utils/managers/AudioManager";

type Icon = {
  key: string;
  svg?: string;
  path?: string;
  text?: string;
};

type IconSelectorProps = {
  label: string;
  icons: Icon[];
  onSelect: (key: string) => void;
  selectedKey?: string;
  iconSize?: number;
  errorMessage?: string;
};

export const IconSelector = (props: IconSelectorProps) => {
  const { label, icons, selectedKey, onSelect, iconSize = 50, errorMessage = "" } = props;

  const handleIconClick = (icon: Icon) => {
    AudioManager.getInstance().play(SOUNDS.common.swish);
    onSelect(icon.key);
  };

  const renderIcon = (icon: Icon) => {
    if (icon?.svg?.startsWith("<svg")) {
      return <div className="icon-svg-container" dangerouslySetInnerHTML={{ __html: icon.svg }} />;
    } else if (icon?.path?.startsWith("data:image") || icon?.path?.match(/\.(jpeg|jpg|gif|png)$/)) {
      return <img src={icon.path} width={iconSize} height={iconSize} alt={`icon-${icon.key}`} />;
    } else {
      return <span>{icon.text}</span>;
    }
  };

  return (
    <div className="icon-selector-container">
      <label className="icon-selector-label">{label}</label>
      <div className="icon-selector-grid">
        {icons.map((icon, index) => (
          <div
            key={index}
            className={`icon-selector-item ${selectedKey === icon.key ? "selected" : ""}`}
            onClick={() => handleIconClick(icon)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleIconClick(icon);
              }
            }}
            tabIndex={0}
            role="button"
            style={{ width: iconSize, height: iconSize }}
          >
            {renderIcon(icon)}
          </div>
        ))}
      </div>
      {errorMessage && <span className="icon-selector-error">{errorMessage}</span>}
    </div>
  );
};
