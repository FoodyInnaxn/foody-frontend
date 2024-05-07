import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Carousel from "react-material-ui-carousel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ListIcon from "@mui/icons-material/List";
import { Link } from "react-router-dom";


const RecipeCard = styled(Card)({
  width: 300,
  margin: "1rem",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
  display: "inline-block",
  position: "relative",
});

const CardContentWithHover = styled(CardContent)({
  cursor: "pointer",
  position: "relative", // Added to make absolute positioning relative to the card content
  color: "black", // Set text color to black
});

const CardMediaStyled = styled(CardMedia)({
  height: 200,
});

const FavoriteButton = styled(IconButton)({
  position: "absolute",
  top: "5px",
  right: "5px",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});

const RecipeItem = ({ item, index }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(item.numberSaved); 

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    setFavoriteCount(isFavorite ? favoriteCount - 1 : favoriteCount + 1);
  };
  console.log(item.id + 'item' + index)

  return (
    <RecipeCard>
      <Carousel autoPlay={false}>
        {item.imgUrls.map((image, imageIndex) => (
          <CardMediaStyled key={imageIndex} image={image} />
        ))}
      </Carousel>
      <CardContentWithHover>
        <Link to={`/recipe/${item.id}`} style={{ textDecoration: "none" }}>
          {/* Wrap only CardContent with Link and specify route */}
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {item.description}
          </Typography>
          <div>
            <AccessTimeIcon />
            <Typography variant="body2" color="textSecondary">
              {item.time}
            </Typography>
          </div>
          <div>
            <ListIcon />
            <Typography variant="body2" color="textSecondary">
              {item.ingredients.length} Ingredients
            </Typography>
          </div>
        </Link>

        <FavoriteButton
          aria-label="add to favorites"
          onClick={handleFavoriteClick}
        >
          <FavoriteIcon color={isFavorite ? "primary" : "inherit"} />
          <Typography variant="body2" color="textSecondary">
            {favoriteCount}
          </Typography>
        </FavoriteButton>
      </CardContentWithHover>
    </RecipeCard>
  );
};


export default RecipeItem;
