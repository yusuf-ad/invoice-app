import { useMutation, useQueryClient } from "react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import {
  authError,
  authLoading,
  logout as logoutUser,
} from "../users/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutAPI,

    onMutate: () => {
      dispatch(authLoading());
    },

    onSuccess: () => {
      dispatch(logoutUser());

      queryClient.clear();

      toast.success("Logged out successfully");

      navigate("/");
    },

    onError: () => {
      toast.error("Failed to logout");

      dispatch(logoutUser());

      navigate("/");

      dispatch(authError());
    },
  });

  return { logout, isLoading };
}
