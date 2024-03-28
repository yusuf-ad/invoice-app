import { useQuery } from "react-query";
import { getAllInvoices } from "../../services/apiInvoices";
import { toast } from "react-hot-toast";

export function useInvoices() {
  const { data, isLoading, error } = useQuery("invoices", {
    queryFn: getAllInvoices,

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { data: invoices, results: invoicesLength } = data ?? {};

  return { invoices, invoicesLength, isLoading, error };
}
