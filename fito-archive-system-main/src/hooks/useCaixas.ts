import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useCaixas() {
  return useQuery({
    queryKey: ["caixas"],
    queryFn: async () => {
      const { data } = await api.get("caixas/");
      return data;
    },
  });
} 