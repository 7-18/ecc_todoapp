import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "./Button";
import { Input } from "./Input";
import { updateUser } from "../services/httpClient";
import { Camera } from "lucide-react";
import { Label } from "./Label";

export const ModalProfile = ({ handleClickOutside }) => {
  const { user } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await updateUser({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar,
        status: true,
      });
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClickOutside}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-96 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Profile</h2>
        <div className="relative flex flex-col items-center mb-4">
          <img
            src={avatar}
            alt={user.username}
            className="h-20 w-20 rounded-full mb-2"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://demofree.sirv.com/nope-not-here.jpg";
            }}
            loading="lazy"
          />
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <div className="absolute ">
            <Label htmlFor="avatar">
              <Button
                className="h-20 w-20 inset-0 flex items-center justify-center bg-black bg-opacity-10 rounded-full text-gray-500 hover:bg-opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 transform transition-transform duration-300"
                style={{ opacity: 0.3 }}
              >
                <Camera className="h-8 w-8" />
              </Button>
            </Label>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Username:
            </Label>
            <Input
              type="text"
              value={user.username}
              disabled
              className="mt-1 w-full px-3 py-2 text-gray-500 bg-gray-100 rounded-lg"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              First Name:
            </Label>
            <Input
              type="text"
              value={user.firstName}
              disabled
              className="mt-1 w-full px-3 py-2 text-gray-500 bg-gray-100 rounded-lg"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Last Name:
            </Label>
            <Input
              type="text"
              value={user.lastName}
              disabled
              className="mt-1 w-full px-3 py-2 text-gray-500 bg-gray-100 rounded-lg"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Email:
            </Label>
            <Input
              type="email"
              value={user.email}
              disabled
              className="mt-1 w-full px-3 py-2 text-gray-500 bg-gray-100 rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button className="inline-flex w-full h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
