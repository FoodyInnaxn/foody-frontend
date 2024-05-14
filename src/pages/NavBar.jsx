import React, { useContext, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { UserContext } from "../App";
import { DeleteToken } from "../authentication/LocalStorageManager";

function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logOut = useCallback(() => {
    DeleteToken();
    setUser(null);
    navigate("/login");
  }, [navigate, setUser]);

  useEffect(() => {
    if (!user) {
      logOut();
    }
  }, [user]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
        >
          {user ? (
            <>
              <Typography variant="h6" sx={{ mr: 2 }}>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Home
                </Link>
              </Typography>
              <Typography variant="h6" sx={{ mr: 2 }}>
                <Link
                  to="/recipe"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Recipes
                </Link>
              </Typography>
              <Typography variant="h6" sx={{ mr: 2 }}>
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  Profile
                </Link>
              </Typography>
              <Typography variant="h6">
                <Link
                  to="/logout"
                  onClick={logOut}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Logout
                </Link>
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ mr: 2 }}>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Home
                </Link>
              </Typography>
              <Typography variant="h6" sx={{ mr: 2 }}>
                <Link
                  to="/recipe"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Recipes
                </Link>
              </Typography>
              <Typography variant="h6" sx={{ mr: 2 }}>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  Login
                </Link>
              </Typography>
              <Typography variant="h6" sx={{ mr: 2 }}>
                <Link
                  to="/opa"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  opa
                </Link>
              </Typography>
              <Typography variant="h6">
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  Register
                </Link>
              </Typography>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
