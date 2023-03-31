import React, { useEffect, useState } from "react";
import MovieCard from "./Moviecard";
import SearchIcon from "./search.svg";
import tmdb from "./tmdb";

const API_search =
    "https://api.themoviedb.org/3/search/movie?api_key=7736ed9f5427a468429b0f9cc1d80060&query=";

function App() {
  const [movies, setMovie] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("popular");

  const [isActive, setActive] = useState(false);

  function handleClickpop() {
    setPage("popular");
    setActive(false);
    console.log(page);
  }

  function handleClicktop() {
    setPage("top_rated");
    setActive(true);
    console.log(page);
  }

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await tmdb.get(`movie/${page}`);
      setMovie(data.results);
    };
    fetchMovies();

  });

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(API_search + search)
        .then((res) => res.json())
        .then((data) => setMovie(data.results));
  };

  const date = new Date().getFullYear();

  return (
      <div className="app">
        <a href="index.html">
          <h1>MovieScreen</h1>
        </a>
        <h2>Category of millions of movies to discover. Explore now!</h2>

        <div className="search">
          <input
              placeholder="Search Movie"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />
          <img src={SearchIcon} alt="search" onClick={handleSearch} />
        </div>

        <div className="options">
          <div className={isActive ? "choices active" : "choices"}>
            <div
                className={!isActive ? "pop active" : "pop"}
                onClick={handleClickpop}
            >
              Popular
            </div>
            <div className="top" onClick={handleClicktop}>
              Top Rated
            </div>
          </div>
        </div>
        {movies?.length > 0 ? (
            <div className="container">
              {movies.map((movie) => (
                  <MovieCard movie={movie} />
              ))}
            </div>
        ) : (
            <div className="empty">
              <span>there is not such a movie</span>
            </div>
        )}

        <div className="footer">
          <span>CopyRight © {date} by Lala Jumayeva</span>
        </div>
      </div>
  );
}

export default App;
