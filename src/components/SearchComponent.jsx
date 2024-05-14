import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchAPI from "../apis/SearchAPI";

const searchResultItemStyle = {
  marginBottom: "16px",
  padding: "16px",
  borderRadius: "4px",
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
};

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  let searchTimeout = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchResults([]);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      if (searchTerm !== "") {
        const response = await SearchAPI.getMatchesRecipes(searchTerm);
        setSearchResults(response.slice(0, 10));
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setLoading(false);
    }
  };

  const debouncedSearch = (searchTerm) => {
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      handleSearch();
    }, 1500);
  };

  return (
    <div ref={searchRef} style={{ position: "relative", width: "100%" }}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => {
          const value = e.target.value;
          setSearchTerm(value);
          if (!value) {
            setSearchResults([]);
          } else {
            debouncedSearch(value);
          }
        }}
        fullWidth
      />
      {searchResults.length > 0 && (
        <Paper
          elevation={3}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "calc(100% - 20px)",
            marginTop: 10,
            padding: 10,
            zIndex: 999,
          }}
        >
          {loading && <CircularProgress />}
          {!loading &&
            searchResults.map((result, index) => (
              <Link
                key={index}
                to={`/recipe/${result.recipeId}`}
                style={searchResultItemStyle}
              >
                <div>
                  <Typography variant="body1" gutterBottom>
                    {result.title}
                  </Typography>
                  <Typography variant="body2">
                    {result.description.slice(0, 15)}
                    {result.description.length > 15 && "..."}
                  </Typography>
                </div>
              </Link>
            ))}
          {!loading && searchResults.length === 0 && (
            <Typography variant="body1">No results found</Typography>
          )}
        </Paper>
      )}
    </div>
  );
};

export default SearchComponent;
