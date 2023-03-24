import { MovieInterface } from "@/types";

import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";


interface MovieListProps {
  data: MovieInterface[];
  title: string;
}

export default function MovieList({ data, title }: MovieListProps) {
  if (isEmpty(data)) return null;

  return (
    <div className="mt-4 space-y-8">
      <div>
        <p className="text-md mb-4 px-4 font-semibold text-white md:px-16 md:text-xl lg:text-2xl">
          {title}
        </p>
        <div className="scrollbar-hide flex snap-mandatory gap-2 overflow-x-auto px-4 md:grid md:grid-cols-4 md:overflow-visible md:px-16">
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
