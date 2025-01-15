import {useState} from "react";
import {getMovies} from "../omdbapi.js";

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
        <div className={"p-4"}>
            <h1 className={"text-6xl font-bold"}>Films tendances</h1>
            <ul className="flex flex-wrap gap-6 m-6">
                {movies && movies.Search && movies.Search.map(movie => (
                    <li className="card bg-base-300 w-80 max-w-xl shadow-xl flex-grow rounded-2xl hover:shadow-2xl hover:scale-105 transition-transform"
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
                            <div className={"flex flex-wrap gap-2"}>
                                <div className="badge badge-secondary">Tendances</div>
                                <div className="badge badge-secondary">{movie.Year}</div>
                            </div>
                            <p>{movie.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}