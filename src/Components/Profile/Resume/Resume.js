// MUI Components
import { Stack, Alert, Divider } from "@mui/material";

// Components
import Download from "./ResumeDownload";
import View from "./ResumeViewer";
import Update from "./UpdateResume";

// style
const Style = { width: "100%", padding: "0px 24px" };

const Resume = ({ studentProfile, setStudentProfile }) => {
  return (
    <Stack sx={{ minHeight: "calc(100vh - 64px)", width: "100%" }}>
      <Alert severity="info">Make Sure Your Google Drive Link is publically accessible</Alert>
      <Divider flexItem orientation="horizontal" />
      <Stack
        direction="row"
        alignItems="center"
        sx={Style}
        spacing={2}
        divider={<Divider flexItem orientation="vertical" />}
      >
        <Update setUrl={setStudentProfile} url={studentProfile.resumeLink} />
        <Download url={studentProfile.resumeLink} />
      </Stack>
      <Divider flexItem orientation="horizontal" />
      <View url={studentProfile.resumeLink} />
    </Stack>
  );
};

export default Resume;
