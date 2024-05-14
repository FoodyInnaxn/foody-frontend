import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Box,
  Container,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import RecipesAPI from "../apis/RecipesApi";
import SavedRecipeAPI from "../apis/SavedRecipeAPI";
import {
  Favorite as FavoriteIcon,
  LocalDining as LocalDiningIcon,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import Carousel from "react-material-ui-carousel";
import { UserContext } from "../App";
import CommentComponent from "../components/CommentComponent";
import CommentAPI from "../apis/CommentAPI";

const FavoriteButton = styled(IconButton)({
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});

const RecipePage = () => {
  const [recipe, setRecipe] = useState({});
  const [canAdd, setCanAdd] = useState(false);
  const [commentAdded, setCommentAdded] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await RecipesAPI.getRecipeById(id);
        setRecipe(response);
        setFavoriteCount(response.numberSaved);
        if (user) {
          const checkIfCanAdd = await SavedRecipeAPI.isRecipeSaved(
            user.userId,
            id
          );
          setCanAdd(checkIfCanAdd);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else {
          console.error("Error fetching recipe:", error);
        }
      }
    };

    if (id) {
      fetchRecipe();
    }

    if (commentAdded) {
      setCommentAdded(false);
    }
  }, [id, navigate, user, commentAdded]);

  const handleSave = async () => {
    try {
      if (user) {
        if (canAdd) {
          await SavedRecipeAPI.removeSaved(id, user.userId);
          setFavoriteCount((prevCount) => prevCount - 1);
        } else {
          const recipeData = {
            id: recipe.id,
            title: recipe.title,
            description: recipe.description,
            time: recipe.time,
            urlImages: recipe.imgUrls,
          };
          await SavedRecipeAPI.addSaved(user.userId, recipeData);
          setFavoriteCount((prevCount) => prevCount + 1);
        }
        setCanAdd((prevCanAdd) => !prevCanAdd);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  const handleUpdateRecipe = () => {
    navigate(`/recipe/update/${recipe.id}`);
  };

  const handleCreateComment = async () => {
    try {
      if (user) {
        const currentDate = new Date();
        const commentData = {
          content: newComment,
          postedAt: currentDate,
          recipeId: recipe.id,
        };

        await CommentAPI.createComment(user.userId, commentData);
        setCommentAdded(true);
        setNewComment("");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  console.log(recipe)
  return (
    <Container sx={{ marginTop: 4 }}>
      <Box display="flex" justifyContent="space-between">
        <Box flex="1" mr={2}>
          <Carousel autoPlay={false}>
            {recipe.imgUrls && recipe.imgUrls.length > 0 ? (
              recipe.imgUrls.map((url, index) => (
                <CardMedia key={index} image={url} style={{ height: 300 }} />
              ))
            ) : (
              <CardMedia
                style={{ height: 300 }}
                image={"/images/noimage.jpg"}
              />
            )}
          </Carousel>
        </Box>
        <Box flex="1">
          <Box mb={2} ml={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4" gutterBottom>
                {recipe.title}
              </Typography>
              {user && (
                <FavoriteButton
                  aria-label="add to favorites"
                  onClick={handleSave}
                >
                  <FavoriteIcon color={canAdd ? "primary" : "inherit"} />
                  <Typography variant="body2" color="textSecondary">
                    {canAdd ? "Unsave" : "Save"}
                  </Typography>
                </FavoriteButton>
              )}
            </Box>
            <Typography variant="h6" color="text.main">
              Favorite Count: {favoriteCount}
            </Typography>
            <Typography variant="p" color="text.secondary">
              {recipe.description}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Preparation Time: <b>{recipe.time}</b>
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Ingredients:{" "}
              <b>{recipe.ingredients && recipe.ingredients.length}</b>
            </Typography>
            {user && user.userId === recipe.userId && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateRecipe}
                sx={{ mt: 2 }}
              >
                {" "}
                Edit recipe
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      {user && (
        <Box mt={4} textAlign="center">
          <TextField
            variant="outlined"
            placeholder="Leave a comment..."
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            InputProps={{ style: { borderRadius: 25 } }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateComment}
            sx={{ mt: 2 }}
          >
            Add Comment
          </Button>
        </Box>
      )}
      <Box mt={4}>
        <Typography variant="body1" color="text.secondary">
          Ingredients:
        </Typography>
        {recipe.ingredients && (
          <List>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <LocalDiningIcon />
                </ListItemIcon>
                <ListItemText
                  primary={ingredient.quantity + ": " + ingredient.name}
                />
              </ListItem>
            ))}
          </List>
        )}
        <Typography variant="body1" color="text.secondary">
          Steps:
        </Typography>
        {recipe.steps && (
          <List>
            {recipe.steps.map((step, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${index + 1}. ${step}`} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <CommentComponent
        setCommentAdded={setCommentAdded}
        commentAdded={commentAdded}
        recipeId={recipe.id}
      />
    </Container>
  );
};

export default RecipePage;
