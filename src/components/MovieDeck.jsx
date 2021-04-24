import React from "react";

import MovieCard from "./MovieCard";

const MovieDeck = ({ movies }) => {
  return (
    movies.length !== 0 && (
      <div className="movieContainer">
        {movies.map((movie, index) => {
          return <MovieCard key={movie.imdbID} movie={movie} />;
        })}
      </div>
    )
  );
};

export default MovieDeck;
