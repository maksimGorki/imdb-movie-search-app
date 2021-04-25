import React from "react";

import SearchBox from "./SearchBox";
import MovieDeck from "./MovieDeck";
import LoadingPage from "./LoadingPage";
import useData from "./useData";

const getApiEndpoint = (query, page) => {
  const url = `https://www.omdbapi.com/?&apikey=9e1134ca&s=${query}&page=${page}`;
  return url;
};

const SearchMovies = ({ query, setQuery }) => {
  const { errorMsg, response, isLoading, data: movies } = useData(
    query,
    getApiEndpoint
  );

  return (
    <>
      <SearchBox query={query} setQuery={setQuery} />
      <div className="horizontalRule"></div>
      {response ? (
        isLoading ? (
          <LoadingPage />
        ) : (
          <MovieDeck movies={movies} />
        )
      ) : (
        <h1>{errorMsg}</h1>
      )}
    </>
  );
};

export default SearchMovies;
