import { useMutation, useQueryClient } from "react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import { login as authenticateUser } from "../users/userSlice";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export function useSignUp() {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupAPI,

    onSuccess: (data) => {
      const { data: user } = data;

      toast.success("Signup successfully");

      queryClient.setQueryData("user", user);

      dispatch(authenticateUser(user.user));
    },

    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return { signup, isLoading };
}
