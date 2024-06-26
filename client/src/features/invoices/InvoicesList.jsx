import Loader from "../../ui/Loader/Loader";
import { Invoice } from "./Invoice";
import { useCreateInvoice } from "./useCreateInvoice";

function InvoicesList({ invoices, isLoading, error }) {
  const { isLoading: isCreating } = useCreateInvoice();

  if (isLoading) {
    return (
      <div className="mt-12 flex justify-center">
        <Loader />
      </div>
    );
  }

  if (!isLoading && error) {
    return (
      <div className="mt-12 text-xl text-black dark:text-skin-burntSienna">
        {error.message}
      </div>
    );
  }

  return (
    <ul className="space-y-4 py-12">
      {!isLoading &&
        invoices.map((invoice) => (
          <Invoice invoice={invoice} key={invoice._id} />
        ))}

      {isCreating && (
        <div className="flex w-full items-center justify-center">
          <Loader type={"medium"} />
        </div>
      )}
    </ul>
  );
}

export default InvoicesList;
