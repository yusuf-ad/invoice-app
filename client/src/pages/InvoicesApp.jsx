// Features
import InvoicesList from "../features/invoices/InvoicesList";
import { InvoicesCount } from "../features/invoices/InvoicesCount";
import { useInvoices } from "../features/invoices/useInvoices";

// UI
import { ButtonNewInvoice } from "../ui/ButtonNewInvoice";
import { Header } from "../ui/Header";

// Other
import Filter from "../ui/Filter";
import { useSearchParams } from "react-router-dom";

const filters = ["draft", "pending", "paid"];

export default function InvoicesApp() {
  const { invoices, isLoading, error } = useInvoices();
  const [searchParams] = useSearchParams();

  // 1) filter invoices
  const activeFilters = filters.filter(
    (filter) => searchParams.get(filter) === "true",
  );

  // 2) filter invoices
  const filteredInvoices = invoices?.invoices?.filter((invoice) => {
    if (activeFilters.length === 0) return true;

    return activeFilters.includes(invoice.status);
  });

  if (!isLoading && error) {
    return <div>error</div>;
  }

  return (
    <>
      <div className="container mt-4 max-w-3xl xl:mt-0">
        <Header styles="flex items-center gap-5">
          <InvoicesCount invoicesLength={filteredInvoices?.length} />

          <Filter />
          <ButtonNewInvoice />
        </Header>

        <InvoicesList invoices={filteredInvoices} isLoading={isLoading} />
      </div>
    </>
  );
}
