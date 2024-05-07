import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
        >
          <Typography variant="h6">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Home
            </Link>
          </Typography>
          <Typography variant="h6">
            <Link
              to="/recipe"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginLeft: "20px",
              }}
            >
              Recipe
            </Link>
          </Typography>
          <Typography variant="h6">
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginLeft: "20px",
              }}
            >
              Login
            </Link>
          </Typography>
          <Typography variant="h6">
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginLeft: "20px",
              }}
            >
              Register
            </Link>
          </Typography>
          <Typography variant="h6">
            <Link
              to="/profile"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginLeft: "20px",
              }}
            >
              Profile
            </Link>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
