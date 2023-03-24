import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function useMovie(id: string) {
  const { data, error, isLoading } = useSWR(
    id ? `/api/movies/${id}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateonFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading };
}
