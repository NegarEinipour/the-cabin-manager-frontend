// features/cabins/hooks/useCabins.js
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getCabins } from "../../services/cabins";

export function useCabins() {
  const {
    data: cabins = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  //Only sorts when cabins changes
  const sortedCabins = useMemo(() => {
    return [...cabins].sort((a, b) => {
      const aName = a?.name || "";
      const bName = b?.name || "";
      const aBase = aName.replace(/^Copy of /, "");
      const bBase = bName.replace(/^Copy of /, "");
      const aIsCopy = aName.startsWith("Copy of ");
      const bIsCopy = bName.startsWith("Copy of ");

      if (aBase !== bBase) {
        return aBase.localeCompare(bBase);
      }

      if (!aIsCopy && bIsCopy) return -1;
      if (aIsCopy && !bIsCopy) return 1;

      return aName.localeCompare(bName);
    });
  }, [cabins]);

  return { cabins: sortedCabins, isLoading, error };
}
