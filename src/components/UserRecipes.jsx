import React, { useState, useEffect } from 'react';
import RecipesAPI from '../apis/RecipesApi';
import { Card, CardMedia, Typography, Box, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

const pageSize = 2;

const UserRecipes = ({ userId }) => {
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCreatedRecipes = async () => {
      try {
        const response = await RecipesAPI.getCreatedRecipes(userId, pageNumber, pageSize);
        console.log(response);
        setCreatedRecipes(response.recipes || []);
        setTotalPages(response.totalPages || 0);
      } catch (error) {
        console.error('Error fetching created recipes:', error);
      }
    };

    fetchCreatedRecipes();
  }, [userId, pageNumber]);

  const navigateToRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await RecipesAPI.deleteRecipe(userId, recipeId);
      setCreatedRecipes(createdRecipes.filter(recipe => recipe.id !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handlePageChange = (event, value) => {
    setPageNumber(value - 1);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      <Typography variant="h5" mb={2}>
        Created recipes
      </Typography>
      {createdRecipes.length > 0 ? (
        createdRecipes.map((recipe) => (
          <Box key={recipe.id} mb={2} width="100%">
            <Card style={{ height: "100%" }}>
              {recipe.imgUrls?.length > 0 ? (
                <Carousel>
                  {recipe.imgUrls.map((image, index) => (
                    <CardMedia
                      key={index}
                      component="img"
                      image={image}
                      alt={`Image ${index}`}
                      style={{ height: 300 }}
                    />
                  ))}
                </Carousel>
              ) : (
                <CardMedia
                  component="img"
                  image="/images/noimage.jpg"
                  alt="No Image"
                  style={{ height: 300 }}
                />
              )}
              <Typography fontWeight="bold" variant="subtitle1" align="center">
                {recipe.title}
              </Typography>
              <Typography variant="body1" align="center">
                {recipe.description}
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                mt={2}
              >
                <AccessTimeIcon />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ marginLeft: "0.5rem" }}
                >
                  {recipe.time}
                </Typography>
              </Box>
              <Box mt={1} mb={2} display="flex" justifyContent="space-evenly">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigateToRecipe(recipe.id)}
                >
                  View Recipe
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteRecipe(recipe.id)}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          </Box>
        ))
      ) : (
        <Typography variant="body1">No saved recipes</Typography>
      )}
      <Pagination
        count={totalPages}
        page={pageNumber + 1}
        onChange={handlePageChange}
        shape="rounded"
        style={{ marginTop: "20px" }}
      />
    </Box>
  );
};

export default UserRecipes;
