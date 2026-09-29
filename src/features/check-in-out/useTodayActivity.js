// features/dashboard/useTodayActivity.js
import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/bookings";

export function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });

  return { isLoading, activities };
}
