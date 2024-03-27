import { useMutation, useQueryClient } from "react-query";
import { login as loginAPI } from "../../services/apiAuth";

import { setCookie } from "../../utils/setCookie";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: async ({ username, password }) =>
      loginAPI({ username, password }),

    onSuccess: (data) => {
      const { data: user, token } = data;
      console.log("shalom");

      setCookie(token);

      queryClient.setQueryData("user", user);

      navigate("/app", { replace: true });
    },

    onError: (error) => {
      console.error("ERROR", error);
    },
  });

  return { login, isLoading };
}
