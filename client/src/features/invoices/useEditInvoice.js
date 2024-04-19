import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { updateInvoice } from "../../services/apiInvoices";
import toast from "react-hot-toast";

export function useEditInvoice() {
  const { id: invoiceId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: editInvoice, isLoading: isEditing } = useMutation({
    mutationKey: invoiceId,
    mutationFn: updateInvoice,

    onSuccess: (invoice) => {
      console.log(invoice);
      toast.success("Invoice edit successfully");

      queryClient.invalidateQueries(["invoice", invoiceId]);
      queryClient.setQueryData(invoiceId, invoice.data);
    },

    onError: (error) => {
      console.log(error);
      toast.error("An error occurred");
    },
  });

  return { editInvoice, isEditing };
}
