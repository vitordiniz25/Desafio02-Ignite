import { MovieCard } from "./MovieCard";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

type ContentProps = {
  selectedGenre: GenreResponseProps;
  movies: MovieProps[];
  handleSelectMovie(imdbId: string): void;
};

export const Content = ({
  selectedGenre,
  movies,
  handleSelectMovie,
}: ContentProps) => {
  return (
    <>
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <a onClick={() => handleSelectMovie(movie.imdbID)}>
              <MovieCard
                key={movie.imdbID}
                title={movie.Title}
                poster={movie.Poster}
                runtime={movie.Runtime}
                rating={movie.Ratings[0].Value}
              />
            </a>
          ))}
        </div>
      </main>
    </>
  );
};