import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import cinemaImg from "./assests/cinema.jpg";
import "./App.css";

function App() {
  const [movie, setMovie] = useState([]);

  function movieHandler() {
    fetch("https://swapi.dev/api/films")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const fetchedMovieData = data.results.map((movieData) => {
          return {
            key: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovie(fetchedMovieData);
      });
  }
  return (
    <React.Fragment>
      <section>
        <img src={cinemaImg} alt="cinema" />
        <button onClick={movieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movie} />
      </section>
    </React.Fragment>
  );
}

export default App;
