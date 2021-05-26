import React, { useState, useEffect } from "react";
import requests from "./requests";
import axios from "./axios";
import "./Banner.css";
import Youtube from "react-youtube";

function Banner({ movieId, setMovieId }) {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [intMovieId, setIntMovieId] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
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
      console.log(trailerurl);
    }
  };
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
        backdropPosition: "center center",
      }}
    >
      {trailerUrl && movieId === intMovieId && (
        <Youtube videoId={trailerUrl} opts={opts} />
      )}
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button" onClick={() => handleClick(movie)}>
            Play
          </button>
          {/*<button className="banner_button">My List</button>*/}
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 200)}</h1>
      </div>
      <div className="banner_fadebottom" />
    </header>
  );
}

export default Banner;
