export const Label = ({ className, children }) => {
  className = className || "";

  return <label className={className}>{children}</label>;
};
