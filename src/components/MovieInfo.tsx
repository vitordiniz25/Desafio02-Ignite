import { FiCalendar, FiClock, FiStar, FiX } from "react-icons/fi";

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

type MovieInfoProps = {
    movie: MovieProps;
    handleRemoveMovie(): void;
};

export const MovieInfo = ({ movie, handleRemoveMovie }: MovieInfoProps) => {
    return (
        <div style={{ minHeight: "100vh" }}>
            <button className="x-button" onClick={() => handleRemoveMovie()}>
                <FiX />
            </button>
            <div className="info-container">
                <img src={movie.Poster} alt="Movie poster" />
                <div>
                    <h1>{movie.Title}</h1>
                    <div>
                        <p>
                            <FiCalendar />
                            {movie.Released}
                        </p>
                        <p>
                            <FiClock />
                            {movie.Runtime}
                        </p>
                    </div>
                    <p style={{ marginTop: "16px" }}>
                        <strong>Director:</strong> {movie.Director}
                    </p>
                    <p>
                        <strong>Sinopsis:</strong> {movie.Plot}
                    </p>
                    <p>
                        <strong>Genre:</strong> {movie.Genre}
                    </p>
                </div>
            </div>
            <div className="rating-container">
                <h1>
                    <FiStar style={{ color: "yellow" }} />
                    Ratings
                </h1>
                <p>Imdb: {movie.imdbRating}</p>
                {movie.Ratings.map((item) => (
                    <p>{`${item.Source}: ${item.Value}`}</p>
                ))}
            </div>
        </div>
    );
};