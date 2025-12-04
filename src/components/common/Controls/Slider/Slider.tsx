import "./slider.css";

type SliderProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
};

export const Slider = (props: SliderProps) => {
  const { label, value, min, max, step, onChange, disabled = false } = props;

  return (
    <div className="slider-container">
      <label className="slider-label">{label}</label>
      <input
        type="range"
        onChange={(e) => onChange(Number(e.currentTarget.value))}
        min={min}
        max={max}
        step={step}
        value={value}
        className="slider-input"
        disabled={disabled}
      />
    </div>
  );
};
