import React, { useState, useEffect } from "react";

import SearchBox from "./SearchBox";
import MovieDeck from "./MovieDeck";
import LoadingPage from "./LoadingPage";
import useData from "./useData";

const getApiEndpoint = (query, page) => {
  const url = `http://www.omdbapi.com/?&apikey=9e1134ca&s=${query}&page=${page}`;
  return url;
};

const SearchMovies = () => {
  const [query, setQuery] = useState("");
  const { searching, data: movies } = useData(query, getApiEndpoint);

  return (
    <>
      <SearchBox query={query} setQuery={setQuery} />
      <div className="horizontalRule"></div>
      {searching ? <LoadingPage /> : <MovieDeck movies={movies} />}
    </>
  );
};

export default SearchMovies;
