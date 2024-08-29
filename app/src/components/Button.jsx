export const Button = ({ className, variant, size, type, children, onClick, disabled }) => {
  className = className || "";

  return (
    <button className={className} onClick={onClick} type={type || "button"} disabled={disabled}>
      {children}
    </button>
  );
};
