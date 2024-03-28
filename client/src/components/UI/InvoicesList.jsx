import Loader from "./Loader/Loader";
import { Invoice } from "./Invoice";

export function InvoicesList({ invoices, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex justify-center mt-12">
        <Loader />
      </div>
    );
  }

  return (
    <ul className="py-12 space-y-4">
      {!isLoading &&
        invoices.map((invoice) => (
          <Invoice invoice={invoice} key={invoice._id} />
        ))}
    </ul>
  );
}
