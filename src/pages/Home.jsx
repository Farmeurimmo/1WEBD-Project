import {useEffect, useRef, useState} from "react";
import {getMovies} from "../omdbapi.js";
import MovieCard from "../components/MovieCard.jsx";

export default function Home() {
    const [movies, setMovies] = useState(null);
    const [requesting, setRequesting] = useState(false);
    const hasRequested = useRef(false);

    useEffect(() => {
        if (!requesting && !hasRequested.current) {
            hasRequested.current = true;
            setRequesting(true);
            getMovies("lego").then(data => {
                setMovies(data);
                setRequesting(false);
                hasRequested.current = false;
            }).catch(() => {
                setRequesting(false);
                hasRequested.current = false;
            });
        }
    }, []);

    return (
        <div className={"p-4 min-w-[400px]"}>
            <h1 className={"text-6xl font-bold"}>Films tendances</h1>
            <div className="flex flex-wrap gap-6 m-6">
                {movies && movies.Search && movies.Search.map(movie => (
                    <MovieCard key={movie.imdbID} movie={movie}/>
                ))}
            </div>
        </div>
    );
}