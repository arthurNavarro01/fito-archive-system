import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useRuas() {
  return useQuery({
    queryKey: ["ruas"],
    queryFn: async () => {
      const { data } = await api.get("ruas/");
      return data;
    },
  });
} 