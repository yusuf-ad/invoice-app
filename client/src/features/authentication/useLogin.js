import { useMutation, useQueryClient } from "react-query";

import { login as loginAPI } from "../../services/apiAuth";
import { login as authenticateUser } from "../users/userSlice";

import { useDispatch } from "react-redux";

import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ username, password }) => loginAPI({ username, password }),

    onSuccess: (data) => {
      const { data: user } = data;

      queryClient.setQueryData("user", user);

      toast.success("Logged in successfully!");

      dispatch(authenticateUser(user.user));
    },

    onError: (error) => {
      toast.error(error.message);
      console.error("ERROR", error);
    },
  });

  return { login, isLoading };
}
