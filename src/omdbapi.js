const API_KEY = import.meta.env.VITE_API_KEY;

function processMovies(data) {
    if (data.Response === "False") {
        if (data.Error === "Too many results.") {
            return 0;
        }
        return null;
    }
    if (data.Search) {
        data.Search = data.Search.map(movie => {
            if (movie.Poster === "N/A") {
                movie.Poster = "/poster_empty.png";
            }
            return movie;
        });
    }
    return data;
}

export async function getMovies(searchTerm, page = 1) {
    const response = await fetch('https://www.omdbapi.com/?s=' + searchTerm + '&apikey=' + API_KEY + '&type=movie&page=' + page);
    const data = await response.json();
    return processMovies(data);
}

export async function getMovie(omdbID, plot = "full") {
    const response = await fetch('https://www.omdbapi.com/?i=' + omdbID + '&apikey=' + API_KEY + '&plot=' + plot);
    const data = await response.json();
    return processMovies(data);
}

export async function getMoviesFrom2024(page = 1) {
    const response = await fetch('https://www.omdbapi.com/?s=2024&apikey=' + API_KEY + '&type=movie&y=2024&page=' + page);
    const data = await response.json();
    return processMovies(data);
}