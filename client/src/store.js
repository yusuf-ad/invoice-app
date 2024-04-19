// Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/users/userSlice";
import modalReducer from "./features/modalSlice";
import darkModeReducer from "./features/darkModeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    darkMode: darkModeReducer,
    modal: modalReducer,
  },
});

export default store;
