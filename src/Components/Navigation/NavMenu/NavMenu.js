// hooks
import { useState, useContext } from "react";
import { UserContext } from "../../../Context/userContext";

// MUI Components
import { Avatar, IconButton, Typography, Tooltip } from "@mui/material";
import { Menu, MenuItem, Divider, ListItemIcon } from "@mui/material";

// MUI Icons
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const UserIcon = () => {
  return (
    <Avatar
      alt="IIITL Placement Portal User"
      src="/images/userImg.png"
      sx={{ height: 35, width: 35 }}
    />
  );
};
const NavMenu = () => {
  // handle open Menu
  const handleClick = () => {};

  return (
    <IconButton size="small" color="info" onClick={handleClick}>
      <UserIcon />
    </IconButton>
  );
};

export default NavMenu;
