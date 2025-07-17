import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function usePosicoes() {
  return useQuery({
    queryKey: ["posicoes"],
    queryFn: async () => {
      const { data } = await api.get("posicoes/");
      return data;
    },
  });
} 