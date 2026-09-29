// features/cabins/hooks/useCreateCabin.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCabin as createCabinApi } from "../../services/cabins";

export function useCreateCabin() {
  // ← Named export
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: (newCabin) => {
      toast.success("New cabin successfully created");
      queryClient.setQueryData(["cabins"], (oldData) => {
        if (!oldData) return [newCabin];
        return [...oldData, newCabin];
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create cabin");
    },
  });

  return { createCabin, isCreating };
}
