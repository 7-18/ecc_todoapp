import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onChecking, onLogout, onLogin } from "../state";

import { jwtDecode } from "jwt-decode";
import { signInAmplify, signOutAmplify } from "../services/auth";
import { getUserByEmail } from "../services/httpClient";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async (email, password) => {
    dispatch(onChecking());
    try {
      const { isSignedIn } = await signInAmplify(email, password);
      if (isSignedIn) {
        const poolClientId = import.meta.env.VITE_URL_AWS_USERPOOLWEBCLIENTID;
        const amazonCognitoProtocol = `CognitoIdentityServiceProvider.${poolClientId}.`;
        const userCredentials = localStorage.getItem(
          `${amazonCognitoProtocol}LastAuthUser`
        );
        const accessToken = localStorage.getItem(
          `${amazonCognitoProtocol}${userCredentials}.idToken`
        );
        const refreshToken = localStorage.getItem(
          `${amazonCognitoProtocol}${userCredentials}.refreshToken`
        );
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        const decodedToken = jwtDecode(accessToken);
        localStorage.setItem(
          "decodedToken",
          JSON.stringify({
            username: decodedToken["cognito:username"],
            email: decodedToken.email,
            name: decodedToken.given_name,
            lastName: decodedToken.family_name,
            sub: decodedToken.sub,
            id: decodedToken["custom:id"],
          })
        );

        dispatch(onLogin({ accessToken, refreshToken, decodedToken }));
      }
    } catch (error) {
      dispatch(onLogout(error));

      alert(error);

      console.log({ error });
    }
  };

  const checkAuthToken = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const decodedToken = localStorage.getItem("decodedToken");
      const email = JSON.parse(decodedToken).email;
      if (!accessToken) return dispatch(onLogout());
      const { data } = await getUserByEmail(email)
      if (!data) return dispatch(onLogout());

      dispatch(
        onLogin({
          accessToken,
          refreshToken,
          decodedToken: data,
        })
      );
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    signOutAmplify();
    dispatch(onLogout());
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startLogout,
    checkAuthToken,
  };
};
