import { Eye, EyeOff } from "lucide-react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { Link } from "react-router-dom";

export const Login = ({
  handleChange,
  handleSubmit,
  setShowPassword,
  showPassword,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label htmlFor="email" className="font-medium">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          name="email"
          onChange={(event) => handleChange(event)}
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
        />
      </div>
      <div>
        <Label htmlFor="password" className="font-medium">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={(event) => handleChange(event)}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-7 right-2 transform -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>
        <div className="text-xs text-right pt-2">
          <Link to="" className="text-sm">
            Forgot password?
          </Link>
        </div>
      </div>
      <Button
        type="submit"
        className="inline-flex w-full h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
      >
        Login
      </Button>
    </form>
  );
};
