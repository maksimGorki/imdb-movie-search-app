import React from "react";

const SearchBox = ({ query, setQuery }) => {
  return (
    <div className="searchContainer">
      <input
        className="searchBox"
        type="text"
        placeholder="search movies..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </div>
  );
};

export default SearchBox;
