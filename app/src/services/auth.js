import { signUp, signIn, signOut, confirmSignUp, resendSignUpCode } from "aws-amplify/auth";

export const signUpAmplify = async (user, password) => {
  try {
    return await signUp({
      username: user.username,
      password,
      options: {
        userAttributes: {
          email: user.email,
          given_name: user.firstName,
          family_name: user.lastName,
        },
        autoSignIn: true,
      },
    });
  } catch (error) {
    console.error("Error al registrarse: ", error);
    throw error;
  }
};

export const signInAmplify = async (email, password) => {
  const sign = await signIn({ username: email, password: password });
  return sign;
};

export const signOutAmplify = async () => {
  return await signOut();
};

export const confirmSignUpAmplify = async (email, code) => {
  return await confirmSignUp({
    username: email,
    confirmationCode: code,
  });
};

export const resendConfirmationCodeAmplify = async (username) => {
  return await resendSignUpCode({ username: username });
}