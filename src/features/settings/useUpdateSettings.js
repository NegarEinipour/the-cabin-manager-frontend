import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSettings as updateSettingsApi } from "../../services/settings";

export function useUpdateSettings() {
  // 1. Define queryClient first
  const queryClient = useQueryClient();

  // 2. mutationFn should be a function that expects parameters
  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: (settingsData) => updateSettingsApi(settingsData),
    onSuccess: () => {
      toast.success("settings successfully updated!");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to save settings");
    },
  });

  return { updateSettings, isUpdating };
}
