import { InvoicesList } from "../features/invoices/InvoicesList";
import { ButtonFilter } from "../ui/ButtonFilter";
import { ButtonNewInvoice } from "../ui/ButtonNewInvoice";
import { Header } from "../ui/Header";
import { InvoicesCount } from "../features/invoices/InvoicesCount";

import { toggleModal } from "../features/modalSlice";
import NewInvoiceModal from "../features/invoices/NewInvoiceModal";
import { useInvoices } from "../features/invoices/useInvoices";

export default function InvoicesApp() {
  const { invoices, invoicesLength, isLoading, error } = useInvoices();

  if (!isLoading && error) {
    return <div>error</div>;
  }

  return (
    <>
      <div className="container mt-4 max-w-3xl xl:mt-0">
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
