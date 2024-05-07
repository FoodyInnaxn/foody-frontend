import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, CardMedia, Grid, IconButton, Box, Container } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import RecipesAPI from "../apis/RecipesApi";
import { Favorite as FavoriteIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";

const RecipePage = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await RecipesAPI.getRecipeById(id);
        setRecipe(response);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access
          navigate("/login");
        } else {
          // Handle other errors
          console.error("Error fetching recipe:", error);
        }
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id, navigate]);

  const handleImageClick = () => {
    // Handle image click action, like opening in a modal or navigating to a larger view
  };

  return (
    <Container>
      <Box mt={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          {recipe.title}
        </Typography>
      </Box>
      <Card sx={{ maxWidth: 800, margin: "auto" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CardMedia
              component="img"
              height="auto"
              image={recipe.imgUrls && recipe.imgUrls.length > 0 ? recipe.imgUrls[0] : ""}
              alt={recipe.title}
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                Description: {recipe.description}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Preparation Time: {recipe.time}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Ingredients: {recipe.ingredients && recipe.ingredients.join(", ")}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Favorite Count: {recipe.numberSaved}
              </Typography>
              <IconButton color="primary" aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <Box mt={2} textAlign="center">
        <IconButton color="primary" aria-label="back" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default RecipePage;
