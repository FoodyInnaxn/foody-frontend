import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";
import StepList from "../components/StepList";
import IngredientList from "../components/IngredientList";
import RecipesAPI from "../apis/RecipesApi";
import { DeleteToken } from "../authentication/LocalStorageManager";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import NotAuthorizedPage from "./NotAuthorizedPage";
const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [errorMsg, setErrMsg] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !preparationTime ||
      steps.length === 0 ||
      ingredients.some((ingredient) => !ingredient.name || !ingredient.quantity)
    ) {
      setErrMsg("Please fill in all fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("time", preparationTime);
      formData.append("steps", JSON.stringify(steps.map((s) => s.text)));
      formData.append(
        "ingredients",
        JSON.stringify(
          ingredients.map((ingredient) => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
          }))
        )
      );

      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
      }
      // Console log the steps and ingredients
      console.log(
        "Steps:",
        JSON.stringify(steps.map((s) => s.text))
      );
      console.log(
        "Ingredients:",
        JSON.stringify(
          ingredients.map((ingredient) => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
          }))
        )
      );
      await RecipesAPI.createRecipe(formData, user.userId);
      setErrMsg("");
      navigate("/recipe");
    } catch (error) {
      if (!error?.response) {
        setErrMsg(JSON.stringify(error));
      } else if (
        error.response?.status === 401 ||
        error.message === "ID_NOT_FROM_LOGGED_IN_USER"
      ) {
        DeleteToken();
        navigate("/login");
      } else if (error.response.status === 403) {
        <NotAuthorizedPage />;
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Create Recipe
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Preparation Time"
              value={preparationTime}
              onChange={(e) => setPreparationTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input
              type="file"
              multiple
              onChange={(e) => {
                console.log(e.target.files);
                setImages(e.target.files);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StepList steps={steps} setSteps={setSteps} />
          </Grid>
          <Grid item xs={12}>
            <IngredientList
              setIngredients={setIngredients}
              ingredients={ingredients}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                Create Recipe
              </Button>
            </Box>
          </Grid>
          {errorMsg && (
            <Grid item xs={12}>
              <Typography color="error" align="center">
                {errorMsg}
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </Container>
  );
};

export default RecipeForm;
