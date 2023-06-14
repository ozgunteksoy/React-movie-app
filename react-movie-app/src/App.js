import { useState, useEffect } from "react";
import "./App.css";
import Paginator from "./components/Paginator";

function App() {
  const [movies, setMovies] = useState({});

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  const handleSearch = (e) => {
    e.preventDefault();
    startSearch(searchValue);
  };

  const startSearch = (query, page = 1) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjkxNmY1MDY3Yjk3M2Q4YzUxMDA3OGEyZGYwMTIyOCIsInN1YiI6IjY0NzliZjkxZTMyM2YzMDEyNzUwZTk0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PXOyZjkwA2hYZs631QhYYwQfs2SiCFu0ujzo9I6E7kU",
      },
    };
    fetch(
      `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=${page}&query=${searchValue}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMovies(response);
      })
      .catch((err) => console.error(err));
  };

  const selectPages = (page) => {
    startSearch(searchValue, page);
    console.log("selectPages");
  };

  return (
    <>
      <div className="container">
        <div className="search-form">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="search"
              placeholder="Search"
              autoComplete="off"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            ></input>
            <button type="submit" name="submit" value="">
              Ara
            </button>
          </form>
        </div>
      </div>
      <div className="movies">
        {movies?.results && // movies varsa results'ına bak
          movies.results.map((movie) => {
            return (
              <div className="movie-item" key={movie.id}>
                {movie.poster_path ? (
                  <figure className="movie-figure">
                    <img
                      src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                      alt="{movie.title}"
                    />
                  </figure>
                ) : (
                  <img src="https://placehold.co/220x330" />
                )}
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
              </div>
            );
          })}
      </div>

      {movies?.total_pages && (
        <Paginator
          total_pages={movies.total_pages}
          page={movies.page}
          selectPages={selectPages}
        />
      )}
    </>
  );
}

export default App;
