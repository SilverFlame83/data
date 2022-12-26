import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import cinemaImg from "./assests/cinema.jpg";
import "./App.css";

function App() {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const movieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://react-https-1f568-default-rtdb.europe-west1.firebasedatabase.app/movies.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedData = [];

      for (const key in data){
        loadedData.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }
      // const fetchedMovieData = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });
      setMovie(loadedData);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    movieHandler();
  }, [movieHandler]);
  let content = <p>No movies!</p>;

  if (movie.length > 0) {
    content = <MoviesList movies={movie} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-https-1f568-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    console.log(data);
  }
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
        <img src={cinemaImg} alt="cinema" />
        <button onClick={movieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* {!isLoading && movie.length > 0 && <MoviesList movies={movie} />}
        {!isLoading && movie.length === 0 && !error && <p>No movies!</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
