import { useEffect } from "react";
import { getAllInvoices } from "./invoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { InvoicesList } from "../../components/UI/InvoicesList";
import { ButtonFilter } from "../../components/UI/ButtonFilter";
import { ButtonNewInvoice } from "../../components/UI/ButtonNewInvoice";
import { Header } from "../../components/UI/Header";
import { InvoicesCount } from "../../components/UI/InvoicesCount";

import { toggleModal } from "../modalSlice";
import { NewInvoiceModal } from "./NewInvoiceModal";

export default function InvoicesApp() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { invoices } = useSelector((state) => state.invoices);

  useEffect(() => {
    dispatch(getAllInvoices(token));
  }, [dispatch, token]);

  return (
    <>
      <div className="container mt-4 xl:mt-0 max-w-3xl">
        <Header styles="flex items-center gap-5">
          <InvoicesCount invoices={invoices} />

          <ButtonFilter />
          <ButtonNewInvoice toggleModal={toggleModal} dispatch={dispatch} />
        </Header>

        <InvoicesList invoices={invoices} />
      </div>

      {/* create new invoice form */}
      <NewInvoiceModal />
    </>
  );
}
