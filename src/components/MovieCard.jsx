import React from "react";

import dummyPlaceholder from "../media/dummyCinemaLogo.jpg";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie" key={movie.imdbID}>
      <img
        className="moviePoster"
        src={movie.Poster !== "N/A" ? movie.Poster : dummyPlaceholder}
        alt="moviePoster"
      />
      <div className="movieTitle">{movie.Title}</div>
      <div className="movieYear">{movie.Year}</div>
    </div>
  );
};

export default MovieCard;
