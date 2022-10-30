// Hooks
import { useState, useContext } from "react";
import { UserContext } from "../../Context/userContext";

// React Router
import { useNavigate } from "react-router-dom";

// custom Css
import "./Profile.css";

// MUI Components
import { Stack, Divider } from "@mui/material";

// Profile Components
import ProfileNav from "./ProfileNavigation";

const Profile = () => {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={1}
      sx={{ minHeight: "calc(100vh - 64px)" }}
    >
      <ProfileNav />
      <Stack></Stack>
    </Stack>
  );
};

export default Profile;
