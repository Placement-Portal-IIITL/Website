// Hooks
import { useEffect, useState } from "react";

// React Router
import { Link, useParams } from "react-router-dom";

// MUI Components
import { Stack, Avatar, Typography, Chip } from "@mui/material";
import { IconButton, Divider } from "@mui/material";

// MUI Icons
import ManageIcon from "@mui/icons-material/ManageAccounts";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FolderIcon from "@mui/icons-material/Folder";
import ResumeIcon from "@mui/icons-material/Description";

// create viewable google drive link
const generateViewURL = (url) => {
  const prefix = "https://drive.google.com/file/d/";
  const documentId = url.replace(prefix, "").split("/")[0];
  return "https://drive.google.com/uc?export=view&id=" + documentId;
};

const ProfileAvatar = ({ photoURL, Name, linkedinURL }) => {
  // Opening Links
  const OpenLink = () => {
    window.open(linkedinURL, "_blank").focus();
  };

  return (
    <Stack spacing={1} justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
      <Avatar sx={{ width: 56, height: 56 }} alt={Name} src={generateViewURL(photoURL)} />
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

const ProfileNavigation = ({ studentProfile }) => {
  // calling hooks
  const params = useParams();
  const [profile, setProfile] = useState({ photo: "", name: "", linkedin: "" });
  useEffect(() => {
    setProfile({
      photo: studentProfile.photo,
      name: studentProfile.name,
      linkedin: studentProfile.linkedin,
    });
  }, [studentProfile]);

  return (
    <Stack
      sx={{
        width: 300,
        height: "100%",
        padding: "15px 10px",
      }}
      spacing={2}
      alignItems="center"
    >
      <ProfileAvatar
        Name={profile.name}
        photoURL={profile.photo.length ? profile.photo : "/images/userImg.png"}
        linkedinURL={profile.linkedin}
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
