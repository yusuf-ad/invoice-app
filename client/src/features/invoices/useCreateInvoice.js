import { useMutation, useQueryClient } from "react-query";
import { createInvoice as createInvoiceAPI } from "../../services/apiInvoices";
import toast from "react-hot-toast";

export function useCreateInvoice() {
  const queryClient = useQueryClient();

  const { mutate: createInvoice, isLoading } = useMutation({
    mutationFn: createInvoiceAPI,

    onSuccess: (data) => {
      console.log(data);
      toast.success("Invoice created successfully");

      queryClient.invalidateQueries("invoices");
    },

    onError: (error) => {
      console.log(error);
      toast.error("An error occurred");
    },
  });

  return { createInvoice, isLoading };
}
