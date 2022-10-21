// Hooks
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// MUI Components
import { Box, Stack, AppBar, Toolbar } from "@mui/material";
import { Typography, Button, Avatar } from "@mui/material";

// custom css
import "../Navigation.css";

// custom components
import NavMenu from "../NavMenu/NavMenu";

const NavTitle = () => {
  // calling hooks
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ cursor: "pointer", flexGrow: 1 }}
      onClick={() => navigate("/")}
    >
      <Avatar
        alt="IIIT Lucknow"
        src="/favicon.ico"
        sx={{ bgcolor: "white", height: 35, width: 35 }}
      />
      <Typography variant="body1" component="div" sx={{ flexGrow: 1, fontFamily: "nunito" }}>
        Placement Portal
      </Typography>
    </Stack>
  );
};

const NavBar = () => {
  // calling hooks
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" className="NavBar">
        <Toolbar sx={{ height: 48 }}>
          <NavTitle />
          <NavMenu />
          {/* <Button className="NavBar-Login-Btn" onClick={() => navigate("/Login")}>
            Login
          </Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
