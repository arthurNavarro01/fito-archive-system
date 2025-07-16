import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useEstantes() {
  return useQuery({
    queryKey: ["estantes"],
    queryFn: async () => {
      const { data } = await api.get("estantes/");
      return data;
    },
  });
} 