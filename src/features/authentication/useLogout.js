// useLogout.js
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/auth";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function logout() {
    logoutApi(); // removes the token
    queryClient.removeQueries(); // clears the cache
    navigate("/login", { replace: true });
  }

  return { logout };
}
