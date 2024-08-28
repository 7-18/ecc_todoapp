import { NavItem } from "./NavItem";

export const Footer = () => {
  const FOOTER_ITEMS = [
    { label: "Terms of Service", to: "/" },
    { label: "Privacy Policy", to: "/" },
  ];

  const actualYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-2 sm:flex-row sm:justify-center py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500">
        © {actualYear} Kevin Brian Briceno. All rights reserved.
      </p>
      <nav className="lg:ml-auto flex gap-4 sm:gap-6 sm:m-0">
        {FOOTER_ITEMS.map((item, i) => (
          <NavItem
            key={i}
            to={item.to}
            label={item.label}
            className={"text-xs hover:underline underline-offset-4"}
          />
        ))}
      </nav>
    </footer>
  );
};
