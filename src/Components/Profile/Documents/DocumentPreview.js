// view Resume
import { useEffect, useState } from "react";
import { Stack, CircularProgress, Chip } from "@mui/material";

// assets
import generateViewURL from "../../assets/Methods/GenerateGoogleDriveViewURL";

const Style = {
  padding: 0,
  border: "none",
  borderRadius: "25px",
  height: 1150,
  width: "100%",
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
    <Stack sx={{ padding: "10px 24px", width: "100%" }} spacing={1} alignItems="center">
      <Chip
        label={`${docName} Preview`}
        variant="outlined"
        sx={{ width: 300, fontFamily: "Nunito" }}
        color="success"
      />
      {Loading && <CircularProgress size={20} color="primary" />}
      {!Loading && (
        <iframe
          title={docName}
          src={generateViewURL(url)}
          allow="autoplay"
          // loading="lazy"
          style={Style}
        ></iframe>
      )}
    </Stack>
  );
};

export default ResumeViewer;
