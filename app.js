const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7813ea178ab186b18f082b0f93d1169e&page=1";
const IMG_PATH = "http://image.tmdb.org/t/p/w1280";
const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?&api_key=7813ea178ab186b18f082b0f93d1169e&query="';
const main = document.getElementById('main');
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);

async function getMovies(url) {
    const responds = await fetch(url);
    const data = await responds.json();
    showMovies(data.results);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchedTerm = search.value;
    if (searchedTerm && searchedTerm !== "") {
        getMovies(SEARCH_API + searchedTerm);
        search.value = "";
    } else {
        window.location.reload(); //this will reload the page
    }
});

function showMovies(movies) {
    main.innerHTML = ""

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieElement = document.createElement('div')
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
     <img
         src="${IMG_PATH + poster_path}"
         alt="${title}" />
     <div class="movie-info">
         <h3>${title}</h3>
         <span class="${getClassByRate(vote_average)}">${vote_average}</span>
     </div>
     <div class="movie-overview">
         <h3>Overview</h3>
         ${overview}
     </div>
     `
        main.appendChild(movieElement);
    })

}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green"
    } else if (vote >= 5) {
        return "orange"
    } else {
        return "red"
    }
}

