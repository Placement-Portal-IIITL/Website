// Hooks
import { useEffect, useState } from "react";

// React Router
import { Link, useParams } from "react-router-dom";

// MUI Components
import { Stack, Avatar, Typography, Chip } from "@mui/material";
import { IconButton, Divider } from "@mui/material";

// MUI Icons
import StatsIcon from "@mui/icons-material/BarChart";
import ProcessIcon from "@mui/icons-material/NaturePeople";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CompanyIcon from "@mui/icons-material/Apartment";
import PartnerIcon from "@mui/icons-material/Handshake";
import StudentIcon from "@mui/icons-material/PeopleAlt";
import HelpIcon from "@mui/icons-material/HelpCenter";

// create viewable google drive link
const generateViewURL = (url) => {
  const prefix = "https://drive.google.com/file/d/";
  const documentId = url.replace(prefix, "").split("/")[0];
  return "https://drive.google.com/uc?export=view&id=" + documentId;
};

const ProfileAvatar = ({ photoURL, Name, linkedinURL, team, Loaded }) => {
  // Opening Links
  const OpenLink = () => {
    window.open(linkedinURL, "_blank").focus();
  };

  return (
    <Stack spacing={1} justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
      <Avatar
        sx={{ width: 56, height: 56 }}
        alt={Name}
        src={Loaded ? generateViewURL(photoURL) : photoURL}
      />
      <Typography sx={{ fontFamily: "nunito" }} variant="body">
        {Name}
      </Typography>
      <Chip label={team.designation} variant="outlined" color="secondary" size="small" />
      <Chip label={team.session} size="small" />
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

const TeamNavigation = ({ studentProfile }) => {
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
      {profile?.photo?.length ? (
        <ProfileAvatar
          Name={profile.name}
          photoURL={profile.photo}
          linkedinURL={profile.linkedin}
          Loaded={true}
          team={{ designation: "Placement Executive", session: "2022-23" }}
        />
      ) : (
        <ProfileAvatar
          Name={profile.name}
          photoURL="/images/userImg.png"
          Loaded={false}
          linkedinURL={profile.linkedin}
          team={{ designation: "Placement Executive", session: "2022-23" }}
        />
      )}

      <Divider flexItem />
      <Item
        url="/team/company"
        Icon={<CompanyIcon size="small" color="primary" />}
        text="Company"
        active={params.panel === "company"}
      />
      <Item
        url="/team/recruitment"
        Icon={<PartnerIcon size="small" color="primary" />}
        text="Recruitment Partner"
        active={params.panel === "recruitment"}
      />
      <Item
        url="/team/student"
        Icon={<StudentIcon size="small" color="primary" />}
        text="Student"
        active={params.panel === "student"}
      />
      {/* <Item
        url="/team/placements"
        Icon={<ProcessIcon size="small" color="primary" />}
        text="Ongoing Placements"
        active={params.panel === "placements"}
      /> */}
      {/* <Item
        url="/team/statistics"
        Icon={<StatsIcon size="small" color="primary" />}
        text="Placement Stats"
        active={params.panel === "statistics"}
      /> */}
      <Item
        url="/team/support"
        Icon={<HelpIcon size="small" color="primary" />}
        text="Support"
        active={params.panel === "support"}
      />
    </Stack>
  );
};
export default TeamNavigation;
