import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/bookings";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const page = Number(searchParams.get("page")) || 1;

  const statusFilter = status === "all" ? null : status;

  const { data, isLoading, error, isPlaceholderData } = useQuery({
    queryKey: ["bookings", { statusFilter, sortBy, page }],
    queryFn: () => getBookings({ status: statusFilter, sortBy, page }),
    placeholderData: (previousData) => previousData,
  });

  //PRE-FETCHING
  const pageCount = Math.ceil((data?.total ?? 0) / 10);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", { statusFilter, sortBy, page: page + 1 }],
      queryFn: () =>
        getBookings({ status: statusFilter, sortBy, page: page + 1 }),
      placeholderData: (previousData) => previousData,
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", { statusFilter, sortBy, page: page - 1 }],
      queryFn: () =>
        getBookings({ status: statusFilter, sortBy, page: page - 1 }),
      placeholderData: (previousData) => previousData,
    });
  }

  return {
    bookings: data?.data ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    totalPages: data?.totalPages ?? 1,
    isLoading,
    error,
    isPlaceholderData,
  };
}
