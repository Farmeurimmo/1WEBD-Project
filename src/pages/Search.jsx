import {useEffect, useState} from "react";
import {getMovies} from "../omdbapi.js";
import MovieCard from "../components/MovieCard.jsx";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [lastTypedTime, setLastTypedTime] = useState(Date.now());
    const [error, setError] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [requesting, setRequesting] = useState(false);

    const DEBOUNCE_DELAY = 250;

    useEffect(() => {
        const handler = setTimeout(() => {
            if (page === 1) {
                handleSearch(false);
            } else {
                setPage(1);
            }
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(handler);
    }, [searchTerm, lastTypedTime]);

    useEffect(() => {
        if (page > 1) {
            handleSearch(true);
        }
    }, [page]);

    const handleSearch = (urgent) => {
        if (searchTerm.length <= 2) {
            setMovies(null);
            return;
        }
        if ((urgent || Date.now() - lastTypedTime >= DEBOUNCE_DELAY) && !requesting) {
            setRequesting(true);
            getMovies(searchTerm, page).then(data => {
                if (page === 1) {
                    setMovies(data ? data.Search : []);
                } else {
                    setMovies(prevMovies => [...prevMovies, ...(data ? data.Search : [])]);
                }
                if (data) {
                    setTotalResults(parseInt(data.totalResults));
                }
                setRequesting(false);
            }).catch(() => {
                setError(true);
                setRequesting(false);
            });
        }
    };

    const handleInputChange = (event) => {
        setLastTypedTime(Date.now());
        setSearchTerm(event.target.value);
        setError(event.target.value.length <= 2);
    };

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className={"p-4 min-w-[400px]"}>
            <div className={"flex flex-col gap-4"}>
                <h1 className={"text-6xl font-bold"}>Rechercher un film</h1>
                <p className={"text-red-500"}>{error && "Veuillez entrer au moins 3 caractères"}</p>
                <label className="input input-bordered flex items-center gap-4 text-2xl max-w-xl">
                    <input id={"search"} type="text" className="grow" placeholder="Rechercher un film"
                           value={searchTerm} onChange={handleInputChange}/>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="h-6 w-6 opacity-80">
                        <path fillRule="evenodd"
                              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                              clipRule="evenodd"/>
                    </svg>
                </label>
            </div>
            <div className={"p-4"}>
                {!requesting && (
                    <p className={"text-2xl"}>{totalResults} résultats</p>
                )}
                <div className="flex flex-wrap gap-6 m-6">
                    {requesting && <span className="loading loading-spinner loading-lg"></span>}

                    {movies && movies.length > 0 ? (
                        movies.map(movie => (
                            <MovieCard key={movie.imdbID} movie={movie}/>
                        ))
                    ) : !requesting && (
                        <div className="card bg-base-300 w-80 shadow-xl flex-grow rounded-2xl">
                            <div className="p-4 space-y-4">
                                <h2 className="text-3xl font-bold">Aucun résultat</h2>
                            </div>
                        </div>
                    )}
                </div>
                {movies && movies.length < totalResults && (
                    <div className={"mx-6"}>
                        <div className={"flex flex-wrap w-full"}>
                            <button className="btn btn-primary w-full font-bold" onClick={loadMore}>Charger Plus
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}