import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import SearchMovies from "./components/SearchMovies";

function App() {
  const [query, setQuery] = useState("");
  return (
    <div className="wrapper">
      <Header query={query} setQuery={setQuery} />
      <SearchMovies query={query} setQuery={setQuery} />
    </div>
  );
}

export default App;
