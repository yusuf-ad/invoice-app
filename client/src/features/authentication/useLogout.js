import { useMutation } from "react-query";
import { logout as logoutAPI } from "../../services/apiAuth";

export function useLogout() {
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: (data) => {
      console.log(data);
      console.log("Logged out successfully");
    },
  });

  return { logout, isLoading };
}
