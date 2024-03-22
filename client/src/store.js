// Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/users/userSlice";
import invoiceReducer from "./features/invoices/invoiceSlice";
import modalReducer from "./features/modalSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    invoices: invoiceReducer,
    modal: modalReducer,
  },
});

export default store;
