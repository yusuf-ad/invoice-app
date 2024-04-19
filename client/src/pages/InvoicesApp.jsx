// Features
import InvoicesList from "../features/invoices/InvoicesList";
import { InvoicesCount } from "../features/invoices/InvoicesCount";
import { useInvoices } from "../features/invoices/useInvoices";

// UI
import { ButtonNewInvoice } from "../ui/ButtonNewInvoice";
import { Header } from "../ui/Header";

// Other
import Filter from "../ui/Filter";

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

          <Filter />
          <ButtonNewInvoice />
        </Header>

        <InvoicesList invoices={invoices?.invoices} isLoading={isLoading} />
      </div>
    </>
  );
}
