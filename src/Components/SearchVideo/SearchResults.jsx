import React, { useEffect, useState } from "react";
import "./SearchResults.css"
import { useLocation } from "react-router-dom";
import axios from "axios";
import VideoCard from "../VideoCard/VideoCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      axios
        .get(`http://localhost:3000/api/search/videos?q=${query}`)
        .then((res) => {
          setResults(res.data.results);
        })
        .catch((err) => {
          console.error("Search error:", err);
        });
    }
  }, [query]);

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      {results.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        <div className="search-grid">
          {results.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
