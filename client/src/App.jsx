import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./pages/ProtectedRoute";

import InvoiceDetails from "./features/invoices/InvoiceDetails";
import InvoicesApp from "./pages/InvoicesApp";
import AppLayout from "./ui/AppLayout";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />

          <Route path="" element={<ProtectedRoute />}>
            <Route path="app" element={<InvoicesApp />} />
            <Route path="app/invoice/:id" element={<InvoiceDetails />} />
            <Route path="app/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>

      <Toaster />
    </BrowserRouter>
  );
}

export default App;
