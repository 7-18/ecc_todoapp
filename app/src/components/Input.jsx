export const Input = ({ className, type, placeholder, name, value, onChange, required, disabled }) => {
  className = className || "";

  return (
    <input
      className={className}
      type={type || "text"}
      placeholder={placeholder}
      value={value}
      name={name || ""}
      onChange={onChange}
      required={required}
      disabled={disabled}
    />
  );
};
