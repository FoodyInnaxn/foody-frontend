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
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
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
  position: "relative",
  color: "black",
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

const RecipeItem = ({ item }) => {

  return (
    <RecipeCard>
      <Carousel autoPlay={true}>
        {item.imgUrls.length > 0 ? (
          item.imgUrls.map((image, imageIndex) => (
            <CardMediaStyled key={imageIndex} image={image} />
          ))
        ) : (
          <CardMediaStyled image={"/images/noimage.jpg"} />
        )}
      </Carousel>
      <CardContentWithHover>
        <Link to={`/recipe/${item.id}`} style={{ textDecoration: "none", color: "black" }}>
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {item.description}
          </Typography>
          <div style={{ display: "flex", alignItems: "center", margin:"2px" }}>
            <AccessTimeIcon />
            <Typography variant="body2" color="textSecondary" style={{ marginLeft: "0.5rem" }}>
              {item.time}
            </Typography>
            <SoupKitchenIcon style={{ marginLeft: "1rem" }} />
            <Typography variant="body2" color="textSecondary">
              {item.ingredients.length} Ingredients
            </Typography>
          </div>
        </Link>
        <FavoriteButton aria-label="add to favorites" >
          <FavoriteIcon color={"inherit"} />
          <Typography variant="body2" color="textSecondary">
            {item.numberSaved}
          </Typography>
        </FavoriteButton>
      </CardContentWithHover>
    </RecipeCard>
  );
};

export default RecipeItem;
