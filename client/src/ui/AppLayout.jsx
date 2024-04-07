import NewInvoiceModal from "../features/invoices/NewInvoiceModal";
import AppHeader from "./AppHeader";

import { Outlet } from "react-router-dom";
import Modal from "./Modal/Modal";

function AppLayout() {
  return (
    <>
      <AppHeader />

      <main className="relative min-h-[calc(100vh-80px)] px-8 py-28 pb-14 xl:py-20">
        <Outlet />

        {/* create new invoice form */}
        <NewInvoiceModal />
        <Modal />
      </main>
    </>
  );
}

export default AppLayout;
