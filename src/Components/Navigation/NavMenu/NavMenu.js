// hooks
import React, { useState, useContext } from "react";
import { UserContext } from "../../../Context/userContext";
import { Link, useNavigate } from "react-router-dom";

// API
import axios from "../../../axios";

// MUI Components
import { Avatar, IconButton, Typography, CircularProgress } from "@mui/material";
import { Menu, MenuItem, Divider, ListItemIcon } from "@mui/material";

// MUI Icons
import PersonIcon from "@mui/icons-material/Person";
import RegisterIcon from "@mui/icons-material/HowToReg";
import TeamIcon from "@mui/icons-material/Workspaces";
import TpoIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/HelpCenter";

const UserIcon = () => {
  return (
    <Avatar
      alt="IIITL Placement Portal User"
      src="/images/userImg.png"
      sx={{ height: 35, width: 35 }}
    />
  );
};

// local storage variable name
const userLocal = "IIITL_Placement_Portal_User";

const NavMenu = () => {
  const navigate = useNavigate();
  // user context
  const [user, setUser] = useContext(UserContext);

  // states
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [LogoutLoad, setLogoutLoad] = useState(false);

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
    const handleLogout = () => {
      setLogoutLoad(true);
      axios
        .get("/signOut")
        .then((res) => {
          setUser(null);
          localStorage.removeItem(userLocal);
          delete axios.defaults.headers.common["Authorization"];
          setLogoutLoad(false);
          navigate("/Login");
        })
        .catch((err) => {});
    };
    return (
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          {LogoutLoad ? <CircularProgress size={15} color="inherit" /> : Icon}
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
        {user && user?.roles.includes("STUDENT") && (
          <Item Icon={<PersonIcon fontSize="small" />} text="Profile" url="/profile" />
        )}
        {user && user?.roles.includes("STUDENT") && (
          <Item Icon={<HelpIcon fontSize="small" />} text="Contact" url="/contact" />
        )}
        {user && user?.roles.includes("PLACEMENT_TEAM") && !user.roles.includes("STUDENT") && (
          <Item
            Icon={<RegisterIcon fontSize="small" />}
            text="Register For Placements"
            url="/register"
          />
        )}
        {user && user?.roles.includes("PLACEMENT_TEAM") && (
          <Item Icon={<TeamIcon fontSize="small" />} text="Team Workspace" url="/team" />
        )}
        {user && user?.roles.includes("TPO") && (
          <Item Icon={<TpoIcon fontSize="small" />} text="TPO Portal" url="/tpo" />
        )}
        {user && <Divider />}
        {user && <LogoutItem Icon={<LogoutIcon fontSize="small" color="error" />} text="Logout" />}
      </Menu>
    </React.Fragment>
  );
};

export default NavMenu;
