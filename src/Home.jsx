import { Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("")

  const navigateToRegister = (id) => {
    navigate('/register');
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
          <div style={{ marginTop: "20px" }}>
            <Button variant="contained" color="primary" onClick={navigateToRegister}>
              Sign up
            </Button>
          </div>
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
