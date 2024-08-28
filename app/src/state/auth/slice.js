import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking",
    user: {
      id: null,
      username: null,
      email: null,
      firstName: null,
      lastName: null,
    },
    accessToken: null,
    refreshToken: null,
    errorMessage: undefined,
  },

  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.accessToken = null;
      state.refreshToken = null;
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      const { accessToken, refreshToken, decodedToken } = payload;
      state.user = decodedToken;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.status = "authenticated";
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;
