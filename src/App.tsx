import { useEffect, useState } from "react";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";
import { MovieInfo } from "./components/MovieInfo";

import { api } from "./services/api";

import "./styles/global.scss";

import "./styles/sidebar.scss";
import "./styles/content.scss";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  imdbID: string;
  Released: string;
  Genre: string;
  Director: string;
  Plot: string;
  imdbRating: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  const [selectedMovie, setSelectedMovie] = useState<MovieProps | null>(null);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedMovie(null);
    setSelectedGenreId(id);
  }

  function handleSelectedMovie(imdbId: string) {
    const movieSelected = movies.find((movie) => movie.imdbID === imdbId);

    if (movieSelected) {
      setSelectedMovie(movieSelected);
    }
  }

  function handleRemoveMovie() {
    setSelectedMovie(null);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        genres={genres}
        handleClickButton={handleClickButton}
        selectedGenreId={selectedGenreId}
      />
      <div className="container">
        {selectedMovie ? (
          <MovieInfo
            movie={selectedMovie}
            handleRemoveMovie={handleRemoveMovie}
          />
        ) : (
          <Content
            selectedGenre={selectedGenre}
            movies={movies}
            handleSelectMovie={handleSelectedMovie}
          />
        )}
      </div>
    </div>
  );
}