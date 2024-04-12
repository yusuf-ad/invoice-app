import { useMutation, useQueryClient } from "react-query";
import { updateInvoiceStatus as updateInvoiceStatusAPI } from "../../services/apiInvoices";
import { useParams } from "react-router-dom";

import { toast } from "react-hot-toast";

export function useUpdateInvoiceStatus() {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { mutate: updateStatus, isUpdating: isUpdatingStatus } = useMutation({
    mutationFn: () => updateInvoiceStatusAPI(id),

    onSuccess: () => {
      queryClient.invalidateQueries("invoice");
      toast.success("shalom");
    },

    onError: (error) => {
      toast.error(error.message || "Something went wrong.");
    },
  });

  return { updateStatus, isUpdatingStatus };
}
