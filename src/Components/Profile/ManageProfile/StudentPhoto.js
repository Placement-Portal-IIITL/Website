// MUI Components
import { Stack, Avatar } from "@mui/material";

// create viewable google drive link
const generateViewURL = (url) => {
  const prefix = "https://drive.google.com/file/d/";
  const documentId = url.replace(prefix, "").split("/")[0];
  return "https://drive.google.com/uc?export=view&id=" + documentId;
};

const StudentPhoto = ({ photoURL, name }) => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Avatar src={generateViewURL(photoURL)} alt={name} sx={{ height: 200, width: 200 }} />
    </Stack>
  );
};

export default StudentPhoto;
