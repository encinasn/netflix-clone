import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovies from "@/hooks/useMovies";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";
import Head from "next/head";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovies();
  const { data: favorites = [] } = useFavorites();

  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <Head>
        <title>Home - Netflix</title>
      </Head>

      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="relative -top-10 z-10 flex flex-col gap-3 md:gap-8 pb-40 md:-top-[8%] lg:-top-[10%] xl:-top-[25%]">
        <MovieList title="Popular on Netflix" data={movies} />
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
