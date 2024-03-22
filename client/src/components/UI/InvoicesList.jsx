import Loader from "./Loader/Loader";
import { useSelector } from "react-redux";
import { Invoice } from "./Invoice";

export function InvoicesList() {
  const { isLoading, invoices } = useSelector((state) => state.invoices);

  return (
    <ul className="py-12 space-y-4">
      {isLoading && (
        <div className="absolute center-xy">
          <Loader />
        </div>
      )}

      {!isLoading &&
        invoices.map((invoice) => (
          <Invoice invoice={invoice} key={invoice._id} />
        ))}
    </ul>
  );
}
