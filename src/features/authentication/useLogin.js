// useLogin.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginApi } from "../../services/auth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      toast.success("Logged in successfully");
      queryClient.setQueryData(["user"], data.data?.user ?? null);
      //setQueryData(key, value) = "put value at key in the dictionary."
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      const message = err.response?.data?.message || err.message;
      alert(message);
      console.error(err);
    },
  });

  return { login, isLoggingIn };
}
