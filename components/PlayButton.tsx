import { useRouter } from "next/router";
import { BsFillPlayFill } from "react-icons/bs";

interface PlayButtonProps {
  movieId: string;
}

export default function PlayButton({ movieId }: PlayButtonProps) {
  const router = useRouter();
  return (
    <button
      className="flex min-h-[32px] w-auto items-center justify-center rounded-md bg-white py-1 px-2 text-xs font-semibold transition hover:bg-neutral-300 md:py-2 md:px-4 lg:text-lg"
      onClick={() => router.push(`/watch/${movieId}`)}
    >
      <BsFillPlayFill size={24} className="mr-1 -ml-1" />
      Play
    </button>
  );
}
