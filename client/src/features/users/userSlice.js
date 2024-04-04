import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  status: localStorage.getItem("status")
    ? JSON.parse(localStorage.getItem("status"))
    : "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = { ...action.payload, isAuthenticated: true };
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));

      state.status = "success";
      localStorage.setItem("status", JSON.stringify(state.status));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");

      state.status = "idle";
      localStorage.setItem("status", JSON.stringify(state.status));
    },
    authLoading: (state) => {
      state.status = "loading";
    },
    authError: (state) => {
      state.status = "error";
    },
  },
});

export const { login, logout, authError, authLoading } = userSlice.actions;

export default userSlice.reducer;
