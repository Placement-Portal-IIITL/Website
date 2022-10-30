// hooks
import React, { useState, useContext } from "react";
import { UserContext } from "../../../Context/userContext";
import { Link } from "react-router-dom";

// MUI Components
import { Avatar, IconButton, Typography, Tooltip } from "@mui/material";
import { Menu, MenuItem, Divider, ListItemIcon } from "@mui/material";

// MUI Icons
import PersonIcon from "@mui/icons-material/Person";
import TeamIcon from "@mui/icons-material/Workspaces";
import TpoIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";

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
  // states
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // handle open Menu
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Item = ({ Icon, text, url }) => {
    return (
      <Link to={url}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            {Icon}
            <Typography variant="body2" color="text.secondary" ml={1} sx={{ fontFamily: "nunito" }}>
              {text}
            </Typography>
          </ListItemIcon>
        </MenuItem>
      </Link>
    );
  };

  const LogoutItem = ({ Icon, text }) => {
    const handleLogout = () => {};
    return (
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          {Icon}
          <Typography variant="body2" color="text.secondary" ml={1} sx={{ fontFamily: "nunito" }}>
            {text}
          </Typography>
        </ListItemIcon>
      </MenuItem>
    );
  };

  return (
    <React.Fragment>
      <IconButton
        size="small"
        color="info"
        onClick={handleClick}
        id="nav-menu"
        aria-controls={open ? "nav-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <UserIcon />
      </IconButton>
      <Menu
        id="nav-menu"
        aria-labelledby="navigation-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0.8,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        <Item Icon={<PersonIcon fontSize="small" />} text="Profile" url="/profile" />
        <Item Icon={<TeamIcon fontSize="small" />} text="Team Workspace" url="/team" />
        <Item Icon={<TpoIcon fontSize="small" />} text="TPO Portal" url="/tpo" />
        <Divider />
        <LogoutItem Icon={<LogoutIcon fontSize="small" color="error" />} text="Logout" />
      </Menu>
    </React.Fragment>
  );
};

export default NavMenu;
