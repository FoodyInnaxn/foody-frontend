import { Button, Container, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";

function Home() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <Typography variant="h1">Foody Your Way</Typography>
          <Typography variant="body1">
            Meet the all-in-one app for recipe saving, meal planning, cooking
            workshop, and recipe sharing.
          </Typography>
          {!user && (
            <div style={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={navigateToRegister}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
        <img
          src="/images/file.png"
          alt="Home"
          style={{ width: "60%", marginLeft: "20px" }}
        />
      </div>
    </Container>
  );
}

export default Home;
