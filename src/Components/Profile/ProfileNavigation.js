import { useState } from "react";

// React Router
import { Link, useParams } from "react-router-dom";

// MUI Components
import { Stack, Avatar, Typography, Chip } from "@mui/material";
import { Button, IconButton, Divider } from "@mui/material";

// MUI Icons
import ManageIcon from "@mui/icons-material/ManageAccounts";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FolderIcon from "@mui/icons-material/Folder";
import ResumeIcon from "@mui/icons-material/Description";

const ProfileAvatar = ({ photoURL, Name, linkedinURL }) => {
  // Opening Links
  const OpenLink = () => {
    window.open(linkedinURL, "_blank").focus();
  };

  return (
    <Stack spacing={1} justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
      <Avatar sx={{ width: 56, height: 56 }} alt={Name} src={photoURL} />
      <Typography sx={{ fontFamily: "nunito" }} variant="body">
        {Name}
      </Typography>

      <IconButton color="primary" size="small" onClick={OpenLink}>
        <LinkedInIcon />
      </IconButton>
    </Stack>
  );
};

const Item = ({ url, Icon, text, active }) => {
  return (
    <Link to={url} className={active ? "profile-navLink active" : "profile-navLink"}>
      <Stack direction="row" spacing={2} alignItems="center">
        {Icon}
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Nunito" }}>
          {text}
        </Typography>
      </Stack>
    </Link>
  );
};

const ProfileNavigation = () => {
  // calling hooks
  const params = useParams();

  // Profile Nav States

  const [profileData, setProfileData] = useState({});

  return (
    <Stack
      sx={{
        width: 200,
        height: "100%",
        padding: "15px 10px",
      }}
      spacing={2}
      alignItems="center"
    >
      <ProfileAvatar
        Name="Sample Name"
        photoURL="images/userImg.png"
        linkedinURL="https://www.linkedin.com/in/abhishekworks787"
      />
      <Divider flexItem />
      <Item
        url="/profile/manage"
        Icon={<ManageIcon size="small" color="primary" />}
        text="Manage Profile"
        active={params.subprofile === "manage"}
      />
      <Item
        url="/profile/resume"
        Icon={<ResumeIcon size="small" color="primary" />}
        text="Resume"
        active={params.subprofile === "resume"}
      />
      <Item
        url="/profile/documents"
        Icon={<FolderIcon size="small" color="primary" />}
        text="My Documents"
        active={params.subprofile === "documents"}
      />
    </Stack>
  );
};
export default ProfileNavigation;
