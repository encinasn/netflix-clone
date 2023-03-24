import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function useFavorites() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/movies/favorites",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateonFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading, mutate };
}
