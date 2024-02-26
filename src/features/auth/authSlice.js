import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authApi";

const initialState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;

export const getUser = (state) => {
  return state.auth.user;
};

export const getAuthLoading = (state) => {
  return state.auth.isLoading;
};

export const getAuthError = (state) => {
  return state.auth.error;
};

export const getIsLoggedIn = (state) => {
  return state.auth.isLoggedIn;
};
