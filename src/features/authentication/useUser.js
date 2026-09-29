import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/users";

export function useUser() {
  // useQuery — "read from the cache. If it's empty or stale, go fetch it."
  // setQueryData — "write directly into the cache. Don't fetch anything."
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  //!! it converts any value to a boolean.
  return { isLoading, user, isAuthenticated: !!user };
}
