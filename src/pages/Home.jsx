import {useEffect, useRef, useState} from "react";
import {getMovies, getMoviesFrom2024} from "../omdbapi.js";
import MovieCard from "../components/MovieCard.jsx";

export default function Home() {
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(false);
    const [movies2024, setMovies2024] = useState(null);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const hasRequested = useRef(false);

    useEffect(() => {
        if (!hasRequested.current) {
            setLoading(true);
            hasRequested.current = true;
            getMovies("lego").then(data => {
                setMovies(data);
                setLoading(false);

                if (!movies2024) {
                    loadMore();
                }
            }).catch(() => {
                setLoading(false);
            });
        }
    }, []);

    const loadMore = () => {
        setLoading(true);
        getMoviesFrom2024(page).then(data => {
            setMovies2024(prevMovies => prevMovies ? [...prevMovies, ...data.Search] : data.Search);
            setTotalResults(parseInt(data.totalResults));
            setPage(page + 1);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }

    return (
        <div className="p-4 min-w-[400px]">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6">Films tendances</h1>

            {loading &&
                <div className="flex justify-center w-full"><span className="loading loading-lg"></span></div>
            }
            <div className="flex flex-wrap gap-6 m-6">
                {movies && movies.Search && movies.Search.map(movie => (
                    <MovieCard key={movie.imdbID} movie={movie} tendance={true}/>
                ))}
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">Films 2024
                ({totalResults} films)</h2>
            {loading &&
                <div className="flex justify-center w-full"><span className="loading loading-lg"></span></div>}
            <div className="flex flex-wrap gap-6 m-6">
                {movies2024 && movies2024.map(movie => (
                    <MovieCard key={movie.imdbID} movie={movie}/>
                ))}
            </div>

            {movies2024 && movies2024.length < totalResults && (
                <div className="mx-6">
                    <div className="flex justify-center w-full">
                        <button className="btn btn-primary w-full font-bold" onClick={loadMore}>Charger Plus</button>
                    </div>
                </div>
            )}
        </div>
    );
}