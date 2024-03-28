import { InvoicesList } from "../components/UI/InvoicesList";
import { ButtonFilter } from "../components/UI/ButtonFilter";
import { ButtonNewInvoice } from "../components/UI/ButtonNewInvoice";
import { Header } from "../components/UI/Header";
import { InvoicesCount } from "../components/UI/InvoicesCount";

import { toggleModal } from "../features/modalSlice";
import { NewInvoiceModal } from "../features/invoices/NewInvoiceModal";
import { useGetInvoices } from "../features/invoices/useGetInvoices";

export default function InvoicesApp() {
  const { invoices, invoicesLength, isLoading, error } = useGetInvoices();

  if (!isLoading && error) {
    return <div>error</div>;
  }

  return (
    <>
      <div className="container mt-4 xl:mt-0 max-w-3xl">
        <Header styles="flex items-center gap-5">
          <InvoicesCount invoicesLength={invoicesLength} />

          <ButtonFilter />
          <ButtonNewInvoice toggleModal={toggleModal} />
        </Header>

        <InvoicesList invoices={invoices?.invoices} isLoading={isLoading} />
      </div>

      {/* create new invoice form */}
      <NewInvoiceModal />
    </>
  );
}
