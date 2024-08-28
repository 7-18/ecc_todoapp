import { Link } from "react-router-dom";

export const NavItem = ({ to, label, children, className }) => {
  className = className || "text-white hover:text-gray-300";
  return (
    <Link to={to} className={className}>
      {label || children}
    </Link>
  );
};
