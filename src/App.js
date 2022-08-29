import "./App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";
import Navbar from "./Navbar";
import { useState } from "react";

function App() {
  const [movieId, setMovieId] = useState(0);
  return (
    <div className="app">
      <Navbar />
      <Banner movieId={movieId} setMovieId={setMovieId} />
      <Row
        movieId={movieId}
        setMovieId={setMovieId}
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row
        movieId={movieId}
        setMovieId={setMovieId}
        title="Trending Now"
        fetchUrl={requests.fetchTrending}
      />
      <Row
        movieId={movieId}
        setMovieId={setMovieId}
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
      />
      <Row
        movieId={movieId}
        setMovieId={setMovieId}
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        movieId={movieId}
        setMovieId={setMovieId}
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
      />
      <Row
        movieId={movieId}
        setMovieId={setMovieId}
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Row
        movieId={movieId}
        setMovieId={setMovieId}
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Row
        movieId={movieId}
        setMovieId={setMovieId}
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
      />
    </div>
  );
}
//

export default App;
