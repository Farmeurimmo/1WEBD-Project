const API_KEY = import.meta.env.VITE_API_KEY;

export async function getMovies(searchTerm, page = 1) {
    const response = await fetch('https://www.omdbapi.com/?s=' + searchTerm + '&apikey=' + API_KEY + '&type=movie&page=' + page);
    const data = await response.json();
    if (data.Response === "False") {
        return null;
    }
    if (data.Search) {
        data.Search = data.Search.filter(movie => movie.Poster !== "N/A");
    }
    return data;
}