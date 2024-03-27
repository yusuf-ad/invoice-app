import { useMutation } from "react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import { logout as logoutUser } from "../users/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: (data) => {
      console.log(data);
      console.log("Logged out successfully");

      dispatch(logoutUser());

      navigate("/");
    },
  });

  return { logout, isLoading };
}
