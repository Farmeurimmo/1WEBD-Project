import {useEffect, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {getMovie} from "../omdbapi.js";

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
                    console.log(data);
                    setMovie(data);
                })
                .catch(() => {
                    setMovie(null);
                    hasRequested.current = false;
                });
        }
    }, [imdbID, movie]);

    return (
        <div className={"p-4 min-w-[400px]"}>
            <p>Page du film {imdbID}</p>
        </div>
    );
}
