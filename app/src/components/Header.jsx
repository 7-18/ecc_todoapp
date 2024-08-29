import { useAuthStore } from "../hooks/useAuthStore";
import { Button } from "./Button";
import { NavItem } from "./NavItem";
import { LogOut, BookOpenCheck } from "lucide-react";

export const Header = ({ status, pathname }) => {
  const { user, startLogout } = useAuthStore();
  const NAV_ITEMS_NOT_AUTHENTICATE = [
    { to: "/", label: "Home" },
    { to: "/sign-in", label: "Login" },
    { to: "/sign-up", label: "Sign Up" },
  ];

  const NAV_ITEMS_AUTHENTICATE = [
    { to: "/tasks", label: "Tasks" },
    { to: "/images", label: "Images" },
  ];

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <NavItem className="flex items-center justify-center" to="/">
        <BookOpenCheck className="h-6 w-6" />
        <span className="sr-only">Kevin Brian Briceno</span>
      </NavItem>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {status === "authenticated" ? (
          <>
            {NAV_ITEMS_AUTHENTICATE.map((item, i) => (
              <NavItem
                key={i}
                to={item.to}
                label={item.label}
                className={
                  "text-sm font-medium hover:underline underline-offset-4"
                }
              />
            ))}
            <Button variant="ghost" size="icon" onClick={startLogout}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Logout</span>
            </Button>
          </>
        ) : (
          <>
            {NAV_ITEMS_NOT_AUTHENTICATE.map((item, i) => (
              <NavItem
                key={i}
                to={item.to}
                label={item.label}
                className={
                  "text-sm font-medium hover:underline underline-offset-4"
                }
              />
            ))}
          </>
        )}
      </nav>
    </header>
  );
};
