import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  confirmSignUpAmplify,
  resendConfirmationCodeAmplify,
} from "../services/auth";
import { Label } from "./Label";
import { Input } from "./Input";
import { Button } from "./Button";

export const ConfirmationCode = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    setUsername(username);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCode(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await confirmSignUpAmplify(username, code);
      localStorage.removeItem("username");
      navigate("/sign-in");
    } catch (error) {
      if (error.name === "CodeMismatchException") {
        alert("The code is incorrect");
      } else if (error.name === "ExpiredCodeException") {
        alert("The code has expired. A new code has been sent to your email");
        await resendConfirmationCodeAmplify(username);
      } else if (error.name === "LimitExceededException") {
        alert("You have exceeded the number of attempts. Try again later");
      } else {
        alert("An error occurred. Please try again");
      }
    }
  };

  return (
    <div className="flex flex-col h-[83.5vh]">
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div className="text-center">
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Confirmation code
              </h3>
              <p>We have sent a code to your email</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  value={username}
                  disabled
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="code" className="font-medium">
                  Code
                </Label>
                <Input
                  id="code"
                  type="text"
                  name="code"
                  onChange={(event) => handleChange(event)}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
              >
                Confirm
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
