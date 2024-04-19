import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";

import { deleteInvoice as deleteInvoiceAPI } from "../../services/apiInvoices";

export function useDeleteInvoice() {
  const queryClient = useQueryClient();

  const { mutate: deleteInvoice, isLoading: isDeleting } = useMutation({
    mutationFn: deleteInvoiceAPI,

    onSuccess: () => {
      toast.success("Invoice succesfully deleted.");

      queryClient.invalidateQueries("invoices");
    },

    onError: (error) => {
      console.log(error);
      toast.error(error.message || "An error occurred");
    },
  });

  return { deleteInvoice, isDeleting };
}
