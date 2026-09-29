import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/cabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isPending: isDeleting } = useMutation({
    // mutationFn: () => deleteCabinApi(cabinId),
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Cabin deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete cabin");
    },
  });

  return { isDeleting, deleteCabin };
}
