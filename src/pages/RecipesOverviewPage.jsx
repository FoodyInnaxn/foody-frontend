// import React, { useState } from "react";
// import RecipeItem from "../components/RecipeItem";
// import Stack from "@mui/material/Stack";
// import Pagination from '@mui/material/Pagination';
// import { Box } from "@mui/system";
// import SearchBar from "../components/SearchBar";


// const recipes = [
//   {
//     title: "Spaghetti Carbonara",
//     description:
//       "Classic Italian pasta dish with creamy egg sauce, crispy pancetta, and Parmesan cheese.",
//     images: [
//       "https://plus.unsplash.com/premium_photo-1678112180202-cd950dbe5a35?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "https://images.unsplash.com/photo-1617854818583-09e7f077a156?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXJsfGVufDB8fDB8fHww",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "30 mins",
//     ingredients: ["Pasta", "Eggs", "Pancetta", "Parmesan cheese"],
//     favoriteCount: 5,
//   },
//   {
//     title: "Chicken Parmesan",
//     description:
//       "Breaded and fried chicken topped with marinara sauce and melted mozzarella cheese.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "45 mins",
//     ingredients: [
//       "Chicken breasts",
//       "Bread crumbs",
//       "Marinara sauce",
//       "Mozzarella cheese",
//     ],
//     favoriteCount: 5,
//   },
//   {
//     title: "Margherita Pizza",
//     description:
//       "Traditional Italian pizza topped with tomato sauce, mozzarella cheese, fresh basil, and olive oil.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "25 mins",
//     ingredients: [
//       "Pizza dough",
//       "Tomato sauce",
//       "Mozzarella cheese",
//       "Fresh basil",
//       "Olive oil",
//     ],
//     favoriteCount: 5,
//   },
//   // Add more recipes here
//   {
//     title: "Chicken Alfredo Pasta",
//     description:
//       "Creamy pasta dish with grilled chicken, Alfredo sauce, and Parmesan cheese.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "40 mins",
//     ingredients: [
//       "Pasta",
//       "Grilled chicken",
//       "Alfredo sauce",
//       "Parmesan cheese",
//     ],
//     favoriteCount: 5,
//   },
//   {
//     title: "Caesar Salad",
//     description:
//       "Classic salad made with romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "15 mins",
//     ingredients: [
//       "Romaine lettuce",
//       "Croutons",
//       "Parmesan cheese",
//       "Caesar dressing",
//     ],
//     favoriteCount: 5,
//   },
//   {
//     title: "Beef Tacos",
//     description:
//       "Mexican street food consisting of corn tortillas filled with seasoned beef, onions, and cilantro.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "35 mins",
//     ingredients: ["Beef", "Corn tortillas", "Onions", "Cilantro"],
//     favoriteCount: 5,
//   },
//   {
//     title: "Vegetable Stir-Fry",
//     description:
//       "Quick and easy stir-fry made with mixed vegetables and served with rice or noodles.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "20 mins",
//     ingredients: ["Mixed vegetables", "Soy sauce", "Garlic", "Ginger"],
//     favoriteCount: 5,
//   },
//   {
//     title: "Chocolate Chip Cookies",
//     description:
//       "Classic homemade cookies loaded with chocolate chips and baked until golden brown.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "25 mins",
//     ingredients: ["Flour", "Butter", "Sugar", "Chocolate chips"],
//     favoriteCount: 5,
//   },
//   {
//     title: "Spinach and Feta Quiche",
//     description:
//       "Savory pie filled with spinach, feta cheese, eggs, and cream, baked in a flaky crust.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "50 mins",
//     ingredients: ["Pie crust", "Spinach", "Feta cheese", "Eggs", "Cream"],
//     favoriteCount: 5,
//   },
//   {
//     title: "Vegetarian Chili",
//     description:
//       "Hearty chili made with beans, vegetables, and spices, perfect for a cozy dinner.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "40 mins",
//     ingredients: [
//       "Beans",
//       "Tomatoes",
//       "Onions",
//       "Bell peppers",
//       "Chili powder",
//     ],
//     favoriteCount: 5,
//   },
//   {
//     title: "Spaghetti Carbonara",
//     description:
//       "Classic Italian pasta dish with creamy egg sauce, crispy pancetta, and Parmesan cheese.",
//     images: [
//       "https://plus.unsplash.com/premium_photo-1678112180202-cd950dbe5a35?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "https://images.unsplash.com/photo-1617854818583-09e7f077a156?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXJsfGVufDB8fDB8fHww",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "30 mins",
//     ingredients: ["Pasta", "Eggs", "Pancetta", "Parmesan cheese"],
//     favoriteCount: 5,
//   },
//   {
//     title: "Chicken Parmesan",
//     description:
//       "Breaded and fried chicken topped with marinara sauce and melted mozzarella cheese.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "45 mins",
//     ingredients: [
//       "Chicken breasts",
//       "Bread crumbs",
//       "Marinara sauce",
//       "Mozzarella cheese",
//     ],
//     favoriteCount: 5,
//   },
//   {
//     title: "Margherita Pizza",
//     description:
//       "Traditional Italian pizza topped with tomato sauce, mozzarella cheese, fresh basil, and olive oil.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "25 mins",
//     ingredients: [
//       "Pizza dough",
//       "Tomato sauce",
//       "Mozzarella cheese",
//       "Fresh basil",
//       "Olive oil",
//     ],
//     favoriteCount: 5,
//   },
//   // Add more recipes here
//   {
//     title: "Chicken Alfredo Pasta",
//     description:
//       "Creamy pasta dish with grilled chicken, Alfredo sauce, and Parmesan cheese.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "40 mins",
//     ingredients: [
//       "Pasta",
//       "Grilled chicken",
//       "Alfredo sauce",
//       "Parmesan cheese",
//     ],
//     favoriteCount: 5,
//   },
//   {
//     title: "Caesar Salad",
//     description:
//       "Classic salad made with romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "15 mins",
//     ingredients: [
//       "Romaine lettuce",
//       "Croutons",
//       "Parmesan cheese",
//       "Caesar dressing",
//     ],
//     favoriteCount: 5,
//   },
//   {
//     title: "Spaghetti Carbonara",
//     description:
//       "Classic Italian pasta dish with creamy egg sauce, crispy pancetta, and Parmesan cheese.",
//     images: [
//       "https://plus.unsplash.com/premium_photo-1678112180202-cd950dbe5a35?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "https://images.unsplash.com/photo-1617854818583-09e7f077a156?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXJsfGVufDB8fDB8fHww",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "30 mins",
//     ingredients: ["Pasta", "Eggs", "Pancetta", "Parmesan cheese"],
//     favoriteCount: 5,
//   },
//   {
//     title: "Chicken Parmesan",
//     description:
//       "Breaded and fried chicken topped with marinara sauce and melted mozzarella cheese.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "45 mins",
//     ingredients: [
//       "Chicken breasts",
//       "Bread crumbs",
//       "Marinara sauce",
//       "Mozzarella cheese",
//     ],
//     favoriteCount: 5,
//   },
//   {
//     title: "Margherita Pizza",
//     description:
//       "Traditional Italian pizza topped with tomato sauce, mozzarella cheese, fresh basil, and olive oil.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "25 mins",
//     ingredients: [
//       "Pizza dough",
//       "Tomato sauce",
//       "Mozzarella cheese",
//       "Fresh basil",
//       "Olive oil",
//     ],
//     favoriteCount: 5,
//   },
//   // Add more recipes here
//   {
//     title: "Chicken Alfredo Pasta",
//     description:
//       "Creamy pasta dish with grilled chicken, Alfredo sauce, and Parmesan cheese.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "40 mins",
//     ingredients: [
//       "Pasta",
//       "Grilled chicken",
//       "Alfredo sauce",
//       "Parmesan cheese",
//     ],
//     favoriteCount: 5,
//   },
//   {
//     title: "Caesar Salad",
//     description:
//       "Classic salad made with romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "15 mins",
//     ingredients: [
//       "Romaine lettuce",
//       "Croutons",
//       "Parmesan cheese",
//       "Caesar dressing",
//     ],
//     favoriteCount: 5,
//   },
//   {
//     title: "Spaghetti Carbonara",
//     description:
//       "Classic Italian pasta dish with creamy egg sauce, crispy pancetta, and Parmesan cheese.",
//     images: [
//       "https://plus.unsplash.com/premium_photo-1678112180202-cd950dbe5a35?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "https://images.unsplash.com/photo-1617854818583-09e7f077a156?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXJsfGVufDB8fDB8fHww",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "30 mins",
//     ingredients: ["Pasta", "Eggs", "Pancetta", "Parmesan cheese"],
//     favoriteCount: 5,
//   },
//   {
//     title: "Chicken Parmesan",
//     description:
//       "Breaded and fried chicken topped with marinara sauce and melted mozzarella cheese.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "45 mins",
//     ingredients: [
//       "Chicken breasts",
//       "Bread crumbs",
//       "Marinara sauce",
//       "Mozzarella cheese",
//     ],
//     favoriteCount: 5,
//   },
//   {
//     title: "Margherita Pizza",
//     description:
//       "Traditional Italian pizza topped with tomato sauce, mozzarella cheese, fresh basil, and olive oil.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "25 mins",
//     ingredients: [
//       "Pizza dough",
//       "Tomato sauce",
//       "Mozzarella cheese",
//       "Fresh basil",
//       "Olive oil",
//     ],
//     favoriteCount: 5,
//   },
//   // Add more recipes here
//   {
//     title: "Chicken Alfredo Pasta",
//     description:
//       "Creamy pasta dish with grilled chicken, Alfredo sauce, and Parmesan cheese.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "40 mins",
//     ingredients: [
//       "Pasta",
//       "Grilled chicken",
//       "Alfredo sauce",
//       "Parmesan cheese",
//     ],
//     favoriteCount: 5,
//   },
//   {
//     title: "Caesar Salad",
//     description:
//       "Classic salad made with romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "15 mins",
//     ingredients: [
//       "Romaine lettuce",
//       "Croutons",
//       "Parmesan cheese",
//       "Caesar dressing",
//     ],
//     favoriteCount: 5,
//   },
//   {
//     title: "Spaghetti Carbonara",
//     description:
//       "Classic Italian pasta dish with creamy egg sauce, crispy pancetta, and Parmesan cheese.",
//     images: [
//       "https://plus.unsplash.com/premium_photo-1678112180202-cd950dbe5a35?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "https://images.unsplash.com/photo-1617854818583-09e7f077a156?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXJsfGVufDB8fDB8fHww",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "30 mins",
//     ingredients: ["Pasta", "Eggs", "Pancetta", "Parmesan cheese"],
//     favoriteCount: 5,
//   },
//   {
//     title: "Chicken Parmesan",
//     description:
//       "Breaded and fried chicken topped with marinara sauce and melted mozzarella cheese.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "45 mins",
//     ingredients: [
//       "Chicken breasts",
//       "Bread crumbs",
//       "Marinara sauce",
//       "Mozzarella cheese",
//     ],
//     favoriteCount: 5,
//   },
//   {
//     title: "Margherita Pizza",
//     description:
//       "Traditional Italian pizza topped with tomato sauce, mozzarella cheese, fresh basil, and olive oil.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "25 mins",
//     ingredients: [
//       "Pizza dough",
//       "Tomato sauce",
//       "Mozzarella cheese",
//       "Fresh basil",
//       "Olive oil",
//     ],
//     favoriteCount: 5,
//   },
//   // Add more recipes here
//   {
//     title: "Opaa",
//     description:
//       "Creamy pasta dish with grilled chicken, Alfredo sauce, and Parmesan cheese.",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//     preparationTime: "40 mins",
//     ingredients: [
//       "Pasta",
//       "Grilled chicken",
//       "Alfredo sauce",
//       "Parmesan cheese",
//     ],
//     favoriteCount: 5,
//   },
// ];

// const pageSize = 5;

// function RecipePage() {
//   const [pageNumber, setPageNumber] = useState(0);

//   const totalPages = Math.ceil(recipes.length / pageSize);
//   const startIndex = pageNumber * pageSize;
//   const endIndex = Math.min(startIndex + pageSize, recipes.length);
//   const currentPageRecipes = recipes.slice(startIndex, endIndex);

//   const handlePageChange = (event, value) => {
//     setPageNumber(value - 1);
//   };

//   return (
//     <div>
//       <h2>Welcome to the Recipe Page</h2>
//       <p>Here you can find delicious recipes to try!</p>
//       <SearchBar recipes={recipes}/>
//       <div>
//         {currentPageRecipes.map((recipe, index) => (
//           <RecipeItem key={index} item={recipe} />
//         ))}
//       </div>
//       <Stack direction="row" spacing={2}>
//         <Box sx={{ flexGrow: 1 }}>
//           <Pagination
//             count={totalPages}
//             page={pageNumber + 1}
//             onChange={handlePageChange}
//             shape="rounded"
//           />
//         </Box>
//       </Stack>
//     </div>
//   );
// }

// export default RecipePage;

import React, { useState, useEffect } from "react";
import RecipeItem from "../components/RecipeItem";
import Stack from "@mui/material/Stack";
import Pagination from '@mui/material/Pagination';
import { Box } from "@mui/system";
import SearchBar from "../components/SearchBar";
import RecipesAPI from "../apis/RecipesApi";

const pageSize = 5;

function RecipesOverviewPage() {
  const [recipes, setRecipes] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchRecipes(pageNumber);
  }, [pageNumber]);

  const fetchRecipes = (page) => {
    RecipesAPI.getRecipes(page, pageSize)
      .then((data) => {
        console.log(data, "data")
        setRecipes(data);
        setTotalPages(data?.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  };

  const handlePageChange = (event, value) => {
    setPageNumber(value - 1);
  };
  console.log(recipes)

  return (
    <div>
      <h2>Welcome to the Recipe Page</h2>
      <p>Here you can find delicious recipes to try!</p>
      <SearchBar recipes={recipes} />
      <div>
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
      </Stack>
    </div>
  );
}

export default RecipesOverviewPage;
