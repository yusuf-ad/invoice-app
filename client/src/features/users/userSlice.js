import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  photo: "",
  username: "",
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { fullName, email, photo, username } = action.payload;

      state.fullName = fullName;
      state.email = email;
      state.photo = photo;
      state.username = username;
      state.isAuthenticated = true;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
