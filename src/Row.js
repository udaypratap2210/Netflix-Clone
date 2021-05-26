import axios from "./axios";
import React, { useState, useEffect } from "react";
import "./Row.css";
import Youtube from "react-youtube";

const baseURL = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow, movieId, setMovieId }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [intMovieId, setIntMovieId] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = async (movie) => {
    if (trailerUrl) {
      setMovieId(0);
      setIntMovieId(0);
      setTrailerUrl("");
    } else {
      const trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=0788c22d5ddc26096b47417da7a750ca`
      );
      setMovieId(movie.id);
      setIntMovieId(movie.id);
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };
  return (
    <div className="row">
      <h2 className="row_title">{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            onClick={() => handleClick(movie)}
            key={movie.id}
            src={`${baseURL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && movieId === intMovieId && (
        <Youtube videoId={trailerUrl} opts={opts} />
      )}
    </div>
  );
}

export default Row;
