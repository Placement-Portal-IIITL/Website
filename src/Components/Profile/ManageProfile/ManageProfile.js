// MUI Components
import { Stack } from "@mui/material";

// components
import StudentUpdateForm from "./StudentUpdateForm";

const ManageProfile = ({ studentProfile }) => {
  return (
    <Stack
      sx={{ minHeight: "calc(100vh - 64px)", width: "100%", minWidth: 600, padding: "15px 0px" }}
      spacing={2}
      alignItems="center"
    >
      <StudentUpdateForm studentProfile={studentProfile} />
    </Stack>
  );
};

export default ManageProfile;
