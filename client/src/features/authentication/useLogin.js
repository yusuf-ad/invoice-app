import { useMutation, useQueryClient } from "react-query";
import { login as loginAPI } from "../../services/apiAuth";

import { setCookie } from "../../utils/setCookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: async ({ username, password }) =>
      loginAPI({ username, password }),

    onSuccess: (data) => {
      const { data: user, token } = data;

      setCookie(token);

      queryClient.setQueryData("user", user);

      toast.success("Logged in successfully!");

      navigate("/app", { replace: true });
    },

    onError: (error) => {
      toast.error(error.message);
      console.error("ERROR", error);
    },
  });

  return { login, isLoading };
}
