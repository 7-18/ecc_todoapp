export const Button = ({ className, variant, size, type, children, onClick }) => {
  className = className || "";

  return (
    <button className={className} onClick={onClick} type={type || "button"}>
      {children}
    </button>
  );
};
