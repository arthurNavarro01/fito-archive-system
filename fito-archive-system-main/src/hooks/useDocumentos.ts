import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useDocumentos() {
  return useQuery({
    queryKey: ["documentos"],
    queryFn: async () => {
      const { data } = await api.get("documentos/");
      return data;
    },
  });
} 