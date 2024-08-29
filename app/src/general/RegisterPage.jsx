import { useState } from "react";
import { NavItem } from "../components/NavItem";
import { uploadImage } from "../services/s3Images";
import { createUser } from "../services/httpClient";
import { Register } from "../components/Register";
import { signUpAmplify } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarName, setAvatarName] = useState("No file selected");
  const [formValues, setFormValues] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar: "",
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
    setLoading(true);

    if (formValues.avatar) {
      try {
        const uploadResponse = await uploadImage(formValues.avatar);
        const jsonResponse = JSON.parse(uploadResponse.body);

        if (uploadResponse.statusCode === 200) {
          const response = await createUser({
            username: formValues.username.toLowerCase(),
            firstName: formValues.firstName.toLowerCase(),
            lastName: formValues.lastName.toLowerCase(),
            email: formValues.email.toLowerCase(),
            avatar: jsonResponse.imageUrl,
            status: true,
          });

          await signUpAmplify(
            {
              id: response.data.id,
              username: formValues.username.toLowerCase(),
              email: formValues.email.toLowerCase(),
              firstName: formValues.firstName.toLowerCase(),
              lastName: formValues.lastName.toLowerCase(),
            },
            formValues.password
          );

          setLoading(false);
          if (response.statusCode === 201) {
            alert("User created successfully");
            localStorage.setItem("username", formValues.username.toLowerCase());
            navigate("/confirm-sign-up");
          } else {
            alert("User not created. Please try again");
          }
        } else {
          setLoading(false);
          alert("Error uploading image");
        }
      } catch (error) {
        setLoading(false);
        if (error?.response?.data?.error === "Validation error") {
          alert("Error: the user already exists");
        } else {
          alert("Error creating user: " + error?.response?.data?.error);
        }
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Image = reader.result.split(",")[1];
        setAvatarName(file.name);
        setFormValues({
          ...formValues,
          avatar: {
            base64: base64Image,
            name: file.name,
          },
        });
      };
      reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
      };
    }
  };

  return (
    <div className="flex flex-col h-[83.5vh]">
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div className="text-center">
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Sign up
              </h3>
              <p>
                Already have an account?
                <NavItem
                  to="/sign-in"
                  label="Login"
                  className="ml-1 text-black border-b hover:border-gray-500"
                />
              </p>
            </div>
          </div>
          <Register
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleFileChange={handleFileChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            avatarName={avatarName}
          />
        </div>
      </main>
      {loading && (
        <Loading message="Creating user..." className="fixed inset-0 z-50" />
      )}
    </div>
  );
};
