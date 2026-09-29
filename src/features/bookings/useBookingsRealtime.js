// useBookingsRealtime.js
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "../../services/socket";

export function useBookingsRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    function invalidate() {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    }

    socket.on("booking:deleted", invalidate);
    socket.on("booking:updated", invalidate);

    return () => {
      socket.off("booking:deleted", invalidate);
      socket.off("booking:updated", invalidate);
    };
  }, [queryClient]);
}
