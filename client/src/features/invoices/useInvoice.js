import { useQuery } from "react-query";
import { getInvoice } from "../../services/apiInvoices";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useInvoice() {
  const { id: invoiceId } = useParams();

  const { data, isLoading, error, isError } = useQuery(["invoice", invoiceId], {
    queryFn: () => getInvoice(invoiceId),

    onError: (error) => {
      console.log("deneme");
      toast.error(error.message);
      console.log(error);
    },
  });

  const { data: invoice } = data ?? {};

  return { invoice, isLoading, error, isError };
}
