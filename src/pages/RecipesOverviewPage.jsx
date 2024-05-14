import React, { useState, useEffect, useContext } from "react";
import RecipeItem from "../components/RecipeItem";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/system";
import SearchComponent from "../components/SearchComponent";
import RecipesAPI from "../apis/RecipesApi";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const pageSize = 6;

function RecipesOverviewPage() {
  const [recipes, setRecipes] = useState([]);
  const { user } = useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(0);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchRecipes(pageNumber);
  }, [pageNumber]);

  const fetchRecipes = (page) => {
    RecipesAPI.getRecipes(page, pageSize)
      .then((data) => {
        setRecipes(data.recipes);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  };

  const handlePageChange = (event, value) => {
    setPageNumber(value - 1);
  };

  const handleCreateRecipe = (id) => {
    navigate(`/recipe/${id}/operations/create`);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Recipes</h2>
      <SearchComponent/>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {recipes.map((recipe, index) => (
          <RecipeItem key={index} item={recipe} />
        ))}
      </div>
      <Stack direction="row" spacing={2}>
        <Box sx={{ flexGrow: 1 }}>
          <Pagination
            count={totalPages}
            page={pageNumber + 1}
            onChange={handlePageChange}
            shape="rounded"
          />
        </Box>
        {user && (
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => handleCreateRecipe(user.userId)}
            style={{ position: "fixed", bottom: 16, right: 16 }}
          >
            <AddIcon />
          </Fab>
        )}
      </Stack>
    </div>
  );
}

export default RecipesOverviewPage;
