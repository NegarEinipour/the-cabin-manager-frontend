import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "../../services/socket";

export function useCabinsRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    function invalidate() {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    }

    socket.on("cabin:created", invalidate);
    socket.on("cabin:updated", invalidate);
    socket.on("cabin:deleted", invalidate);

    return () => {
      socket.off("cabin:created", invalidate);
      socket.off("cabin:updated", invalidate);
      socket.off("cabin:deleted", invalidate);
    };
  }, [queryClient]);
}
