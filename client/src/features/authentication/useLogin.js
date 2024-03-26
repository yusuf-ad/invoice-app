import { useMutation, useQueryClient } from "react-query";
import { login as loginAPI } from "../../services/apiAuth";

import { setCookie } from "../../utils/setCookie";

export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: async ({ username, password }) =>
      loginAPI({ username, password }),

    onSuccess: (data) => {
      if (data.status === "fail") {
        throw new Error(data.message);
      }

      const { data: user, token } = data;

      setCookie(token);

      queryClient.setQueryData("user", user);
    },

    onError: (error) => {
      console.error("ERROR", error);
    },
  });

  return { login, isLoading };
}
