import { useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./pages/ProtectedRoute";

import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "./utils/BASE_URL";
import { useDispatch } from "react-redux";
import { loggedInUser, isUserLoading } from "./features/users/userSlice";
import InvoiceDetails from "./features/invoices/InvoiceDetails";
import InvoicesApp from "./features/invoices/InvoicesApp";
import AppLayout from "./components/UI/AppLayout";

const cookies = new Cookies();

function App() {
  // const dispatch = useDispatch();

  // const fetchLoggedInUser = useCallback(
  //   async (userId, token) => {
  //     try {
  //       const res = await fetch(`${BASE_URL}/api/v1/users/${userId}`);
  //       const { data } = await res.json();
  //       const user = { ...data.user, token };

  //       dispatch(loggedInUser(user));
  //     } catch (err) {
  //       alert("User doesn't exist anymore!");

  //       return cookies.remove("jwt");
  //     }
  //   },
  //   [dispatch]
  // );

  // const checkLoggedInUser = useCallback(() => {
  //   if (cookies.get("jwt")) {
  //     dispatch(isUserLoading());
  //     const decoded = jwtDecode(cookies.get("jwt"));
  //     fetchLoggedInUser(decoded.userId, cookies.get("jwt"));
  //   }
  // }, [dispatch, fetchLoggedInUser]);

  // useEffect(() => {
  //   checkLoggedInUser();
  // }, [checkLoggedInUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="app" element={<InvoicesApp />} />
          <Route path="app/invoice/:id" element={<InvoiceDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
