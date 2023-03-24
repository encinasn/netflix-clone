import useBillboard from "@/hooks/useBillboard";
import useInfoModal from "@/hooks/useInfoModal";
import { useCallback } from "react";

import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";

export default function Billboard() {
  const { data } = useBillboard();

  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  return (
    <div className="relative aspect-video h-auto w-full">
      <div className="absolute bottom-0 left-0 z-10 h-1/4 w-full bg-gradient-to-t from-zinc-900 to-transparent" />

      <video
        className="aspect-video h-auto w-full object-cover brightness-[60%] "
        autoPlay
        muted
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      ></video>

      <div className="absolute top-[30%] ml-4 md:top-[40%] md:ml-16">
        <p className="h-full w-1/2 text-xl font-bold text-white drop-shadow-xl md:text-5xl lg:text-6xl ">
          {data?.title}
        </p>

        <p className="mt-3 w-[90%] text-[8px] text-white drop-shadow-xl md:mt-8 md:w-[80%] md:text-lg lg:w-[50%]">
          {data?.description}
        </p>

        <div className="mt-3 flex flex-row items-center gap-3 md:mt-4">
          <PlayButton movieId={data?.id} />

          <button
            className="flex min-h-[32px] w-auto flex-row items-center rounded-md bg-white bg-opacity-30 py-1 px-2 text-xs font-semibold text-white transition hover:bg-opacity-20 md:py-2 md:px-4 lg:text-lg"
            onClick={handleOpenModal}
          >
            <AiOutlineInfoCircle className="mr-1" size={24} />
            More info
          </button>
        </div>
      </div>
    </div>
  );
}
