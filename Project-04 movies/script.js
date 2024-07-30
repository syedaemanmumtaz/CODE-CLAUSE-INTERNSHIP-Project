document.addEventListener('DOMContentLoaded', () => {
    const movieList = document.getElementById('movie-list');
    const searchBar = document.getElementById('search-bar');
    let movies = [];

    fetch('movies.json')
        .then(response => response.json())
        .then(data => {
            movies = data;
            displayMovies(movies);
        })
        .catch(error => console.error('Error fetching the movies:', error));

    searchBar.addEventListener('input', (e) => {
        const searchString = e.target.value.toLowerCase();
        const filteredMovies = movies.filter(movie => {
            return (
                movie.title.toLowerCase().includes(searchString) ||
                movie.genre.toLowerCase().includes(searchString) ||
                movie.cast.some(actor => actor.toLowerCase().includes(searchString))
            );
        });
        displayMovies(filteredMovies);
    });

    function displayMovies(movies) {
        movieList.innerHTML = '';
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title} poster">
                <h2>${movie.title}</h2>
                <p><strong>Release Date:</strong> ${movie.release_date}</p>
                <p><strong>Genre:</strong> ${movie.genre}</p>
                <p><strong>Cast:</strong> ${movie.cast.join(', ')}</p>
            `;
            movieList.appendChild(movieCard);
        });
    }
});
