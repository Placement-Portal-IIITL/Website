// MUI Components
import { Stack, Avatar } from "@mui/material";

// assets
import generateViewURL from "../../assets/Methods/GenerateGoogleDriveViewURL";

const StudentPhoto = ({ photoURL, name }) => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Avatar src={generateViewURL(photoURL)} alt={name} sx={{ height: 200, width: 200 }} />
    </Stack>
  );
};

export default StudentPhoto;
