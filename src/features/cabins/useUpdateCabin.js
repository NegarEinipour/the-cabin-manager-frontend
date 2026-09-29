import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCabin as updateCabinApi } from "../../services/cabins";

export function useUpdateCabin() {
  // 1. Define queryClient first
  const queryClient = useQueryClient();

  // 2. mutationFn should be a function that expects parameters
  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, cabinData }) => updateCabinApi({ id, cabinData }),
    onSuccess: () => {
      toast.success("Cabin updated!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to save cabin");
    },
  });

  return { updateCabin, isUpdating };
}
