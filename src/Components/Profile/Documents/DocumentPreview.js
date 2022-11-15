// view Resume
import { useEffect, useState } from "react";
import { Stack, CircularProgress, Chip } from "@mui/material";

// create viewable google drive link
const generateViewURL = (url) => {
  const prefix = "https://drive.google.com/file/d/";
  const suffix = "/preview";
  const documentId = url?.replace(prefix, "").split("/")[0];
  return prefix + documentId + suffix;
};

const ResumeViewer = ({ url, docName }) => {
  const [Loading, setLoading] = useState(true);

  // update viewer on url updates
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [url]);

  return (
    <>
      {Loading ? (
        <Stack justifyContent="center" alignItems="center" sx={{ minHeight: "calc(100vh - 64px)" }}>
          <CircularProgress size={20} color="primary" />
        </Stack>
      ) : (
        <Stack sx={{ padding: "10px 24px", width: "100%" }} spacing={1}>
          <Chip size="small" label={"Preview " + docName} />
          <iframe
            title="Resume"
            src={generateViewURL(url)}
            width="100%"
            allow="autoplay"
            height={`${1100}px`}
            loading="lazy"
          ></iframe>
        </Stack>
      )}
    </>
  );
};

export default ResumeViewer;
