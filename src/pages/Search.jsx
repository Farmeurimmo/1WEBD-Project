import {useEffect, useState} from "react";
import {getMovies} from "../omdbapi.js";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [lastTypedTime, setLastTypedTime] = useState(Date.now());
    const [error, setError] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState(null);
    const [requesting, setRequesting] = useState(false);

    const DEBOUNCE_DELAY = 250;
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        const handler = setTimeout(() => {
            handleSearch(false);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(handler);
    }, [searchTerm, lastTypedTime]);

    useEffect(() => {
        setMovies(null);
        setPage(1);
        handleSearch(true);
    }, [page]);

    const handleSearch = (urgent) => {
        if (urgent || Date.now() - lastTypedTime >= DEBOUNCE_DELAY) {
            setMovies(null);
            if (urgent || searchTerm.length > 2) {
                setRequesting(true);

                getMovies(searchTerm, page).then(data => {
                    setMovies(data);
                    if (data) {
                        setTotalResults(parseInt(data.totalResults));
                    }
                    setRequesting(false);
                }).catch(() => {
                    setError(true);
                    setRequesting(false);
                });
            }
        }
    };

    const handleInputChange = (event) => {
        setLastTypedTime(Date.now());
        setSearchTerm(event.target.value);
        setError(event.target.value.length <= 2);
    };

    const generatePagination = () => {
        const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
        const pagination = [];
        const maxPagesToShow = 5;
        const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

        let startPage = Math.max(1, page - halfMaxPagesToShow);
        let endPage = Math.min(totalPages, page + halfMaxPagesToShow);

        if (page - halfMaxPagesToShow <= 0) {
            endPage = Math.min(totalPages, endPage + (halfMaxPagesToShow - page + 1));
        }

        if (page + halfMaxPagesToShow > totalPages) {
            startPage = Math.max(1, startPage - (page + halfMaxPagesToShow - totalPages));
        }

        for (let i = startPage; i <= endPage; i++) {
            pagination.push(
                <button
                    key={i}
                    className={`btn join-item ${i === page ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </button>
            );
        }

        if (startPage > 1) {
            if (startPage > 2) {
                pagination.unshift(<button className="btn join-item">...</button>);
            }
            pagination.unshift(<button key={1} className="join-item btn btn-secondary"
                                       onClick={() => setPage(1)}>1</button>);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pagination.push(<button className="btn join-item">...</button>);
            }
            pagination.push(<button key={totalPages} className="btn join-item btn-secondary"
                                    onClick={() => setPage(totalPages)}>{totalPages}</button>);
        }

        return pagination;
    };

    return (
        <div className={"p-4"}>
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
                <ul className="flex flex-wrap gap-6 m-6">
                    {requesting && <span className="loading loading-spinner loading-lg"></span>}

                    {movies && movies.Search && movies.Search.length > 0 ? (
                        movies.Search.map(movie => (
                            <li className="card bg-base-300 w-80 shadow-xl flex-grow rounded-2xl hover:shadow-2xl hover:scale-105 transition-transform"
                                key={movie.imdbID}>
                                <figure>
                                    <img src={movie.Poster === "N/A" ? "https://http.cat/404.jpg" : movie.Poster}
                                         alt={movie.Title}
                                         className="rounded-t-2xl flex flex-grow w-full h-[500px] object-cover"/>
                                </figure>
                                <div className="p-4 space-y-4">
                                    <h2 className="text-3xl font-bold">{movie.Title}</h2>
                                    <div className="badge badge-secondary">Tendances</div>
                                    <p>{movie.description}</p>
                                </div>
                            </li>
                        ))
                    ) : !requesting && (
                        <div className="card bg-base-300 w-80 shadow-xl flex-grow rounded-2xl">
                            <div className="p-4 space-y-4">
                                <h2 className="text-3xl font-bold">Aucun résultat</h2>
                            </div>
                        </div>
                    )}
                </ul>
                <div className={"flex join"}>
                    {generatePagination()}
                </div>
            </div>
        </div>
    );
}