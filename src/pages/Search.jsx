import {useEffect, useState} from "react";
import {getMovies} from "../omdbapi.js";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [lastTypedTime, setLastTypedTime] = useState(Date.now());
    const [error, setError] = useState(true);

    const [movies, setMovies] = useState(null);

    const DEBOUNCE_DELAY = 250;

    useEffect(() => {
        const handler = setTimeout(() => {
            if (Date.now() - lastTypedTime >= DEBOUNCE_DELAY) {
                if (setSearchTerm.length > 0) {
                    getMovies(searchTerm).then(data => {
                        setMovies(data);
                    });
                } else {
                    setMovies(null);
                }
            }
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(handler);
    }, [searchTerm, lastTypedTime]);

    const handleInputChange = (event) => {
        setLastTypedTime(Date.now());
        setSearchTerm(event.target.value);

        if (searchTerm.length <= 2) {
            setMovies(null);
            setError(true);
        } else {
            setError(false);
        }
    };

    return (
        <div className={"p-4"}>
            <div className={"flex flex-col gap-4"}>
                <h1 className={"text-6xl font-bold"}>Rechercher un film</h1>

                <p className={"text-red-500"}>{error && "Veuillez entrer au moins 3 caractères"}</p>
                <label className="input input-bordered flex items-center gap-4 text-2xl max-w-xl">
                    <input id={"search"} type="text" className="grow" placeholder="Rechercher un film"
                           value={searchTerm}
                           onChange={handleInputChange}/>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-6 w-6 opacity-80">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"/>
                    </svg>
                </label>
            </div>
            <div className={"p-4"}>
                <ul className="flex flex-wrap gap-6 m-6">
                    {movies && movies.Search && movies.Search.map(movie => (
                        <li className="card bg-base-300 w-80 shadow-xl flex-grow rounded-2xl hover:shadow-2xl hover:scale-105 transition-transform"
                            key={movie.imdbID}>
                            <figure>
                                <img
                                    src={movie.Poster === "N/A" ? "https://http.cat/404.jpg" : movie.Poster}
                                    alt={movie.Title}
                                    className="rounded-t-2xl flex flex-grow w-full h-[500px] object-cover"
                                />
                            </figure>
                            <div className="p-4 space-y-4">
                                <h2 className="text-3xl font-bold">
                                    {movie.Title}
                                </h2>
                                <div className="badge badge-secondary">Tendances</div>
                                <p>{movie.description}</p>
                            </div>
                        </li>
                    )) || (
                        <div className="card bg-base-300 w-80 shadow-xl flex-grow rounded-2xl">
                            <div className="p-4 space-y-4">
                                <h2 className="text-3xl font-bold">
                                    Aucun résultat
                                </h2>
                            </div>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    )
}