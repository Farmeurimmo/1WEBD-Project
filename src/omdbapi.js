const API_KEY = import.meta.env.VITE_API_KEY;

export async function getMovies(searchTerm, page = 1) {
    const response = await fetch('https://www.omdbapi.com/?s=' + searchTerm + '&apikey=' + API_KEY + '&type=movie&page=' + page);
    const data = await response.json();
    if (data.Response === "False") {
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

export async function getMovie(omdbID, plot = "full") {
    const response = await fetch('https://www.omdbapi.com/?i=' + omdbID + '&apikey=' + API_KEY + '&plot=' + plot);
    const data = await response.json();
    if (data.Response === "False") {
        return null;
    }
    if (data.Poster === "N/A") {
        data.Poster = "/poster_empty.png";
    }
    return data;
}

export async function getMoviesFrom2024(page = 1) {
    const response = await fetch('https://www.omdbapi.com/?s=2024&apikey=' + API_KEY + '&type=movie&y=2024&page=' + page);
    const data = await response.json();
    if (data.Response === "False") {
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