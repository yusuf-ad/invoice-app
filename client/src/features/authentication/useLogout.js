import { useMutation, useQueryClient } from "react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import { logout as logoutUser } from "../users/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutAPI,

    onSuccess: () => {
      dispatch(logoutUser());

      toast.success("Logged out successfully");

      // queryClient.invalidateQueries("user", "invoices", "invoice");

      navigate("/");
    },
  });

  return { logout, isLoading };
}
