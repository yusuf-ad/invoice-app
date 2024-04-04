import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
