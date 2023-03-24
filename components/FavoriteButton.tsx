import useFavorites from "@/hooks/useFavorites";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { BiCheck, BiPlus } from "react-icons/bi";

interface FavoriteButtonProps {
  movieId: string;
}

export default function FavoriteButton({ movieId }: FavoriteButtonProps) {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate: mutateUser } = useUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorite = useCallback(async () => {
    const response = await axios({
      method: isFavorite ? "delete" : "post",
      url: "/api/favorite",
      data: { movieId },
    });

    const updatedFavorites = response?.data?.favoriteIds;

    mutateUser({ ...currentUser, favoriteIds: updatedFavorites });
    mutateFavorites();
  }, [currentUser, movieId, isFavorite, mutateFavorites, mutateUser]);

  const Icon = isFavorite ? BiCheck : BiPlus;

  return (
    <div
      className="group/item flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-white text-white transition hover:border-neutral-300 lg:h-10 lg:w-10"
      onClick={toggleFavorite}
    >
      <Icon size={24} />
    </div>
  );
}
