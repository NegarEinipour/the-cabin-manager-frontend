import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/auth";
import toast from "react-hot-toast";

export function useSignup() {
  //Creates a mutation. Returns an object with several properties
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("Account successfuly created");
    },
  });
  return { signup, isLoading };
}
