const API_KEY = import.meta.env.VITE_API_KEY;

export async function getMovies(searchTerm) {
    const response = await fetch('https://www.omdbapi.com/?s=' + searchTerm + '&apikey=' + API_KEY + '&type=movie');
    const data = await response.json();
    if (data.Search) {
        data.Search = data.Search.filter(movie => movie.Poster !== "N/A");
    }
    return data;
}