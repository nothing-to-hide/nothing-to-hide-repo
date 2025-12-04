type ToggleSwitchProps = {
  checked: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
};

export function ToggleSwitch({ checked, onChange, disabled }: ToggleSwitchProps) {
  return (
    <button
      className={`cg-toggle ${checked ? "is-on" : ""} ${disabled ? "is-disabled" : ""}`}
      onClick={() => !disabled && onChange(!checked)}
      type="button"
      aria-pressed={checked}
    >
      <span className="cg-toggle__track" />
      <span className="cg-toggle__thumb" />
    </button>
  );
}
