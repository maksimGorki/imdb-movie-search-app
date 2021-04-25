import React, { useState, useEffect } from "react";

const Header = ({ query, setQuery }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="header">
      <div>IMDb Movie Search</div>
      {scrollPosition > 90 && (
        <div className="stickySearchBox">
          <input
            className="searchBox"
            type="text"
            placeholder="search movies..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
