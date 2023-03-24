import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

export default function InfoModal({ visible, onClose }: InfoModalProps) {
  const [isVisible, setIsVisible] = useState(visible);

  const { movieId } = useInfoModal();
  const { data = {} } = useMovie(movieId as string);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
      <div
        className="fixed h-screen w-screen bg-black bg-opacity-80 transition duration-300"
        onClick={handleClose}
      />

      <div className="relative top-[10%] mx-auto w-auto max-w-4xl overflow-hidden rounded-t-lg">
        <div
          className={`relative h-full flex-auto transform bg-zinc-900 drop-shadow-md duration-300 ${
            isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <div className="relative aspect-video w-full">
            <video
              className="h-full w-full object-cover brightness-[60%]"
              poster={data?.thumbnailUrl}
              src={data?.videoUrl}
              autoPlay
              muted
              loop
            ></video>
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black bg-opacity-70"
            >
              <AiOutlineClose className="text-white" size={20} />
            </button>

            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-zinc-900 to-transparent px-10 pb-[8%]">
              <p className="mb-8 h-full text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {data?.title}
              </p>
              <div className="flex flex-row items-center gap-4">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>

          <div className="px-12 pb-8 pt-4">
            <p className="text-lg font-semibold text-green-400">New</p>

            <p className="mt-4 flex flex-row items-center gap-2 text-lg text-white">
              <span>{data?.genre}</span>
              <span className="opacity-30">•</span>
              <span>{data?.duration}</span>
            </p>

            <p className="mt-8 text-lg text-white">{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
