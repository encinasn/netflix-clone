import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function useBillboard() {
  const { data, error, isLoading } = useSWR("/api/random", fetcher, {
    revalidateIfStale: false,
    revalidateonFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, error, isLoading };
}
