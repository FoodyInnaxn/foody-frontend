import React, { useState, useEffect } from "react";
import { Card, CardMedia, Typography, Box, Button } from "@mui/material";
import SavedRecipeAPI from "../apis/SavedRecipeAPI";
import Carousel from "react-material-ui-carousel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

const pageSize = 2;

const UserSavedRecipes = ({ userId }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await SavedRecipeAPI.getSaved(userId, pageNumber, pageSize);
        console.log(response)
        setSavedRecipes(response.recipes);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchSavedRecipes();
  }, [userId, pageNumber]);

  const navigateToRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handlePageChange = (event, value) => {
    setPageNumber(value - 1);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      <Typography variant="h5" mb={2}>
        Saved recipes
      </Typography>
      {savedRecipes.length > 0 ? (
        savedRecipes.map((recipe) => (
          <Box key={recipe.id} mb={2} width="100%">
            <Card style={{ height: "100%" }}>
              {recipe.urlImages.length > 0 ? (
                <Carousel>
                  {recipe.urlImages.map((image, index) => (
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
              <Box mt={1} mb={2} display="flex" justifyContent="center">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigateToRecipe(recipe.recipeId)}
                >
                  View Recipe
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

export default UserSavedRecipes;
