import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function useMovies() {
  const { data, error, isLoading } = useSWR("/api/movies", fetcher, {
    revalidateIfStale: false,
    revalidateonFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, error, isLoading };
}
