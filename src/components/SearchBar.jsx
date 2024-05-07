import React, { useState } from 'react';
import { TextField, Grid, Typography } from '@mui/material';

const SearchBar = ({ recipes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const results = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <TextField
          label="Search Recipes"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
        />
      </Grid>
      {searchResults.map(recipe => (
        <Grid item xs={12} key={recipe.id}>
          <Typography variant="h6">{recipe.title}</Typography>
          <Typography variant="body1">{recipe.description}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default SearchBar;
