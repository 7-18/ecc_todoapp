import { useState } from "react";
import { Login } from "../components/Login";
import { NavItem } from "../components/NavItem";
import { useAuthStore } from "../hooks/useAuthStore";

export const LoginPage = () => {
  const { startLogin } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await startLogin(formValues.email, formValues.password);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col h-[83.5vh]">
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div className="text-center">
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Login
              </h3>
              <p>
                You don't have an account?
                <NavItem
                  to="/sign-up"
                  label="Register"
                  className="ml-1 text-black border-b hover:border-gray-500"
                />
              </p>
            </div>
          </div>
          <Login
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
          />
        </div>
      </main>
    </div>
  );
};
