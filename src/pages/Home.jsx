import {useState} from "react";
import {getMovies} from "../omdbapi.js";
import MovieCard from "../components/MovieCard.jsx";

export default function Home() {
    const [movies, setMovies] = useState(null);
    const [requesting, setRequesting] = useState(false);

    if (!requesting) {
        setRequesting(true);
        getMovies("lego").then(data => {
            setMovies(data);
        });
    }

    return (
        <div className={"p-4 min-w-[400px]"}>
            <h1 className={"text-6xl font-bold"}>Films tendances</h1>
            <div className="flex flex-wrap gap-6 m-6">
                {movies && movies.Search && movies.Search.map(movie => (
                    <MovieCard key={movie.imdbID} movie={movie}/>
                ))}
            </div>
        </div>
    )
}