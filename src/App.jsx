import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "./Home";
import Footer from "./pages/Footer";
import NavBar from "./pages/NavBar";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import RecipesOverviewPage from "./pages/RecipesOverviewPage";
import RecipePage from "./pages/RecipePage";
import ProfilePage from "./pages/ProfilePage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import RecipeForm from "./pages/RecipeForm";
import FileUploader from "./pages/FileUploader";
import EditRecipeForm from "./pages/EditRecipeForm";

export const UserContext = createContext(null);

const getUser = () => {
  if (localStorage.getItem("jwt")) {
    let jwt = localStorage.getItem("jwt");
    let jwtDecoded = jwtDecode(jwt);
    return jwtDecoded;
  }
  return undefined;
};

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <NavBar />
            <Container style={{ flex: 1, paddingBottom: "3rem" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/opa" element={<FileUploader />} />
                <Route path="/recipe" element={<RecipesOverviewPage />} />
                <Route path="/recipe/:id" element={<RecipePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/recipe/:id/operations/create" element={<RecipeForm />} />
                <Route path="/recipe/update/:id" element={<EditRecipeForm />} />
              </Routes>
            </Container>
            <Footer />
          </div>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
