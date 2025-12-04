import "./text.css";

type TextInputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  multiple?: boolean;
  placeholder?: string;
  errorMessage?: string;
};

export const TextInput = (props: TextInputProps) => {
  const {
    label,
    value,
    onChange,
    maxLength = 20,
    multiple = false,
    placeholder = "",
    errorMessage = "",
  } = props;

  return (
    <div className="text-container">
      <label className="text-label">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`text-field ${errorMessage ? "text-field-error" : ""}`}
        multiple={multiple}
      />
      {errorMessage && <span className="text-error">{errorMessage}</span>}
    </div>
  );
};
