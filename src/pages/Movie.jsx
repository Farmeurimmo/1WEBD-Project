import {useEffect, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {getMovie} from "../omdbapi.js";

function Rating({source, value}) {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">{source}</h3>
            <p className="text-lg">{value}</p>
        </div>
    );
}

export default function Movie() {
    const [searchParams] = useSearchParams();
    const imdbID = searchParams.get("key");

    if (!imdbID) {
        return (
            <div className={"p-4 min-w-[400px]"}>
                <p>Film non trouvé</p>
            </div>
        );
    }

    const [movie, setMovie] = useState(null);
    const hasRequested = useRef(false);

    useEffect(() => {
        if (imdbID && !hasRequested.current && movie === null) {
            hasRequested.current = true;

            getMovie(imdbID)
                .then(data => {
                    setMovie(data);
                })
                .catch(() => {
                    setMovie(null);
                    hasRequested.current = false;
                });
        }
    }, [imdbID, movie]);

    return (
        <div className={"p-4 min-w-[400px] flex flex-wrap gap-4"}>
            {!hasRequested.current ? (
                <div className={"flex justify-center w-full"}>
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <div
                    className="flex flex-col gap-8 p-8 bg-base-200 rounded-lg shadow-lg w-full lg:w-3/4 xl:w-2/3 mx-auto">
                    <h1 className="text-4xl font-bold">{movie?.Title}</h1>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex flex-col gap-4 w-full md:w-1/2">
                            <p className="text-lg">{movie?.Plot}</p>

                            <div className="flex flex-wrap gap-2">
                                {movie?.Year && movie.Year !== "N/A" &&
                                    <div className="badge badge-secondary">{movie.Year}</div>}
                                {movie?.Genre && movie.Genre !== "N/A" &&
                                    <div className="badge badge-secondary">{movie.Genre}</div>}
                                {movie?.Runtime && movie.Runtime !== "N/A" &&
                                    <div className="badge badge-secondary">{movie.Runtime}</div>}
                            </div>

                            {movie?.Ratings && movie.Ratings.length > 0 && (
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-2xl font-bold">Notes</h2>
                                    {movie.Ratings.map((rating, index) => (
                                        <Rating key={index} source={rating.Source} value={rating.Value}/>
                                    ))}
                                </div>
                            )}

                            {movie?.imdbVotes && movie.imdbVotes !== "N/A" && (
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-2xl font-bold">Votes imdb</h2>
                                    <p className="text-lg">{movie.imdbVotes}</p>
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-1/2 flex">
                            <img src={movie?.Poster} alt={movie?.Title}
                                 className="rounded-lg shadow-md w-full h-auto max-h-[700px] object-fill"/>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {movie?.Actors && movie.Actors !== "N/A" && (
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-bold">Acteurs</h2>
                                <p className="text-lg">{movie.Actors}</p>
                            </div>
                        )}

                        {movie?.Director && movie.Director !== "N/A" && (
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-bold">Réalisateur</h2>
                                <p className="text-lg">{movie.Director}</p>
                            </div>
                        )}

                        {movie?.Writer && movie.Writer !== "N/A" && (
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-bold">Producteur</h2>
                                <p className="text-lg">{movie.Writer}</p>
                            </div>
                        )}

                        {movie?.Language && movie.Language !== "N/A" && (
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-bold">Langue</h2>
                                <p className="text-lg">{movie.Language}</p>
                            </div>
                        )}

                        {movie?.Country && movie.Country !== "N/A" && (
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-bold">Pays</h2>
                                <p className="text-lg">{movie.Country}</p>
                            </div>
                        )}

                        {movie?.Awards && movie.Awards !== "N/A" && (
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-bold">Awards</h2>
                                <p className="text-lg">{movie.Awards}</p>
                            </div>
                        )}

                        {movie?.BoxOffice && movie.BoxOffice !== "N/A" && (
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-bold">Box Office</h2>
                                <p className="text-lg">{movie.BoxOffice}</p>
                            </div>
                        )}

                        {movie?.Production && movie.Production !== "N/A" && (
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-bold">Production</h2>
                                <p className="text-lg">{movie.Production}</p>
                            </div>
                        )}

                        {movie?.Website && movie.Website !== "N/A" && (
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-bold">Website</h2>
                                <p className="text-lg">{movie.Website}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
