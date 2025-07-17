import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useAndares() {
  return useQuery({
    queryKey: ["andares"],
    queryFn: async () => {
      const { data } = await api.get("andares/");
      return data;
    },
  });
} 