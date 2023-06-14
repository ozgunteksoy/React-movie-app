import logo from './logo.svg';
import './App.css';

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
  };

  useEffect(() => {
    startSearch();
  }, [page]);

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
