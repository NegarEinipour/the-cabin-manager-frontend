import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePassword as updatePasswordApi } from "../../services/auth";

export function useUpdatePassword() {
  const { mutate: updatePassword, isPending: isUpdatingPassword } = useMutation(
    {
      mutationFn: updatePasswordApi,
      onSuccess: () => toast.success("Password updated successfully"),
      onError: (err) =>
        toast.error(err.response?.data?.message || "Update failed"),
    },
  );

  return { updatePassword, isUpdatingPassword };
}
