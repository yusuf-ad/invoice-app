import { useQuery, useQueryClient } from "react-query";
import { getInvoice } from "../../services/apiInvoices";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useInvoice() {
  const { id: invoiceId } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading, error, isError } = useQuery(["invoice", invoiceId], {
    queryFn: () => getInvoice(invoiceId),

    onSuccess: (invoice) => {
      queryClient.setQueryData("invoice", invoice.data);
    },

    onError: (error) => {
      console.log("deneme");
      toast.error(error.message);
      console.log(error);
    },
  });

  const { data: invoice } = data ?? {};

  return { invoice, isLoading, error, isError };
}
