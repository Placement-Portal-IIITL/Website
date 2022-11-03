import { useState, useEffect } from "react";

// API
import axios from "../../../axios";

// MUI Components
import { Stack, CircularProgress, Alert } from "@mui/material";

// Components
import Download from "./ResumeDownload";
import View from "./ResumeViewer";
import Update from "./UpdateResume";

const Resume = () => {
  // states
  const [url, setUrl] = useState("");
  const [Loading, setLoading] = useState(false);

  const getResumeLink = async () => {
    setLoading(true);
    axios
      .get("/getStudentProfile")
      .then((res) => {
        // console.log(res.data.resumeLink);
        setUrl(res.data.resumeLink);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data);
      });
  };

  // fetch resume link
  useEffect(() => {
    getResumeLink();
  }, [url]);

  return (
    <Stack sx={{ minHeight: "calc(100vh - 64px)", width: "100%" }}>
      {Loading && (
        <Stack
          sx={{ padding: "15px 24px", width: "100%" }}
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Stack>
      )}
      {!Loading && (
        <>
          <Alert severity="info">Make Sure Your Google Drive Link is publically accessible</Alert>
          <Stack
            direction="row"
            spacing={2}
            sx={{ width: "100%", padding: "15px 24px" }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Update setUrl={setUrl} url={url} />
            <Download url={url} />
          </Stack>
          <View url={url} />
        </>
      )}
    </Stack>
  );
};

export default Resume;
