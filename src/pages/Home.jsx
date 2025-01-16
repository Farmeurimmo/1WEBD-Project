import {useEffect, useRef, useState} from "react";
import {getMovies, getMoviesFrom2024} from "../omdbapi.js";
import MovieCard from "../components/MovieCard.jsx";

export default function Home() {
    const [movies, setMovies] = useState(null);
    const [requesting, setRequesting] = useState(false);
    const hasRequested = useRef(false);
    const [movies2024, setMovies2024] = useState(null);
    const [page, setPage] = useState(1);
    const totalResults = useRef(0);

    useEffect(() => {
        if (!requesting && !hasRequested.current) {
            hasRequested.current = true;
            setRequesting(true);
            getMovies("lego").then(data => {
                setMovies(data);
                setRequesting(false);
                hasRequested.current = false;

                if (!movies2024) {
                    loadMore();
                }
            }).catch(() => {
                setRequesting(false);
                hasRequested.current = false;
            });
        }
    }, []);

    const loadMore = () => {
        if (!requesting && !hasRequested.current) {
            hasRequested.current = true;
            setRequesting(true);
            getMoviesFrom2024(page).then(data => {
                if (movies2024) {
                    setMovies2024(prevMovies => [...prevMovies, ...(data.Search)]);
                } else {
                    setMovies2024(data.Search);
                }
                totalResults.current = parseInt(data.totalResults);
                setPage(page + 1);
                setRequesting(false);
                hasRequested.current = false;
            }).catch(() => {
                setRequesting(false);
                hasRequested.current = false;
            });
        }
    }

    return (
        <div className="p-4 min-w-[400px]">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6">Films tendances</h1>

            {requesting &&
                <div className="flex justify-center w-full"><span className="loading loading-lg"></span></div>}
            <div className="flex flex-wrap gap-6 m-6">
                {movies && movies.Search && movies.Search.map(movie => (
                    <MovieCard key={movie.imdbID} movie={movie}/>
                ))}
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">Films 2024
                ({totalResults.current} films)</h2>
            {requesting &&
                <div className="flex justify-center w-full"><span className="loading loading-lg"></span></div>}
            <div className="flex flex-wrap gap-6 m-6">
                {movies2024 && movies2024.map(movie => (
                    <MovieCard key={movie.imdbID} movie={movie}/>
                ))}
            </div>

            {movies2024 && movies2024.length < totalResults.current && (
                <div className="mx-6">
                    <div className="flex justify-center w-full">
                        <button className="btn btn-primary w-full font-bold" onClick={loadMore}>Load More</button>
                    </div>
                </div>
            )}
        </div>
    );
}