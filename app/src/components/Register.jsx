import { Eye, EyeOff } from "lucide-react";
import { Button } from "../components/Button";
import { Label } from "../components/Label";
import { Input } from "../components/Input";

export const Register = ({
  handleChange,
  handleSubmit,
  handleFileChange,
  showPassword,
  setShowPassword,
  avatarName,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="username" className="font-medium">
            User Name
          </Label>
          <Input
            id="username"
            type="text"
            name="username"
            onChange={(event) => handleChange(event)}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
          />
        </div>
        <div>
          <Label htmlFor="firstName" className="font-medium">
            First Name
          </Label>
          <Input
            id="firstName"
            type="text"
            name="firstName"
            onChange={(event) => handleChange(event)}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="font-medium">
            Last Name
          </Label>
          <Input
            id="lastName"
            type="text"
            name="lastName"
            onChange={(event) => handleChange(event)}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
          />
        </div>
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
        </div>
        <div>
          <Label htmlFor="avatar" className="font-medium">
            Avatar
          </Label>
          <div className="relative mt-2">
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              name="avatar"
              onChange={handleFileChange}
            />
            <label
              htmlFor="avatar"
              className="flex items-center justify-between cursor-pointer w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
            >
              <span>{avatarName}</span>
              <span className="text-sm font-medium text-black">
                Choose File
              </span>
            </label>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        className="inline-flex w-full h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
      >
        Create account
      </Button>
    </form>
  );
};
