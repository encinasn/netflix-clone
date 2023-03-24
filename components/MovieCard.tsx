import { MovieInterface } from "@/types";

import useInfoModal from "@/hooks/useInfoModal";
import { useRouter } from "next/router";
import { BsFillPlayFill } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import FavoriteButton from "./FavoriteButton";

interface MovieCardProps {
  data: MovieInterface;
}

export default function MovieCard({ data }: MovieCardProps) {
  const router = useRouter();
  const { openModal } = useInfoModal();

  return (
    <div className="md:col-span group relative aspect-video h-auto w-full min-w-[180px] rounded-md bg-zinc-900">
      <img
        className="duration aspect-video h-auto w-full cursor-pointer rounded-md object-cover shadow-xl transition delay-300 group-hover:opacity-90 sm:group-hover:opacity-0"
        src={data?.thumbnailUrl}
        alt={data?.title}
      />

      <div className="invisible absolute top-0 z-10 w-full scale-0 opacity-0 transition delay-300 duration-200 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:scale-110 group-hover:opacity-100 sm:visible">
        <img
          className="duration h-[12vw] w-full cursor-pointer rounded-t-md object-cover shadow-xl transition"
          src={data?.thumbnailUrl}
          alt={data?.title}
        />
        <div className="absolute z-10 w-full rounded-b-md bg-zinc-800 p-2 shadow-md transition lg:p-4">
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={() => router.push(`/watch/${data?.id}`)}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white transition hover:bg-neutral-300 lg:h-10 lg:w-10"
            >
              <BsFillPlayFill size={30} className="ml-0.5" />
            </div>

            <FavoriteButton movieId={data?.id} />

            <button
              className="ml-auto flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-white transition hover:border-neutral-300 hover:text-neutral-300 lg:h-10 lg:w-10"
              onClick={() => openModal(data?.id)}
            >
              <BiChevronDown size={30} />
            </button>
          </div>

          <p className="mt-4 font-semibold text-green-400">
            New <span className="text-white">2023</span>
          </p>

          <p className="mt-4 flex flex-row items-center gap-2 text-[10px] text-white lg:text-sm">
            <span>{data?.genre}</span>
            <span className="opacity-30">•</span>
            <span>{data?.duration}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
