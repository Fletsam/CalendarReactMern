import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "template",
  initialState: {
    status: "checking",
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    onChecking: (state /* action*/) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not.auth";
      state.user = {};
      state.errorMessage = payload;
    },
    clearMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});
export const { onChecking, onLogin, onLogout, clearMessage } =
  authSlice.actions;
